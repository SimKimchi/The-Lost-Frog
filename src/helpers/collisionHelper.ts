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
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null,
    floor: Phaser.Physics.Arcade.Sprite | null
  ): void {
    this.setPlayerPlatformCollisions(platformGroup)
    this.setEnemyWorldCollisions()
    this.setFloorCollisions(floor)
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

    this.physics.add.collider(
      [this.player.getContainer()],
      platformGroup,
      () => {
        this.player.clingToWall()
      }
    )
  }

  private setFloorCollisions(floor: Phaser.Physics.Arcade.Sprite | null): void {
    if (!floor) return

    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })

    this.physics.add.collider(
      [this.player.getContainer(), ...enemyContainers],
      floor
    )
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

    this.physics.add.collider(
      enemyContainers,
      platformGroup,
      (enemy, platform) => {
        const body = enemy.body as Phaser.Physics.Arcade.Body
        const platformSprite = platform as Phaser.GameObjects.Sprite
        let mustTurnAround = this.checkWallCollision(body)
        if (this.checkPlatformEdge(body, platformSprite, platformGroup)) {
          mustTurnAround = true
        }
        if (
          (enemy.body as Phaser.Physics.Arcade.Body).touching.down &&
          platformSprite.width <= body.width
        ) {
          mustTurnAround = false
        }
        if (mustTurnAround) {
          ;(this.findCharacterByContainer(
            this.enemies,
            enemy as Phaser.GameObjects.Container
          ) as Enemy).turnAround()
        }
      }
    )
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

  private checkWallCollision(body: Phaser.Physics.Arcade.Body): boolean {
    return body.touching.left || body.touching.right
  }

  private checkPlatformEdge(
    body: Phaser.Physics.Arcade.Body,
    platformSprite: Phaser.GameObjects.Sprite,
    platformGroup: Phaser.Physics.Arcade.StaticGroup
  ): boolean {
    let direction = null
    if (body.velocity.x > 0) {
      direction = Direction.Right
    } else if (body.velocity.x < 0) {
      direction = Direction.Left
    }
    const isAtEdge = this.isAtEdge(body, platformSprite, direction)
    const hasAdjacentPlatform = this.hasAdjacentPlatform(
      platformSprite,
      platformGroup,
      direction
    )

    return isAtEdge && !hasAdjacentPlatform
  }

  private isAtEdge(
    body: Phaser.Physics.Arcade.Body,
    platformSprite: Phaser.GameObjects.Sprite,
    direction: Direction | null
  ): boolean {
    if (direction === Direction.Right) {
      if (
        body.position.x + body.width >=
        platformSprite.x + platformSprite.width / 2
      ) {
        return true
      }
    } else if (direction === Direction.Left) {
      if (body.position.x <= platformSprite.x - platformSprite.width / 2) {
        return true
      }
    }
    return false
  }

  private hasAdjacentPlatform(
    platformSprite: Phaser.GameObjects.Sprite,
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction | null
  ): boolean {
    const platform = platformGroup.children.getArray().find((child) => {
      const childSprite = child as Phaser.GameObjects.Sprite
      if (childSprite.y !== platformSprite.y) {
        return undefined
      }
      if (direction === Direction.Left) {
        if (
          childSprite.x + childSprite.width / 2 ===
          platformSprite.x - platformSprite.width / 2
        ) {
          return child
        }
      } else if (direction === Direction.Right) {
        if (
          childSprite.x - childSprite.width / 2 ===
          platformSprite.x + platformSprite.width / 2
        ) {
          return child
        }
      }
      return undefined
    })
    return platform ? true : false
  }
}
