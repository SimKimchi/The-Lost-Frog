import PlanetScene from '../scenes/planets/planetScene'
import { CharacterConfig, Direction } from '../util'
import Enemy from './enemy'
import Player from './player'

export default class FlyingEnemy extends Enemy {
  private readonly aggroRange = 300

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
    super(
      maxHp,
      damage,
      bodyWidth,
      bodyHeight,
      moveSpeed,
      scoreWorth,
      assetPrefix,
      scene
    )
  }

  public init(planetGravity: number, config: CharacterConfig): void {
    super.init(planetGravity, config)
    this.body.setAllowGravity(
      false
    )
  }

  public fly(player: Player): void {
    if (!player.body || !this.body)
      return

    const playerPos = player.body.position
    const enemyPos = this.body.position
    const distance = Math.sqrt(
      Math.pow(playerPos.x - enemyPos.x, 2) +
        Math.pow(playerPos.y - enemyPos.y, 2)
    )

    if (distance < this.aggroRange) {
      const velocityX =
        playerPos.x < enemyPos.x ? -this.moveSpeed : this.moveSpeed
      let velocityY =
        playerPos.y < enemyPos.y ? -this.moveSpeed : this.moveSpeed
      if (playerPos.y - enemyPos.y > -2 && playerPos.y - enemyPos.y < 2) {
        velocityY = 0
      }
      this.body.setVelocity(
        velocityX,
        velocityY
      )
      this.idle = false
    } else {
      this.body.setVelocity(0)
      this.idle = true
    }

    this.direction = enemyPos.x > playerPos.x ? Direction.Left : Direction.Right

    if (playerPos.x - enemyPos.x < -2 || playerPos.x - enemyPos.x > 2) {
      this.updateAnimation()
    }
  }

  public updateAnimation(): void {
    if (!this.sprite || !this._container || !this._container.body) return

    // * Hurt
    if (this.isInvulnerable()) {
      this.sprite.anims.play(`${this.assetPrefix}_hurt`, true)
    }
    // * Idle
    else if (this.idle) {
      if (this.isFacingLeft()) {
        this.sprite.anims.play(`${this.assetPrefix}_idle_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_idle_right`, true)
      }
    }
    // * Fly
    else {
      if (this.isFacingLeft()) {
        this.sprite.anims.play(`${this.assetPrefix}_fly_left`, true)
      } else {
        this.sprite.anims.play(`${this.assetPrefix}_fly_right`, true)
      }
    }

    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight)
  }

  protected triggerKnockbackTween(props: Record<string, unknown>): void {
    if (!this._container || !this._container.body.velocity) return

    this.scene.tweens.add({
      targets: this._container.body.velocity,
      duration: 200,
      props
    })
  }
}
