import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import CharacterConfigFactory from './characterConfigFactory'

export default abstract class EnemyFactory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const lizard = new Enemy(3, 1, 100)

    return this.createEnemy(scene, planetGravity, spawnX, spawnY, lizard)
  }

  private static createEnemy(
    scene: Phaser.Scene,
    planetGravity: number,
    spawnX: number,
    spawnY: number,
    enemy: Enemy
  ): Enemy {
    enemy.init(
      scene,
      planetGravity,
      CharacterConfigFactory.getLizardConfig(spawnX, spawnY)
    )

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
