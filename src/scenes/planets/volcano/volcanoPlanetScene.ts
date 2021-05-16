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

export default class VolcanoPlanetScene extends PlanetScene {
  public enemyWaves: EnemySpawn[][] = PlanetWaveConfigProvider.getVolcanoWaveConfig()
  public itemWaves: ItemSpawn[][] = ItemConfigProvider.getVolcanoItemConfig()
  public levelResultClockMillisecondsMapping: LevelResultClockMillisecondsMapping = {
    S: { maxMs: 100000, appreciation: 'Gaming Warlord' },
    A: { maxMs: 125000, appreciation: 'Epic' },
    B: { maxMs: 150000, appreciation: 'Great' },
    C: { maxMs: 175000, appreciation: 'Good' },
    D: { maxMs: 200000, appreciation: 'Okay' },
    E: { maxMs: 225000, appreciation: 'Oof' }
  }

  constructor() {
    super('VolcanoPlanetScene', 1, 1, 1300)
  }

  public goToNextPlanet(): void {
    this.soundHelper?.stopAllSounds()
    this.game.scene.switch('IcePlanetScene', 'EndingScene')
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
    this.add
      .image(0, 0, 'background_volcano_1')
      .setOrigin(0)
      .setScrollFactor(0.9)
    this.add
      .image(0, 0, 'foreground_volcano_1')
      .setOrigin(0)
      .setScrollFactor(1.25, 1)
      .setDepth(2)
      .setDisplaySize(2360, 640)
      .setAlpha(0.75)
  }

  protected spawnPlatforms(): void {
    this.currentPlatformLayout = PlatformGroupFactory.createVolcanoPlatformGroups(
      this
    )
  }

  protected initializeSounds(): void {
    super.initializeSounds()

    if (!this.soundHelper) return

    this.soundHelper.setMusic('volcano_theme', 0.75)
  }
}
