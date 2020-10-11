/* eslint-disable indent */
import 'phaser'
import Character from './character'
import { CharacterConfig } from '../util'

export default class Player extends Character {
  private static instance: Player
  private canDoubleJump = false
  private tongueSprite: Phaser.Physics.Arcade.Sprite | null

  constructor() {
    super(5, 1)
    this.tongueSprite = null
  }

  public init(
    scene: Phaser.Scene,
    planetGravity: number,
    config: CharacterConfig
  ): void {
    super.init(scene, planetGravity, config)

    if (!this.container) return

    //this.tongueSprite = scene.add.sprite(50, 2, 'bomb')
    this.tongueSprite = scene.physics.add.sprite(50, 2, 'bomb')
    this.tongueSprite.setGravityY(-1500)

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

    // TODO: Uncomment once we have the 'jump' and 'fall' animations
    // if (this.sprite.body.velocity.y < 0) {
    //   this.sprite.anims.play('up', true)
    // } else if (this.sprite.body.velocity.y > 0) {
    //   this.sprite.anims.play('down', true)
    // } else
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
}
