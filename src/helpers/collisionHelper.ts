import Character from '../gameObjects/character'
import Enemy from '../gameObjects/enemy'
import FlyingEnemy from '../gameObjects/flyingEnemy'
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

          const damageUp: boolean = platform.getData('damageUp')

          if (damageUp) {
            this.player.handleHit(null, 1)
          }
        } else if ((<Phaser.Physics.Arcade.Body>player.body).touching.left) {
          const damageLeft: boolean = platform.getData('damageLeft')

          if (damageLeft) {
            this.player.handleHit(null, 1)
          }
        } else if ((<Phaser.Physics.Arcade.Body>player.body).touching.right) {
          const damageRight: boolean = platform.getData('damageRight')

          if (damageRight) {
            this.player.handleHit(null, 1)
          }
        } else if ((<Phaser.Physics.Arcade.Body>player.body).touching.up) {
          const damageDown: boolean = platform.getData('damageDown')

          if (damageDown) {
            this.player.handleHit(null, 1)
          }
        }
      }
    )
  }

  public setWorldCollisionListener(enemies: Enemy[]): void {
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

  public removeWorldCollisionsListener(): void {
    this.physics.world.removeListener('worldbounds')
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
        (attackSprite) => {
          if (
            !this.player.currentTongueSprite ||
            attackSprite !== this.player.currentTongueSprite ||
            !this.player.currentTongueSprite.visible
          )
            return

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
    touchingDown: boolean,
    touchingLeft: boolean,
    touchingRight: boolean,
    enemies: Enemy[]
  ): void {
    if (!touchingLeft && !touchingRight && !touchingDown) {
      return
    }

    const character = this.findCharacterByContainer(
      [this.player, ...enemies],
      body.gameObject as Phaser.GameObjects.Container
    )
    if (!character) return

    if (character instanceof Enemy) {
      if (touchingLeft || touchingRight) {
        ;(character as Enemy).turnAround()
      } else if (touchingDown && !(character instanceof FlyingEnemy)) {
        ;(character as Enemy).handleHit(Direction.Down, 9001)
      }
    } else if (character instanceof Player) {
      if (touchingDown) {
        ;(character as Player).repositionAfterFall()
        ;(character as Player).handleHit(null, 1)
      }
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
          || (childSprite.x + childSprite.getData('offsetX') + childSprite.width / 2 ===
          platformSprite.x - platformSprite.getData('offsetX') - platformSprite.width / 2)
        ) {
          return child
        }
      } else if (direction === Direction.Right) {
        if (
          childSprite.x - childSprite.width / 2 ===
          platformSprite.x + platformSprite.width / 2
          || (childSprite.x + childSprite.getData('offsetX') - childSprite.width / 2 ===
          platformSprite.x - platformSprite.getData('offsetX') + platformSprite.width / 2)
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
