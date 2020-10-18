import Character from '../gameObjects/character'
import Enemy from '../gameObjects/enemy'
import Player from '../gameObjects/player'
import { Direction } from '../util'

export interface IEdge {
  isAtEdge: boolean
  adjacentPlatform: Phaser.GameObjects.Sprite | undefined
}

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

  public checkPlatformEdge(
    body: Phaser.Physics.Arcade.Body,
    platformSprite: Phaser.GameObjects.Sprite,
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction | null
  ): IEdge {
    const isAtEdge = this.isAtEdge(body, platformSprite, direction)
    const adjacentPlatform = this.hasAdjacentPlatform(
      platformSprite,
      platformGroup,
      direction
    )

    return {
      isAtEdge,
      adjacentPlatform
    }
  }

  private setPlayerPlatformCollisions(
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    if (!platformGroup) return

    this.physics.add.collider(
      [this.player.getContainer()],
      platformGroup,
      (_player, platform) => {
        this.player.clingToWall(platform as Phaser.GameObjects.Sprite)
      }
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
        let direction = null
        if (body.velocity.x > 0) {
          direction = Direction.Right
        } else if (body.velocity.x < 0) {
          direction = Direction.Left
        }
        const checkEdge = this.checkPlatformEdge(
          body,
          platformSprite,
          platformGroup,
          direction
        )
        if (checkEdge.isAtEdge && !checkEdge.adjacentPlatform) {
          mustTurnAround = true
        }
        if (platformSprite.width <= body.width) {
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
    } else if (direction === Direction.Up) {
      if (body.position.y <= platformSprite.y - platformSprite.height / 2) {
        return true
      }
    } else if (direction === Direction.Down) {
      if (
        body.position.y + body.height >=
        platformSprite.y + platformSprite.height / 2
      ) {
        return true
      }
    }
    return false
  }

  private hasAdjacentPlatform(
    platformSprite: Phaser.GameObjects.Sprite,
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction | null
  ): Phaser.GameObjects.Sprite | undefined {
    let axis = 'x'
    if (direction === Direction.Up || direction === Direction.Down) {
      axis = 'y'
    }
    const platform = platformGroup.children.getArray().find((child) => {
      const childSprite = child as Phaser.GameObjects.Sprite
      if (axis === 'x' && childSprite.y !== platformSprite.y) {
        return undefined
      } else if (axis === 'y' && childSprite.x !== platformSprite.x) {
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
      } else if (direction === Direction.Up) {
        if (
          childSprite.y + childSprite.height / 2 ===
          platformSprite.y - platformSprite.height / 2
        ) {
          return child
        }
      } else if (direction === Direction.Down) {
        if (
          childSprite.y - childSprite.height / 2 ===
          platformSprite.y + platformSprite.height / 2
        ) {
          return child
        }
      }
      return undefined
    })
    return platform as Phaser.GameObjects.Sprite
  }
}
