import Enemy from '../gameObjects/enemy'
import CharacterConfigFatory from './characterConfigFactory'

export default abstract class EnemyFatory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number,
    spawnX: number,
    spawnY: number
  ): Enemy {
    const lizard = new Enemy()
    lizard.init(
      scene,
      planetGravity,
      CharacterConfigFatory.getLizardConfig(spawnX, spawnY)
    )

    return lizard
  }
}
