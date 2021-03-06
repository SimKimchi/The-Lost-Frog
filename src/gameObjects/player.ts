import 'phaser'
import Character from './character'
import { CharacterConfig, Direction } from '../util'
import PlanetScene from '../scenes/planets/planetScene'
import { TheLostFrogGame } from '..'

export default class Player extends Character {
  private static readonly ATTACK_DURATION = 200
  private static readonly ATTACK_COOLDOWN = 450
  private static readonly HURT_DURATION = 200

  protected readonly invulnerableTime = 1000
  protected readonly jumpStrength = 550
  protected readonly gravity = 200
  private static instance: Player
  public canDoubleJump = true
  private tongueSprites: Phaser.Physics.Arcade.Sprite[]
  public currentTongueSprite: Phaser.Physics.Arcade.Sprite | null | undefined
  private inAttackCooldown = false
  public wallClingDirection: Direction | null
  protected die: (() => void) | null
  protected readonly knockback = 1000
  public clingPlatform: Phaser.GameObjects.Sprite | null
  private isHurting = false
  private playerIsDead = false
  public lastJumpCoordinates: { x: number; y: number }

  private constructor(scene: PlanetScene, die: () => void) {
    super(10, 1, 64, 64, 250, 'frog', scene)
    this.tongueSprites = []
    this.currentTongueSprite = null
    this.wallClingDirection = null
    this.die = die
    this.clingPlatform = null
    this.lastJumpCoordinates = { x: 132, y: 550 }
  }

  public static getPlayer(scene: PlanetScene, die: () => void): Player {
    Player.instance = new Player(scene, die)

    return Player.instance
  }

  public init(planetGravity: number, config: CharacterConfig): void {
    super.init(planetGravity, config)

    const tongueSpriteUp = this.scene.physics.add.sprite(-2, -48, 'tongue_up')
    tongueSpriteUp.setData('key', 'tongue_up')
    tongueSpriteUp.setData('direction', Direction.Up)
    tongueSpriteUp.setSize(32, 64)
    const tongueSpriteRight = this.scene.physics.add.sprite(
      36,
      -9,
      'tongue_right'
    )
    tongueSpriteRight.setData('key', 'tongue_right')
    tongueSpriteRight.setData('direction', Direction.Right)
    tongueSpriteRight.setSize(64, 32)
    const tongueSpriteDown = this.scene.physics.add.sprite(
      -2,
      20,
      'tongue_down'
    )
    tongueSpriteDown.setData('key', 'tongue_down')
    tongueSpriteDown.setData('direction', Direction.Down)
    tongueSpriteDown.setSize(32, 64)
    const tongueSpriteLeft = this.scene.physics.add.sprite(
      -36,
      -9,
      'tongue_left'
    )
    tongueSpriteLeft.setData('key', 'tongue_left')
    tongueSpriteLeft.setData('direction', Direction.Left)
    tongueSpriteLeft.setSize(64, 32)
    this.tongueSprites = [
      tongueSpriteUp,
      tongueSpriteRight,
      tongueSpriteDown,
      tongueSpriteLeft
    ]
    this.tongueSprites.forEach((tongueSprite) => {
      ;(<Phaser.Physics.Arcade.Body>tongueSprite.body).setAllowGravity(false)
      tongueSprite.setVisible(false)
      this.scene.anims.create({
        key: tongueSprite.getData('key'),
        frames: [
          ...this.scene.anims.generateFrameNumbers(
            tongueSprite.getData('key'),
            {
              start: 7,
              end: 14
            }
          ),
          ...this.scene.anims.generateFrameNumbers(
            tongueSprite.getData('key'),
            {
              start: 0,
              end: 6
            }
          )
        ],
        frameRate: 60
      })
      this._container?.add(tongueSprite)
    })

    this.updateAnimation()
    this.hide()
  }

  public hide(): void {
    this.container.setVisible(false)
    this.body.setAllowGravity(false)
  }

  public show(): void {
    this.container.setVisible(true)
    this.body.setAllowGravity(true)
  }

  public getAttackSprites(): Phaser.Physics.Arcade.Sprite[] {
    return this.tongueSprites
  }

