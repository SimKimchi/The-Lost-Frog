import Enemy from '../gameObjects/enemy'
import CharacterConfigFatory from './characterConfigFactory'

export default abstract class EnemyFatory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number
  ): Enemy {
    const lizard = new Enemy()
    lizard.initializeSprite(
      scene,
      planetGravity,
      CharacterConfigFatory.getLizardConfig()
    )

    return lizard
  }
}
