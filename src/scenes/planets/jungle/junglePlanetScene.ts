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
    this.sound.removeAll()
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
    this.add.image(0, 0, 'background_jungle_1').setOrigin(0).setScrollFactor(1)
  }

  protected initializeFloor(): void {
    this.floor = this.physics.add.staticSprite(960, 608, 'floor_jungle')
  }

  protected initializePlatforms(): void {
    this.platformGroup = PlatformGroupFactory.createJunglePlatformGroup(this)
  }

  protected initializeSounds(): void {
    super.initializeSounds()

    if (!this.soundHelper) return

    this.soundHelper.setPlanetTheme('jungle_theme')
  }
}