  public jump(multiplier: number): void {
    if (this.isGrounded()) {
      this.canDoubleJump = true
      this.body.setVelocityY(this.jumpStrength * multiplier)
      this.scene.soundHelper?.playPlayerJumpSound()

      this.lastJumpCoordinates = { x: this.container.x, y: this.container.y }
      this.updateAnimation()
    } else if (this.canDoubleJump) {
      this.canDoubleJump = false
      this.body.setVelocityY(this.jumpStrength * multiplier)
      this.scene.soundHelper?.playPlayerDoubleJumpSound()

      this.updateAnimation()
    }
  }

  public climb(multiplier: number): void {
    if (this.body.touching.down) {
      this.stopWallCling()

      return
    }

    const velocityY = this.moveSpeed * multiplier
    this.body.setDragY(0)
    this.body.setVelocityY(velocityY)

    if (velocityY > 0) {
      this.direction = Direction.Down
    } else if (velocityY < 0) {
      this.direction = Direction.Up
    }

    this.idle = false

    this.updateAnimation()
  }

  public stopClimb(planetFrictionModifier: number): void {
    if (this.body.touching.down) {
      this.stopWallCling()

      return
    }

    this.body.setDragY(planetFrictionModifier)

    this.idle = false

    this.updateAnimation()
  }

  public bounce(multiplier: number): void {
    this.canDoubleJump = true
    this.body.setVelocityY(-this.jumpStrength * multiplier * 0.75)

    this.updateAnimation()
  }

