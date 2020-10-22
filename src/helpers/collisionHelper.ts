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
  private playerVsPlatformCollider: Phaser.Physics.Arcade.Collider | null
  private enemyVsPlatformCollider: Phaser.Physics.Arcade.Collider | null

  constructor(physics: Phaser.Physics.Arcade.ArcadePhysics, player: Player) {
    this.physics = physics
    this.player = player
    this.playerVsPlatformCollider = null
    this.enemyVsPlatformCollider = null
  }

  public setNextWaveCollisions(
    platformLayout: Phaser.Physics.Arcade.StaticGroup | null,
    enemies: Enemy[]
  ): void {
    this.setPlayerPlatformCollisions(platformLayout)
    this.setEnemyPlatformCollisions(platformLayout, enemies)
    this.setPlayerCollisionsWithEnemies(enemies)
    this.setPlayerAttackCollisions(enemies)
  }

  public checkPlatformEdge(
    body: Phaser.Physics.Arcade.Body,
    platformSprite: Phaser.GameObjects.Sprite,
    platformLayout: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction | null
  ): IEdge {
    const isAtEdge = this.isAtEdge(body, platformSprite, direction)
    const adjacentPlatform = this.hasAdjacentPlatform(
      platformSprite,
      platformLayout,
      direction
    )

    return {
      isAtEdge,
      adjacentPlatform
    }
  }

  public setPlayerPlatformCollisions(
    platformLayout: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    if (!platformLayout) return

    this.playerVsPlatformCollider = this.physics.add.collider(
      [this.player.getContainer()],
      platformLayout,
      (player, platform) => {
        this.player.clingToWall(platform as Phaser.GameObjects.Sprite)
        if ((<Phaser.Physics.Arcade.Body>player.body).touching.down) {
          this.player.canDoubleJump = true
        }
      }
    )
  }

  public setEnemyWorldCollisions(enemies: Enemy[]): void {
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
          touchingRight,
          enemies
        )
    )
  }

  public removeEnemyVsPlatformCollider(): void {
    if (!this.enemyVsPlatformCollider) return

    this.physics.world.removeCollider(this.enemyVsPlatformCollider)
    this.enemyVsPlatformCollider.destroy()
  }

  public removePlayerVsPlatformCollider(): void {
    if (!this.playerVsPlatformCollider) return

    this.physics.world.removeCollider(this.playerVsPlatformCollider)
    this.playerVsPlatformCollider.destroy()
  }

  public setEnemyPlatformCollisions(
    platformLayout: Phaser.Physics.Arcade.StaticGroup | null,
    enemies: Enemy[]
  ): void {
    if (!platformLayout) return

    const enemyContainers = enemies
      .filter((enemy) => enemy.constructor.name !== 'FlyingEnemy')
      .map((enemy) => {
        return enemy.getContainer()
      })

    this.enemyVsPlatformCollider = this.physics.add.collider(
      enemyContainers,
      platformLayout,
      (enemy, platform) => {
        const body = enemy.body as Phaser.Physics.Arcade.Body
        const platformSprite = platform as Phaser.GameObjects.Sprite
        const mustTurnAroundWallCollision = this.checkWallCollision(body)
        let direction = null
        if (body.velocity.x > 0) {
          direction = Direction.Right
        } else if (body.velocity.x < 0) {
          direction = Direction.Left
        }
        const checkEdge = this.checkPlatformEdge(
          body,
          platformSprite,
          platformLayout,
          direction
        )
        let mustTurnAroundPlatformEdge =
          checkEdge.isAtEdge && !checkEdge.adjacentPlatform
        if (
          (enemy.body as Phaser.Physics.Arcade.Body).touching.down &&
          platformSprite.getData('letEnemiesFall')
        ) {
          mustTurnAroundPlatformEdge = false
        }
        if (mustTurnAroundWallCollision || mustTurnAroundPlatformEdge) {
          ;(this.findCharacterByContainer(
            enemies,
            enemy as Phaser.GameObjects.Container
          ) as Enemy).turnAround()
        }
      }
    )
  }

  public setPlayerCollisionsWithEnemies(enemies: Enemy[]): void {
    const enemyContainers = enemies.map((enemy) => {
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

  public setPlayerAttackCollisions(enemies: Enemy[]): void {
    const attackSprites = this.player.getAttackSprites()
    for (const key in enemies) {
      this.physics.add.overlap(
        attackSprites,
        enemies[key].getContainer(),
        () => {
          if (!this.player.currentTongueSprite) return
          if (!this.player.currentTongueSprite.visible) return
          if (
            this.player.currentTongueSprite.getData('direction') ===
            Direction.Down
          ) {
            this.player.bounce(1.25)
          }
          enemies[key].handleHit(
            this.player.currentTongueSprite.getData('direction'),
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
    touchingRight: boolean,
    enemies: Enemy[]
  ): void {
    if (!touchingLeft && !touchingRight) {
      return
    }

    const character = this.findCharacterByContainer(
      [this.player, ...enemies],
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
    return (
      (body.touching.left && body.velocity.x <= 0) ||
      (body.touching.right && body.velocity.x >= 0)
    )
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
    platformLayout: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction | null
  ): Phaser.GameObjects.Sprite | undefined {
    let axis = 'x'
    if (direction === Direction.Up || direction === Direction.Down) {
      axis = 'y'
    }
    const platform = platformLayout.children.getArray().find((child) => {
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
