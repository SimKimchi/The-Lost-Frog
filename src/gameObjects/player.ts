/* eslint-disable indent */
import 'phaser'
import Character from './character'
import { CharacterConfig, Direction } from '../util'

export default class Player extends Character {
  private static readonly ATTACK_RANGE = 50
  private static readonly ATTACK_DURATION = 200
  private static readonly ATTACK_COOLDOWN = 400

  private static instance: Player
  private canDoubleJump = false
  private tongueSprite: Phaser.Physics.Arcade.Sprite | null
  private inAttackCooldown: boolean

  constructor() {
    super(5, 1)
    this.tongueSprite = null
    this.inAttackCooldown = false
  }

  public init(
    scene: Phaser.Scene,
    planetGravity: number,
    config: CharacterConfig
  ): void {
    super.init(scene, planetGravity, config)

    if (!this.container) return

    this.tongueSprite = scene.physics.add.sprite(0, 0, 'bomb')
    ;(<Phaser.Physics.Arcade.Body>this.tongueSprite.body).setAllowGravity(false)
    this.tongueSprite.setVisible(false)

    this.container.add(this.tongueSprite)
  }

  public getAttackSprite(): Phaser.Physics.Arcade.Sprite {
    return this.tongueSprite as Phaser.Physics.Arcade.Sprite
  }

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player()
    }

    return Player.instance
  }

  public run(multiplier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityX(
      Player.VELOCITY_X * multiplier
    )
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      this.canDoubleJump = true
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        Player.VELOCITY_Y * multiplier
      )
    } else if (this.canDoubleJump) {
      this.canDoubleJump = false
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        Player.VELOCITY_Y * multiplier
      )
    }
  }

  public updateAnimation(): void {
    if (!this.container || !this.sprite) return

    // TODO: Implement 'jump' and 'fall' animations when we'll have them
    if ((<Phaser.Physics.Arcade.Body>this.container.body).velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (
      (<Phaser.Physics.Arcade.Body>this.container.body).velocity.x > 0
    ) {
      this.sprite.anims.play('right', false)
    } else {
      this.sprite.anims.play('idle', false)
    }
  }

  public displayHp(): string {
    return `Health: ${this.currentHp}/${this.maxHp}`
  }

  public attack(scene: Phaser.Scene, direction: Direction): void {
    if (this.inAttackCooldown) return

    // TODO jouer une animation d'attaque quand ce sera une spritesheet
    this.renderAttack(direction)
    this.setAttackDuration(scene)
    this.setAttackCooldown(scene)
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
    this.tongueSprite.setVisible(true)
  }

  private setAttackDuration(scene: Phaser.Scene): void {
    scene.time.addEvent({
      delay: Player.ATTACK_DURATION,
      args: [this],
      callback: this.endAttack,
      callbackScope: scene
    })
  }

  private setAttackCooldown(scene: Phaser.Scene): void {
    this.inAttackCooldown = true
    scene.time.addEvent({
      delay: Player.ATTACK_COOLDOWN,
      args: [this],
      callback: this.resetAttackCooldown,
      callbackScope: scene
    })
  }

  private endAttack(player: Player): void {
    if (!player.tongueSprite) return

    player.tongueSprite.setVisible(false)
  }

  private resetAttackCooldown(player: Player): void {
    player.inAttackCooldown = false
  }
}
