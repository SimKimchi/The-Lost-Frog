import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import { CharacterConfig } from '../util'
import CharacterConfigFactory from './characterConfigFactory'

export default abstract class EnemyFactory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const lizard = new Enemy(3, 1, 100, 'lizard')

    const config: CharacterConfig = CharacterConfigFactory.getLizardConfig(
      spawnX,
      spawnY
    )

    return this.createEnemy(scene, planetGravity, lizard, config)
  }

  private static createEnemy(
    scene: Phaser.Scene,
    planetGravity: number,
    enemy: Enemy,
    config: CharacterConfig
  ): Enemy {
    enemy.init(scene, planetGravity, config)

    enemy.setDeathBehavior(this.getEnemyDeathBehavior(enemy, scene))

    return enemy
  }

  private static getEnemyDeathBehavior(
    enemy: Enemy,
    scene: Phaser.Scene
  ): () => void {
    return () => {
      ;(scene.game as TheLostFrogGame).increaseScore(enemy.scoreWorth)
      enemy.getContainer().destroy()
    }
  }
}
