import 'phaser'
import Character from './character'
import { CharacterConfig, Direction } from '../util'
import PlanetScene from '../scenes/planets/planetScene'

export default class Player extends Character {
  private static readonly ATTACK_DURATION = 200
  private static readonly ATTACK_COOLDOWN = 400
  private static readonly HURT_DURATION = 200

  protected readonly invulnerableTime = 1000
  protected readonly moveSpeed = 250
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
  private isDead = false
  public lastJumpCoordinates: { x: number; y: number }

  private constructor(scene: PlanetScene, die: () => void) {
    super(6, 1, 64, 64, 'frog', scene)
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

    if (!this.container) return

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
      this.container?.add(tongueSprite)
    })

    this.updateAnimation()
  }

  public getAttackSprites(): Phaser.Physics.Arcade.Sprite[] {
    return this.tongueSprites
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      this.canDoubleJump = true
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
      this.scene.soundHelper?.playPlayerJumpSound()

      this.lastJumpCoordinates = { x: this.container.x, y: this.container.y }
      this.updateAnimation()
    } else if (this.canDoubleJump) {
      this.canDoubleJump = false
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
      this.scene.soundHelper?.playPlayerDoubleJumpSound()

      this.updateAnimation()
    }
  }

  public climb(multiplier: number): void {
    if (!this.container) return

    if ((<Phaser.Physics.Arcade.Body>this.container.body).touching.down) {
      this.stopWallCling()

      return
    }

    const velocityY = this.moveSpeed * multiplier
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setDragY(0)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(velocityY)

    if (velocityY > 0) {
      this.direction = Direction.Down
    } else if (velocityY < 0) {
      this.direction = Direction.Up
    }

    this.idle = false

    this.updateAnimation()
  }

  public stopClimb(planetFrictionModifier: number): void {
    if (!this.container) return

    if ((<Phaser.Physics.Arcade.Body>this.container.body).touching.down) {
      this.stopWallCling()

      return
    }

    ;(<Phaser.Physics.Arcade.Body>this.container.body).setDragY(
      planetFrictionModifier
    )

    this.idle = false

    this.updateAnimation()
  }

  public bounce(multiplier: number): void {
    if (!this.container) return

    this.canDoubleJump = true
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
      -this.jumpStrength * multiplier * 0.75
    )

    this.updateAnimation()
  }

  public updateAnimation(): void {
    if (!this.container || !this.sprite) return

    // * Hurt or Dead
    if (this.isHurting || this.isDead) {
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
    else if (
      Math.floor(
        (<Phaser.Physics.Arcade.Body>this.container.body).velocity.y
      ) !== 0
    ) {
      if ((<Phaser.Physics.Arcade.Body>this.container.body).velocity.y > 0) {
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
      Math.floor((<Phaser.Physics.Arcade.Body>this.container.body).velocity.x) >
        50 ||
      Math.floor((<Phaser.Physics.Arcade.Body>this.container.body).velocity.x) <
        -50
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
    return `Health: ${this.currentHp}/${this.maxHp}`
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
      !this.container ||
      (this.container.body as Phaser.Physics.Arcade.Body).wasTouching.down
    )
      return

    if (
      (this.container.body as Phaser.Physics.Arcade.Body).touching.left &&
      platform.getData('clingSides')
    ) {
      this.wallClingDirection = Direction.Left
    } else if (
      (this.container.body as Phaser.Physics.Arcade.Body).touching.right &&
      platform.getData('clingSides')
    ) {
      this.wallClingDirection = Direction.Right
    } else if (
      (this.container.body as Phaser.Physics.Arcade.Body).touching.up &&
      platform.getData('clingUnder')
    ) {
      this.wallClingDirection = Direction.Up
      if (this.sprite) {
        this.sprite.y -= 16
      }
    }

    if (this.wallClingDirection === null) return
    this.clingPlatform = platform
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocity(0, 0)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setAllowGravity(false)

    this.scene.soundHelper?.playPlayerWallClingSound()
  }

  public wallJump(multiplier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
      this.jumpStrength * multiplier
    )

    this.stopWallCling()

    this.scene.soundHelper?.playPlayerWallJumpSound()
  }

  public stopWallCling(): void {
    if (!this.container) return

    if (this.sprite && this.wallClingDirection === Direction.Up) {
      this.sprite.y += 16
    }
    this.wallClingDirection = null
    this.clingPlatform = null
    this.canDoubleJump = true
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setAllowGravity(true)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setDragY(0)

    this.updateAnimation()
  }

  public setDead(): void {
    this.isDead = true
  }

  public repositionAfterFall(): void {
    this.container?.setPosition(
      this.lastJumpCoordinates.x,
      this.lastJumpCoordinates.y - 5
    )
  }

  protected makeInvulnerable(): void {
    super.makeInvulnerable()
    this.flickerSprite()
  }

  protected triggerKnockbackTween(props: Record<string, unknown>): void {
    if (!this.container || !this.container.body.velocity) return

    this.scene.tweens.add({
      targets: this.container.body.velocity,
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
