import 'phaser'
import PlanetScene from '../scenes/planets/planetScene'
import { Direction } from '../util'
import Character from './character'

export default class Enemy extends Character {
  public scoreWorth: number
  protected readonly invulnerableTime = 300
  protected readonly moveSpeed = 75
  protected readonly jumpStrength = 400
  protected readonly gravity = 100
  protected die: (() => void) | null
  protected readonly knockback = 1000

  constructor(
    maxHp: number,
    damage: number,
    bodyWidth: number,
    bodyHeight: number,
    scoreWorth: number,
    assetPrefix: string,
    scene: PlanetScene
  ) {
    super(maxHp, damage, bodyWidth, bodyHeight, assetPrefix, scene)
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
    if (!this.sprite || !this.container || !this.container.body) return

    if (this.isInvulnerable()) {
      if (this.direction === Direction.Left) {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_hurt_right`, true)
      }
    } else if (
      (<Phaser.Physics.Arcade.Body>this.container.body).velocity.x < 0
    ) {
      this.sprite.anims.play(`${this.assetPrefix}_left`, true)
    } else {
      this.sprite.anims.play(`${this.assetPrefix}_right`, true)
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

  public handleHit(direction: Direction, damage: number): void {
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
}
