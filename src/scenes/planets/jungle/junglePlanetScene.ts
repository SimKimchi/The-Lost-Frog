import 'phaser'
import { EnemySpawn } from '../../../util'
import PlanetScene from '../planetScene'
import PlatformGroupFactory from '../../../factories/platformGroupFactory'
import PlanetWaveConfigProvider from '../../../providers/planetWaveConfigProvider'

export default class JunglePlanetScene extends PlanetScene {
  public enemyWaves: EnemySpawn[][] = PlanetWaveConfigProvider.getJungleWaveConfig()

  constructor() {
    super('JunglePlanetScene', 1, 1, 0.65)
  }

  public goToNextPlanet(): void {
    this.soundHelper?.stopAllSounds()
    this.game.scene.switch('JunglePlanetScene', 'IcePlanetTransitionScene')
  }

  protected initializeBackground(): void {
    this.add.image(0, 0, 'background_jungle_5').setOrigin(0).setScrollFactor(0)
    this.add
      .image(0, 0, 'background_jungle_4')
      .setOrigin(0)
      .setScrollFactor(0.25)
    this.add
      .image(0, 0, 'background_jungle_3')
      .setOrigin(0)
      .setScrollFactor(0.5)
    this.add
      .image(0, 0, 'background_jungle_2')
      .setOrigin(0)
      .setScrollFactor(0.75)
    this.add
      .image(0, 0, 'background_jungle_1')
      .setOrigin(0)
      .setScrollFactor(0.9)
    this.add
      .image(0, 0, 'foreground_jungle_1')
      .setOrigin(0)
      .setScrollFactor(1.25, 1)
      .setDepth(2)
      .setAlpha(0.75)
  }

  protected initializePlatforms(): void {
    this.platformGroup = PlatformGroupFactory.createJunglePlatformGroup(this)
  }

  protected initializeSounds(): void {
    super.initializeSounds()

    if (!this.soundHelper) return

    this.soundHelper.setMusic('jungle_theme', 0.75)
  }
}
