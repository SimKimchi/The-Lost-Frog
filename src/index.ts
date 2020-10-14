import 'phaser'
import IceLoadingScene from './scenes/loadingScenes/ice/iceLoadingScene'
import JungleLoadingScene from './scenes/loadingScenes/jungle/jungleLoadingScene'
import VolcanoLoadingScene from './scenes/loadingScenes/volcano/volcanoLoadingScene'
import IcePlanetScene from './scenes/planets/ice/icePlanetScene'
import JunglePlanetScene from './scenes/planets/jungle/junglePlanetScene'
import VolcanoPlanetScene from './scenes/planets/volcano/volcanoPlanetScene'
import { getRandomInt } from './util'

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
  parent: 'game-container'
  // TODO: Ceci sera la bonne manière d'insérer les scène et de démarrer la preimère.
  /*scene: [
    JungleLoadingScene,
    JunglePlanetScene,
    IceLoadingScene,
    IcePlanetScene,
    VolcanoLoadingScene,
    VolcanoPlanetScene
  ]*/
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
}

const game = new TheLostFrogGame(config)

// TODO: Enlever ça. C'est là juste pour tester les différentes planètes.
game.scene.add('JungleLoadingScene', JungleLoadingScene)
game.scene.add('JunglePlanetScene', JunglePlanetScene)
game.scene.add('IceLoadingScene', IceLoadingScene)
game.scene.add('IcePlanetScene', IcePlanetScene)
game.scene.add('VolcanoLoadingScene', VolcanoLoadingScene)
game.scene.add('VolcanoPlanetScene', VolcanoPlanetScene)

const possibleStartingScenes = [
  'JungleLoadingScene',
  'IceLoadingScene',
  'VolcanoLoadingScene'
]
game.scene.start(possibleStartingScenes[getRandomInt(3) - 1])
