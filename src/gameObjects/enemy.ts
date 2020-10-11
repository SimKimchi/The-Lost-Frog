import 'phaser'
import Character from './character'

export default class Enemy extends Character {
  constructor() {
    super(2, 1)
  }

  public run(multiplier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityX(
      Enemy.VELOCITY_X * multiplier
    )
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        Enemy.VELOCITY_Y * multiplier
      )
    }
  }

  public updateAnimation(): void {
    if (!this.sprite || !this.container) return

    if ((<Phaser.Physics.Arcade.Body>this.container.body).velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.anims.play('right', false)
    } else {
      this.sprite.anims.play('idle', false)
    }
  }
}
