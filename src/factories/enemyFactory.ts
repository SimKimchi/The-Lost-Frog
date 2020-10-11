import Enemy from '../gameObjects/enemy'

export default abstract class EnemyFatory {
  public static createLizard(
    scene: Phaser.Scene,
    planetGravity: number
  ): Enemy {
    const lizard = new Enemy()
    lizard.initializeSprite(scene, planetGravity)

    return lizard
  }
}
