import Enemy from '../gameObjects/enemy'
import CharacterConfigFactory from './characterConfigFactory'

export default abstract class EnemyFactory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const lizard = new Enemy(3, 1)
    lizard.init(
      scene,
      planetGravity,
      CharacterConfigFactory.getLizardConfig(spawnX, spawnY)
    )

    return lizard
  }
}