  public updateAnimation(): void {
    if (!this._container || !this.sprite) return

    // * Hurt or Dead
    if (this.isHurting || this.playerIsDead) {
      if (this.direction === Direction.Right) {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_right`, true)
      } else if (this.direction === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_left`, true)
      }
    }
    // * Wall cling
    else if (this.wallClingDirection !== null) {
      if (this.wallClingDirection === Direction.Up) {
        if (this.direction === Direction.Right) {
          this.sprite.anims.play(
            `${this.assetPrefix}_cling_up_facing_right`,
            true
          )
        } else {
          this.sprite.anims.play(
            `${this.assetPrefix}_cling_up_facing_left`,
            true
          )
        }
      } else if (this.wallClingDirection === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_cling_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_cling_right`, true)
      }
    }
    // * Attack
    else if (this.currentTongueSprite) {
      if (this.currentTongueSprite.getData('direction') === Direction.Up) {
        this.sprite.anims.play(`${this.assetPrefix}_attack_up`, true)
      } else if (
        this.currentTongueSprite.getData('direction') === Direction.Right
      ) {
        this.sprite.anims.play(`${this.assetPrefix}_attack_right`, true)
      } else if (
        this.currentTongueSprite.getData('direction') === Direction.Down
      ) {
        this.sprite.anims.play(`${this.assetPrefix}_attack_down`, true)
      } else if (
        this.currentTongueSprite.getData('direction') === Direction.Left
      ) {
        this.sprite.anims.play(`${this.assetPrefix}_attack_left`, true)
      }
    }
    // * Jump
    else if (Math.floor(this.body.velocity.y) !== 0) {
      if (this.body.velocity.y > 0) {
        if (this.isFacingLeft()) {
          this.sprite.anims.play(`${this.assetPrefix}_jump_descend_left`, true)
        } else {
          this.sprite.anims.play(`${this.assetPrefix}_jump_descend_right`, true)
        }
      } else {
        if (this.isFacingLeft()) {
          this.sprite.anims.play(`${this.assetPrefix}_jump_ascend_left`, true)
        } else {
          this.sprite.anims.play(`${this.assetPrefix}_jump_ascend_right`, true)
        }
      }
    }
    // * Run
    else if (
      Math.floor(this.body.velocity.x) > 50 ||
      Math.floor(this.body.velocity.x) < -50
    ) {
      if (this.isFacingLeft()) {
        this.sprite.anims.play(`${this.assetPrefix}_run_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_run_right`, true)
      }
    }
    // * Idle
    else {
      if (this.isFacingLeft()) {
        this.sprite.anims.play(`${this.assetPrefix}_idle_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_idle_right`, true)
      }
    }

    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight)
  }

  public getDisplayHp(): string {
    return `${this._currentHp}/${this.maxHp}`
  }

  public attack(direction: Direction): void {
    if (this.inAttackCooldown || direction === this.wallClingDirection) return

    this.renderAttack(direction)
    this.setAttackDuration()
    this.setAttackCooldown()
    this.updateAnimation()
  }

  public handleHit(direction: Direction | null, damage: number): void {
    if (this.isInvulnerable()) return

    this.scene.sound.get('hurt').play()
    this.isHurting = true
    this.scene.time.addEvent({
      delay: Player.HURT_DURATION,
      args: [this],
      callback: (player: Player) => {
        player.isHurting = false
        player.updateAnimation()
      },
      callbackScope: this.scene
    })
    super.handleHit(direction, damage)
  }

  public clingToWall(platform: Phaser.GameObjects.Sprite): void {
    if (
      this.wallClingDirection !== null ||
      !this._container ||
      this.body.wasTouching.down
    )
      return

    if (this.body.touching.left && platform.getData('clingSides')) {
      this.wallClingDirection = Direction.Left
    } else if (this.body.touching.right && platform.getData('clingSides')) {
      this.wallClingDirection = Direction.Right
    } else if (this.body.touching.up && platform.getData('clingUnder')) {
      this.wallClingDirection = Direction.Up
      if (this.sprite) {
        this.sprite.y -= 16
      }
    }

    if (this.wallClingDirection === null) return
    this.clingPlatform = platform
    this.body.setVelocity(0, 0)
    this.body.setAllowGravity(false)

    this.scene.soundHelper?.playPlayerWallClingSound()
    this.updateAnimation()
  }

  public wallJump(multiplier: number): void {
    this.body.setVelocityY(this.jumpStrength * multiplier)

    this.stopWallCling()

    this.scene.soundHelper?.playPlayerWallJumpSound()
  }

  public stopWallCling(): void {
    if (this.sprite && this.wallClingDirection === Direction.Up) {
      this.sprite.y += 16
    }
    this.wallClingDirection = null
    this.clingPlatform = null
    this.canDoubleJump = true
    this.body.setAllowGravity(true)
    this.body.setDragY(0)

    this.updateAnimation()
  }

  public setDead(): void {
    this.playerIsDead = true
  }

  public repositionAfterFall(): void {
    this.stopWallCling()

    this._container?.setPosition(
      this.lastJumpCoordinates.x,
      this.lastJumpCoordinates.y - 5
    )
  }

  public heal(): void {
    this._currentHp += 2

    if (this._currentHp > this.maxHp) {
      this._currentHp = this.maxHp
    }

    this.scene.soundHelper?.playHealSound()
  }

  protected makeInvulnerable(): void {
    super.makeInvulnerable()
    this.flickerSprite()
  }

  protected triggerKnockbackTween(props: Record<string, unknown>): void {
    if (!this._container || !this._container.body.velocity) return

    this.scene.tweens.add({
      targets: this._container.body.velocity,
      duration: 200,
      props
    })
  }

  private renderAttack(direction: Direction): void {
    this.currentTongueSprite = this.tongueSprites.find(
      (tongueSprite) => tongueSprite.getData('direction') === direction
    )
    if (!this.currentTongueSprite) return

    this.scene.soundHelper?.playPlayerAttackSound()
    this.currentTongueSprite.anims.play(
      this.currentTongueSprite.getData('key'),
      true
    )
    this.currentTongueSprite.setVisible(true)
  }

  private setAttackDuration(): void {
    this.scene.time.addEvent({
      delay: Player.ATTACK_DURATION,
      args: [this],
      callback: this.endAttack,
      callbackScope: this.scene
    })
  }

  private setAttackCooldown(): void {
    this.inAttackCooldown = true
    this.scene.time.addEvent({
      delay: Player.ATTACK_COOLDOWN,
      args: [this],
      callback: this.resetAttackCooldown,
      callbackScope: this.scene
    })
  }

  private endAttack(player: Player): void {
    if (!player.currentTongueSprite) return

    player.currentTongueSprite.setVisible(false)
    player.currentTongueSprite = null
  }

  private resetAttackCooldown(player: Player): void {
    player.inAttackCooldown = false
  }

  private flickerSprite(): void {
    this.scene.tweens.add({
      targets: this.sprite,
      duration: this.invulnerableTime / 10,
      repeat: 5,
      repeatDelay: this.invulnerableTime / 10,
      props: {
        alpha: 0.1
      },
      onComplete: () => {
        if (!this.sprite) return

        this.sprite.alpha = 1
      }
    })
  }
}
