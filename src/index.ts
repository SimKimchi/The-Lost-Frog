import 'phaser'
import IcePlanetTransitionScene from './scenes/planetTransitions/ice/icePlanetTransitionScene'
import VolcanoPlanetTransitionScene from './scenes/planetTransitions/volcano/volcanoPlanetTransitionScene'
import IcePlanetScene from './scenes/planets/ice/icePlanetScene'
import JunglePlanetScene from './scenes/planets/jungle/junglePlanetScene'
import VolcanoPlanetScene from './scenes/planets/volcano/volcanoPlanetScene'
import LoadingScene from './scenes/loadingScene'
import MainMenuScene from './scenes/mainMenuScene'
import CreditsScene from './scenes/creditsScene'
import JunglePlanetTransitionScene from './scenes/planetTransitions/jungle/JunglePlanetTransitionScene'
import EndingScene from './scenes/endingScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1500 }
    }
  },
  scene: [
    LoadingScene,
    MainMenuScene,
    CreditsScene,
    JunglePlanetTransitionScene,
    JunglePlanetScene,
    IcePlanetTransitionScene,
    IcePlanetScene,
    VolcanoPlanetTransitionScene,
    VolcanoPlanetScene,
    EndingScene
  ]
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

  public resetScore(): void {
    this.highScore = 0
  }

  public displayScore(): string {
    return `Highscore: ${this.highScore}`
  }

  public displayFinalScore(): string {
    return `Final Score: ${this.highScore} !`
  }
}

new TheLostFrogGame(config)
