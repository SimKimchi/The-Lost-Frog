import 'phaser'
import Character from './character'
import { CharacterConfig, Direction } from '../util'
import PlanetScene from '../scenes/planets/planetScene'

export default class Player extends Character {
  private static readonly ATTACK_RANGE = 50
  private static readonly ATTACK_DURATION = 150
  private static readonly ATTACK_COOLDOWN = 400

  protected readonly invulnerableTime = 1000
  protected readonly moveSpeed = 250
  protected readonly jumpStrength = 550
  protected readonly gravity = 200
  private static instance: Player
  private canDoubleJump = false
  private tongueSprite: Phaser.Physics.Arcade.Sprite | null
  private inAttackCooldown: boolean
  public wallClingDirection: Direction | null
  protected die: (() => void) | null
  protected readonly knockback = 42.5

  private constructor(scene: PlanetScene, die: () => void) {
    super(6, 1, 64, 64, 'frog', scene)
    this.tongueSprite = null
    this.inAttackCooldown = false
    this.wallClingDirection = null
    this.die = die
  }

  public static getPlayer(scene: PlanetScene, die: () => void): Player {
    Player.instance = new Player(scene, die)

    return Player.instance
  }

  public init(planetGravity: number, config: CharacterConfig): void {
    super.init(planetGravity, config)

    if (!this.container) return

    this.tongueSprite = this.scene.physics.add.sprite(0, 0, 'bomb')
    ;(<Phaser.Physics.Arcade.Body>this.tongueSprite.body).setAllowGravity(false)
    this.tongueSprite.setVisible(false)

    this.container.add(this.tongueSprite)
  }

  public getAttackSprite(): Phaser.Physics.Arcade.Sprite {
    return this.tongueSprite as Phaser.Physics.Arcade.Sprite
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      this.canDoubleJump = true
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
      this.scene.soundHelper?.playPlayerJumpSound()
    } else if (this.canDoubleJump) {
      this.canDoubleJump = false
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
      this.scene.soundHelper?.playPlayerDoubleJumpSound()
    }
  }

  public climb(multiplier: number): void {
    if (!this.container) return

    if ((<Phaser.Physics.Arcade.Body>this.container.body).touching.down) {
      this.stopWallCling()

      return
    }

    const velocityY = this.moveSpeed * multiplier
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(velocityY)

    if (velocityY > 0) {
      this.direction = Direction.Down
    } else if (velocityY < 0) {
      this.direction = Direction.Up
    }

    this.idle = false
  }

  public bounce(multiplier: number): void {
    if (!this.container) return

    this.canDoubleJump = true
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
      -this.jumpStrength * multiplier * 0.75
    )
  }

  public updateAnimation(): void {
    if (!this.container || !this.sprite) return

    // TODO: Implement 'jump' and 'fall' animations when we'll have them
    if (this.wallClingDirection !== null) {
      if (this.wallClingDirection === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_idle_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_idle_right`, true)
      }
    } else if (this.idle) {
      if (this.direction === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_idle_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_idle_right`, true)
      }
    } else {
      if (this.direction === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_run_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_run_right`, true)
      }
    }

    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight)
  }

  public getDisplayHp(): string {
    return `Health: ${this.currentHp}/${this.maxHp}`
  }

  public attack(direction: Direction): void {
    if (this.inAttackCooldown) return

    // TODO jouer une animation d'attaque quand ce sera une spritesheet
    this.renderAttack(direction)
    this.setAttackDuration()
    this.setAttackCooldown()
  }

  public handleHit(direction: Direction, damage: number): void {
    if (this.isInvulnerable()) return

    this.scene.sound.get('hurt').play()
    super.handleHit(direction, damage)
  }

  public clingToWall(): void {
    if (
      this.wallClingDirection !== null ||
      !this.container ||
      (this.container.body as Phaser.Physics.Arcade.Body).wasTouching.down
    )
      return

    if ((this.container.body as Phaser.Physics.Arcade.Body).touching.left) {
      this.wallClingDirection = Direction.Left
    } else if (
      (this.container.body as Phaser.Physics.Arcade.Body).touching.right
    ) {
      this.wallClingDirection = Direction.Right
    } else if (
      (this.container.body as Phaser.Physics.Arcade.Body).touching.up
    ) {
      this.wallClingDirection = Direction.Up
    }

    if (this.wallClingDirection === null) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocity(0, 0)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setAllowGravity(false)

    this.scene.soundHelper?.playPlayerWallClingSound()
  }

  public wallJump(multiplier: number): void {
    if (!this.container) return

    this.wallClingDirection = null
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setAllowGravity(true)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
      this.jumpStrength * multiplier
    )

    this.scene.soundHelper?.playPlayerWallJumpSound()
    this.canDoubleJump = true
  }

  public stopWallCling(): void {
    if (!this.container) return

    this.wallClingDirection = null
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setAllowGravity(true)

    this.scene.soundHelper?.playPlayerWallJumpSound()
  }

  protected makeInvulnerable(): void {
    super.makeInvulnerable()
    this.flickerSprite()
  }

  private renderAttack(direction: Direction): void {
    if (!this.tongueSprite) return

    if (direction === Direction.Right) {
      this.tongueSprite.x = Player.ATTACK_RANGE
      this.tongueSprite.y = 2
    } else if (direction === Direction.Left) {
      this.tongueSprite.x = -Player.ATTACK_RANGE
      this.tongueSprite.y = 2
    } else if (direction === Direction.Up) {
      this.tongueSprite.x = 0
      this.tongueSprite.y = -Player.ATTACK_RANGE
    } else if (direction === Direction.Down) {
      this.tongueSprite.x = 0
      this.tongueSprite.y = Player.ATTACK_RANGE
    }

    this.tongueSprite.setData('direction', direction)
    this.tongueSprite.setVisible(true)
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
    if (!player.tongueSprite) return

    player.tongueSprite.setVisible(false)
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
