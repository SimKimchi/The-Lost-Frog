import 'phaser'
import { Direction } from '../util'
import Character from './character'

export default class Enemy extends Character {
  protected readonly invulnerableTime = 200
  protected readonly moveSpeed = 100
  protected readonly jumpStrength = 400
  protected readonly gravity = 100
  constructor(maxHp: number, damage: number) {
    super(maxHp, damage)
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
    } else if (
      (<Phaser.Physics.Arcade.Body>this.container.body).velocity.x > 0
    ) {
      this.sprite.anims.play('right', true)
    } else {
      this.sprite.anims.play('idle', true)
    }
  }

  public turnAround(): void {
    if (this.direction === Direction.Left) {
      this.run(1)
    } else if (this.direction === Direction.Right) {
      this.run(-1)
    }
    this.updateAnimation()
  }

  public takeDamage(damage: number, deathCallbackFn: () => void): void {
    super.takeDamage(damage, deathCallbackFn)

    if (this.isDead()) {
      this.container?.destroy()
      deathCallbackFn()
    }
  }

  public makeInvulnerable(scene: Phaser.Scene): void {
    super.makeInvulnerable(scene)
    if (!this.sprite) return
    this.sprite.setTint(0xff0000)
    scene.time.addEvent({
      delay: this.invulnerableTime,
      callback: () => this.sprite?.clearTint()
    })
  }
}
