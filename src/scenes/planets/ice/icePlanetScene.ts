import 'phaser'
import {
  EnemySpawn,
  ItemSpawn,
  LevelResultClockMillisecondsMapping
} from '../../../util'
import PlanetScene from '../planetScene'
import PlatformGroupFactory from '../../../factories/platformGroupFactory'
import PlanetWaveConfigProvider from '../../../providers/planetWaveConfigProvider'
import ItemConfigProvider from '../../../providers/itemConfigProvider'

export default class IcePlanetScene extends PlanetScene {
  public enemyWaves: EnemySpawn[][] = PlanetWaveConfigProvider.getIceWaveConfig()
  public itemWaves: ItemSpawn[][] = ItemConfigProvider.getIceItemConfig()
  public levelResultClockMillisecondsMapping: LevelResultClockMillisecondsMapping = {
    S: { maxMs: 100000, appreciation: 'Gaming Warlord' },
    A: { maxMs: 125000, appreciation: 'Epic' },
    B: { maxMs: 150000, appreciation: 'Great' },
    C: { maxMs: 175000, appreciation: 'Good' },
    D: { maxMs: 200000, appreciation: 'Okay' },
    E: { maxMs: 225000, appreciation: 'Oof' }
  }

  constructor() {
    super('IcePlanetScene', 1, 1, 250)
  }

  public goToNextPlanet(): void {
    this.soundHelper?.stopAllSounds()
    this.game.scene.switch('IcePlanetScene', 'VolcanoPlanetTransitionScene')
  }

  protected initializeBackground(): void {
    this.add.image(0, 0, 'background_ice_5').setOrigin(0).setScrollFactor(0)
    this.add.image(0, 0, 'background_ice_4').setOrigin(0).setScrollFactor(0.25)
    this.add.image(0, 0, 'background_ice_3').setOrigin(0).setScrollFactor(0.5)
    this.add.image(0, 0, 'background_ice_2').setOrigin(0).setScrollFactor(0.75)
    this.add.image(0, 0, 'background_ice_1').setOrigin(0).setScrollFactor(0.9)
  }

  protected spawnPlatforms(): void {
    this.currentPlatformLayout = PlatformGroupFactory.createIcePlatformGroups(
      this
    )
  }

  protected initializeSounds(): void {
    super.initializeSounds()

    if (!this.soundHelper) return

    this.soundHelper.setMusic('ice_theme', 0.75)
  }
}
