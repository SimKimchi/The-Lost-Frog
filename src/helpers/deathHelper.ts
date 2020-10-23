import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import PlanetScene from '../scenes/planets/planetScene'

export default class DeathHelper {
  private scene: PlanetScene
  constructor(scene: PlanetScene) {
    this.scene = scene

    this.scene.events.on('enemyKilled', this.onEnemyDeath, this)
  }

  private onEnemyDeath(): void {
    if (
      !this.scene.currentEnemies.every(
        (x) => x.getContainer().body === undefined
      )
    )
      return

    if (this.scene.currentEnemyWave === this.scene.enemyWaves.length - 1) {
      this.scene.completeLevel()
    } else {
      this.scene.completeWave()
    }
  }

  public playerDeath(): void {
    this.scene.cutSceneGoingOn = true
    this.scene.physics.pause()
    this.scene.soundHelper?.pauseMusic()
    this.scene.soundHelper?.setMusic('gameover_theme', 0.5, false)
    this.scene.soundHelper?.playMusic()
    this.displayGameOver()
    this.allowRetry()
  }

  private displayGameOver(): void {
    const gameOverText = this.scene.add
      .text(0, 0, 'Game over!', {
        font: '50px PlayMeGames',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 4)
    gameOverText.setPosition(
      this.scene.game.scale.width / 2 - gameOverText.width / 2,
      this.scene.game.scale.height / 2 - gameOverText.height / 2
    )
    const retryText = this.scene.add
      .text(0, 0, 'Click or press Enter to try again', {
        font: '18px PlayMeGames',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
    retryText.setPosition(
      this.scene.game.scale.width / 2 - retryText.width / 2,
      this.scene.game.scale.height / 2 - retryText.height / 2 + 50
    )
  }

  private allowRetry(): void {
    this.scene.input.on(
      'pointerdown',
      function (this: PlanetScene) {
        this.soundHelper?.pauseMusic()
        this.scene.restart()
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this.scene
    )
    this.scene.input.keyboard.on(
      'keydown',
      function (this: PlanetScene) {
        if (!this.inputHelper?.enterIsDown()) return

        this.soundHelper?.pauseMusic()
        this.scene.restart()
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this.scene
    )
  }
}
