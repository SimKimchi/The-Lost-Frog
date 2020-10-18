import 'phaser'
import { EnemySpawn } from '../../../util'
import PlanetScene from '../planetScene'
import PlatformGroupFactory from '../../../factories/platformGroupFactory'
import PlanetWaveConfigProvider from '../../../providers/planetWaveConfigProvider'

export default class VolcanoPlanetScene extends PlanetScene {
  public enemyWaves: EnemySpawn[][] = PlanetWaveConfigProvider.getVolcanoWaveConfig()

  constructor() {
    super('VolcanoPlanetScene', 1, 1, 0.3)
  }

  public goToNextPlanet(): void {
    alert('Thanks for playing our game!')
  }

  protected initializeBackground(): void {
    this.add.image(0, 0, 'background_volcano_5').setOrigin(0).setScrollFactor(0)
    this.add
      .image(0, 0, 'background_volcano_4')
      .setOrigin(0)
      .setScrollFactor(0.25)
    this.add
      .image(0, 0, 'background_volcano_3')
      .setOrigin(0)
      .setScrollFactor(0.5)
    this.add
      .image(0, 0, 'background_volcano_2')
      .setOrigin(0)
      .setScrollFactor(0.75)
    this.add.image(0, 0, 'background_volcano_1').setOrigin(0).setScrollFactor(1)
  }

  protected initializeFloor(): void {
    this.floor = this.physics.add.staticSprite(960, 610, 'floor_volcano')
  }

  protected initializePlatforms(): void {
    this.platformGroup = PlatformGroupFactory.createVolcanoPlatformGroup(this)
  }

  protected initializeSounds(): void {
    super.initializeSounds()

    if (!this.soundHelper) return

    this.soundHelper.setPlanetTheme('volcanoTheme')
  }
}
