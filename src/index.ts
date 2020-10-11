import 'phaser'
import JunglePlanetScene from './scenes/jungle/junglePlanetScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#66a166',
  width: 960,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 },
      debug: false
    }
  },
  parent: 'game-container',
  scene: JunglePlanetScene
}

export class TheLostFrogGame extends Phaser.Game {
  private highScore: number

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)

    this.highScore = 0
  }

  public increaseScore(score: number): void {
    this.highScore += score
  }

  public displayScore(): string {
    return `Highscore: ${this.highScore}`
  }
}

new TheLostFrogGame(config)