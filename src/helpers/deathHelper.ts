import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import PlanetScene from '../scenes/planets/planetScene'

export default class DeathHelper {
  private scene: PlanetScene
  constructor(scene: PlanetScene) {
    this.scene = scene

    this.scene.events.on('enemyKilled', this.onEnemyDeath, this)
  }

  public setEnemies(enemies: Enemy[]): void {
    this.scene.enemies = enemies
  }

  private onEnemyDeath(): void {
    if (!this.scene.enemies.every((x) => x.getContainer().body === undefined))
      return

    if (this.scene.currentEnemyWave === this.scene.enemyWaves.length - 1) {
      this.scene.goToNextPlanet()
    } else {
      this.scene.startNextWave()
    }
  }

  public playerDeath(): void {
    this.scene.physics.pause()
    this.scene.soundHelper?.pauseMusic()

    this.displayGameOver()
    this.allowRetry()
  }

  private displayGameOver(): void {
    const gameOverText = this.scene.add
      .text(0, 0, 'Game over!', {
        font: '45px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
    gameOverText.setPosition(
      this.scene.game.scale.width / 2 - gameOverText.width / 2,
      this.scene.game.scale.height / 2 - gameOverText.height / 2
    )
    const retryText = this.scene.add
      .text(0, 0, 'Try again?', {
        font: '25px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
    retryText.setPosition(
      this.scene.game.scale.width / 2 - retryText.width / 2,
      this.scene.game.scale.height / 2 - retryText.height / 2 + 50
    )
  }

  private allowRetry(): void {
    this.scene.input.on(
      'pointerdown',
      function (this: PlanetScene) {
        this.scene.restart() // TODO tester this.restart
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this.scene
    )
    this.scene.input.keyboard.on(
      'keydown',
      function (this: PlanetScene) {
        this.scene.restart() // TODO tester this.restart
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this.scene
    )
  }
}
