import 'phaser'
import { Direction } from '../util'
import Character from './character'

export default class Enemy extends Character {
  public scoreWorth: number
  protected readonly invulnerableTime = 200
  protected readonly moveSpeed = 100
  protected readonly jumpStrength = 400
  protected readonly gravity = 100
  protected die: (() => void) | null

  constructor(
    maxHp: number,
    damage: number,
    scoreWorth: number,
    assetPrefix: string
  ) {
    super(maxHp, damage, assetPrefix)
    this.scoreWorth = scoreWorth
    this.die = null
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
      this.sprite.anims.play(`${this.assetPrefix}_left`, true)
    } else if (
      (<Phaser.Physics.Arcade.Body>this.container.body).velocity.x > 0
    ) {
      this.sprite.anims.play(`${this.assetPrefix}_right`, true)
    } else {
      this.sprite.anims.play(`${this.assetPrefix}_idle`, true)
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

  public makeInvulnerable(scene: Phaser.Scene): void {
    super.makeInvulnerable(scene)
    if (!this.sprite) return
    this.sprite.setTint(0xff0000)
    scene.time.addEvent({
      delay: this.invulnerableTime,
      callback: () => this.sprite?.clearTint()
    })
  }

  public setDeathBehavior(deathBehavior: () => void): void {
    this.die = deathBehavior
  }
}
