import 'phaser'
import { Direction } from '../util'
import Character from './character'

export default class Enemy extends Character {
  protected moveSpeed = 100
  protected jumpStrength = 400
  protected gravity = 100
  constructor() {
    super(2, 1)
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
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

  public turnAround(): void {
    if (this.direction === Direction.Left) {
      this.run(1)
    } else if (this.direction === Direction.Right) {
      this.run(-1)
    }
  }
}
