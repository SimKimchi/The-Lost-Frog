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
    scoreWorth: number,
    assetPrefix: string,
    scene: PlanetScene
  ) {
    super(maxHp, damage, bodyWidth, bodyHeight, scoreWorth, assetPrefix, scene)
  }

  public init(planetGravity: number, config: CharacterConfig): void {
    super.init(planetGravity, config)
    ;(<Phaser.Physics.Arcade.Body>this.getContainer().body).setAllowGravity(
      false
    )
  }

  public fly(player: Player): void {
    if (
      !(<Phaser.Physics.Arcade.Body>player.getContainer().body) ||
      !(<Phaser.Physics.Arcade.Body>this.getContainer().body)
    )
      return

    const playerPos = (<Phaser.Physics.Arcade.Body>player.getContainer().body)
      .position
    const enemyPos = (<Phaser.Physics.Arcade.Body>this.getContainer().body)
      .position
    const distance = Math.sqrt(
      Math.pow(playerPos.x - enemyPos.x, 2) +
        Math.pow(playerPos.y - enemyPos.y, 2)
    )

    if (distance < this.aggroRange) {
      const velocityX =
        playerPos.x < enemyPos.x ? -this.moveSpeed : this.moveSpeed
      const velocityY =
        playerPos.y < enemyPos.y ? -this.moveSpeed : this.moveSpeed
      ;(<Phaser.Physics.Arcade.Body>this.getContainer().body).setVelocity(
        velocityX,
        velocityY
      )
      this.idle = false
    } else {
      ;(<Phaser.Physics.Arcade.Body>this.getContainer().body).setVelocity(0)
      this.idle = true
    }

    this.direction = enemyPos.x > playerPos.x ? Direction.Left : Direction.Right

    if (playerPos.x - enemyPos.x < -2 || playerPos.x - enemyPos.x > 2) {
      this.updateAnimation()
    }
  }

  public updateAnimation(): void {
    if (!this.sprite || !this.container || !this.container.body) return

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
  }

  protected triggerKnockbackTween(props: Record<string, unknown>): void {
    if (!this.container || !this.container.body.velocity) return

    this.scene.tweens.add({
      targets: this.container.body.velocity,
      duration: 200,
      props
    })
  }
}
