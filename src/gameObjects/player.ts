/* eslint-disable indent */
import 'phaser'
import Character from './character'

export default class Player extends Character {
  private static instance: Player

  constructor() {
    super(5, 1)
  }

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player()
    }

    return Player.instance
  }

  public run(multiplier: number): void {
    if (!this.sprite) return

    this.sprite.setVelocityX(Player.VELOCITY_X * multiplier)
  }

  public jump(multiplier: number): void {
    if (!this.sprite) return

    if (this.isGrounded()) {
      this.sprite.setVelocityY(Player.VELOCITY_Y * multiplier)
    }
  }

  public updateAnimation(): void {
    if (!this.sprite) return

    // TODO: Uncomment once we have the 'jump' and 'fall' animations
    // if (this.sprite.body.velocity.y < 0) {
    //   this.sprite.anims.play('up', true)
    // } else if (this.sprite.body.velocity.y > 0) {
    //   this.sprite.anims.play('down', true)
    // } else
    if (this.sprite.body.velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.anims.play('right', false)
    } else {
      this.sprite.anims.play('idle', false)
    }
  }

  public displayHp(): string {
    return `Health: ${this.currentHp}/${this.maxHp}`
  }

  public setGravity(multiplier: number): void {
    if (!this.sprite) return
    ;(<Phaser.Physics.Arcade.Body>this.sprite.body).setGravityY(
      Player.GRAVITY * multiplier
    )
  }
}
