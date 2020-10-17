import Character from '../gameObjects/character'
import Enemy from '../gameObjects/enemy'
import Player from '../gameObjects/player'
import { Direction } from '../util'

export default class CollisionHelper {
  private physics: Phaser.Physics.Arcade.ArcadePhysics
  private player: Player
  private enemies: Enemy[]

  constructor(physics: Phaser.Physics.Arcade.ArcadePhysics, player: Player) {
    this.physics = physics
    this.player = player
    this.enemies = []
  }

  public initializeCollisions(
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    this.setPlayerPlatformCollisions(platformGroup)
    this.setEnemyWorldCollisions()
  }

  public setCollisionsAfterEnemySpawn(
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null,
    enemies: Enemy[]
  ): void {
    this.enemies = enemies
    this.setEnemyPlatformCollisions(platformGroup)
    this.setPlayerCollisionsWithEnemies()
    this.setPlayerAttackCollisions()
  }

  private setPlayerPlatformCollisions(
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    if (!platformGroup) return

    this.physics.add.collider([this.player.getContainer()], platformGroup)
  }

  private setEnemyWorldCollisions(): void {
    this.physics.world.on(
      'worldbounds',
      (
        body: Phaser.Physics.Arcade.Body,
        touchingUp: boolean,
        touchingDown: boolean,
        touchingLeft: boolean,
        touchingRight: boolean
      ) =>
        this.onBodyTouchesWorldBound(
          body,
          touchingUp,
          touchingDown,
          touchingLeft,
          touchingRight
        )
    )
  }

  private setEnemyPlatformCollisions(
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    if (!platformGroup) return

    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })

    this.physics.add.collider(enemyContainers, platformGroup, (enemy) => {
      if (
        (enemy.body as Phaser.Physics.Arcade.Body).touching.left ||
        (enemy.body as Phaser.Physics.Arcade.Body).touching.right
      ) {
        ;(this.findCharacterByContainer(
          this.enemies,
          enemy as Phaser.GameObjects.Container
        ) as Enemy).turnAround()
      }
    })
  }

  private setPlayerCollisionsWithEnemies(): void {
    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })

    this.physics.add.overlap(
      this.player.getContainer(),
      enemyContainers,
      (frog, enemy) => {
        const direction =
          enemy.body.position.x >= frog.body.position.x
            ? Direction.Left
            : Direction.Right
        this.player.handleHit(direction, enemy.getData('damage'))
      }
    )
  }

  private setPlayerAttackCollisions(): void {
    const attackSprite = this.player.getAttackSprite()
    for (const key in this.enemies) {
      this.physics.add.overlap(
        attackSprite,
        this.enemies[key].getContainer(),
        () => {
          if (!attackSprite.visible) return
          if (attackSprite.getData('direction') === Direction.Down) {
            this.player.bounce(1.25)
          }
          this.enemies[key].handleHit(
            attackSprite.getData('direction'),
            this.player.getContainer().getData('damage')
          )
        }
      )
    }
  }

  private onBodyTouchesWorldBound(
    body: Phaser.Physics.Arcade.Body,
    _touchingUp: boolean,
    _touchingDown: boolean,
    touchingLeft: boolean,
    touchingRight: boolean
  ): void {
    if (!touchingLeft && !touchingRight) {
      return
    }

    const character = this.findCharacterByContainer(
      [this.player, ...this.enemies],
      body.gameObject as Phaser.GameObjects.Container
    )

    if (character && character instanceof Enemy) {
      ;(character as Enemy).turnAround()
    }
  }

  private findCharacterByContainer(
    characters: Character[],
    container: Phaser.GameObjects.Container
  ): Character | undefined {
    return characters.find((x) => x.getContainer() === container)
  }
}
