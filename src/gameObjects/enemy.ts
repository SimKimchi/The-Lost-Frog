import 'phaser'
import PlanetScene from '../scenes/planets/planetScene'
import { Direction } from '../util'
import Character from './character'

export default class Enemy extends Character {
  public scoreWorth: number
  protected readonly invulnerableTime = 300
  protected readonly jumpStrength = 400
  protected readonly gravity = 100
  protected die: (() => void) | null
  protected readonly knockback = 1000

  constructor(
    maxHp: number,
    damage: number,
    bodyWidth: number,
    bodyHeight: number,
    moveSpeed: number,
    scoreWorth: number,
    assetPrefix: string,
    scene: PlanetScene
  ) {
    super(maxHp, damage, bodyWidth, bodyHeight, moveSpeed, assetPrefix, scene)
    this.scoreWorth = scoreWorth
    this.die = null
  }

  public jump(multiplier: number): void {
    if (!this._container) return

    if (this.isGrounded()) {
      this.body.setVelocityY(
        this.jumpStrength * multiplier
      )
    }
  }

  public updateAnimation(): void {
    if (!this.sprite || !this._container || !this._container.body) return

    if (this.isInvulnerable()) {
      if (this.direction === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_right`, true)
      }
    } else if (
      this.body.velocity.x < 0
    ) {
      this.sprite.anims.play(`${this.assetPrefix}_run_left`, true)
    } else {
      this.sprite.anims.play(`${this.assetPrefix}_run_right`, true)
    }

    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight)
  }

  public turnAround(): void {
    if (this.direction === Direction.Left) {
      this.run(1)
    } else if (this.direction === Direction.Right) {
      this.run(-1)
    }
    this.updateAnimation()
  }

  public setDeathBehavior(deathBehavior: () => void): void {
    this.die = deathBehavior
  }

  public handleHit(direction: Direction | null, damage: number): void {
    if (this.isInvulnerable()) return

    this.scene.soundHelper?.playEnemyHitSound()
    super.handleHit(direction, damage)
  }

  protected makeInvulnerable(): void {
    super.makeInvulnerable()

    if (!this.sprite) return

    this.updateAnimation()

    this.sprite.setTint(0xff0000)
    this.scene.time.addEvent({
      delay: this.invulnerableTime,
      callback: () => {
        this.sprite?.clearTint()
      }
    })
  }

  protected triggerKnockbackTween(props: Record<string, unknown>): void {
    if (!this._container || !this._container.body.velocity) return

    this.scene.tweens.add({
      targets: this._container.body.velocity,
      duration: 200,
      props,
      onComplete: () => {
        if (!this._container || !this._container.body) return
        this.turnAround() // Dont laugh
        this.turnAround()
      },
      onCompleteScope: this
    })
  }
}
