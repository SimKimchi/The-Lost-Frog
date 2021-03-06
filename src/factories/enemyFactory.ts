/* eslint-disable indent */
import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import { CharacterConfig, EnemyType, getRandomInt } from '../util'
import CharacterConfigProvider from '../providers/characterConfigProvider'
import PlanetScene from '../scenes/planets/planetScene'
import FlyingEnemy from '../gameObjects/flyingEnemy'

export default abstract class EnemyFactory {
  public static createEnemyByType(
    type: EnemyType,
    scene: PlanetScene,
    spawnX: number,
    spawnY: number
  ): Enemy {
    let enemy: Enemy
    switch (type) {
      case EnemyType.Lizard:
        enemy = EnemyFactory.createLizard(scene, spawnX, spawnY)
        break
      case EnemyType.Owl:
        enemy = EnemyFactory.createOwl(scene, spawnX, spawnY)
        break
      case EnemyType.Fox:
        enemy = EnemyFactory.createFox(scene, spawnX, spawnY)
    }
    return enemy
  }

  private static createLizard(
    scene: PlanetScene,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const lizard = new Enemy(2, 1, 56, 28, 75, 100, 'lizard', scene)

    const config: CharacterConfig = CharacterConfigProvider.getLizardConfig(
      spawnX,
      spawnY
    )

    return this.createEnemy(scene, scene.velocityYModifier, lizard, config)
  }

  private static createOwl(
    scene: PlanetScene,
    spawnX: number,
    spawnY: number
  ): FlyingEnemy {
    const owl = new FlyingEnemy(6, 1, 96, 96, 105, 250, 'owl', scene)

    const owlSpawnOffsetX = 16
    const owlSpawnOffsetY = 16

    const config: CharacterConfig = CharacterConfigProvider.getOwlConfig(
      spawnX + owlSpawnOffsetX,
      spawnY + owlSpawnOffsetY
    )

    return this.createEnemy(
      scene,
      scene.velocityYModifier,
      owl,
      config
    ) as FlyingEnemy
  }

  private static createFox(
    scene: PlanetScene,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const fox = new Enemy(4, 2, 96, 96, 150, 300, 'fox', scene)

    const config: CharacterConfig = CharacterConfigProvider.getFoxConfig(
      spawnX,
      spawnY
    )

    return this.createEnemy(scene, scene.velocityYModifier, fox, config)
  }

  private static createEnemy(
    scene: PlanetScene,
    planetGravity: number,
    enemy: Enemy,
    config: CharacterConfig
  ): Enemy | FlyingEnemy {
    enemy.init(planetGravity, config)

    this.initializeEnemyBehavior(enemy, scene)
    enemy.setDeathBehavior(this.getEnemyDeathBehavior(enemy, scene))
    enemy.updateAnimation()

    return enemy
  }

  private static getEnemyDeathBehavior(
    enemy: Enemy,
    scene: Phaser.Scene
  ): () => void {
    return () => {
      ;(scene.game as TheLostFrogGame).increaseScore(enemy.scoreWorth)
      enemy.container.destroy()
      scene.events.emit('enemyKilled')
    }
  }

  private static initializeEnemyBehavior(
    enemy: Enemy,
    scene: PlanetScene
  ): void {
    if (enemy instanceof FlyingEnemy) return

    const direction = getRandomInt(2)
    if (direction === 1) {
      enemy.run(-scene.velocityXModifier)
    } else {
      enemy.run(scene.velocityXModifier)
    }
  }
}
