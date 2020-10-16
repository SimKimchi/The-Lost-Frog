import 'phaser'
import { EnemySpawn, EnemyType } from '../../../util'
import PlanetScene from '../planetScene'
import PlatformGroupFactory from '../../../factories/platformGroupFactory'

export default class IcePlanetScene extends PlanetScene {
  // TODO: Tasser ça de d'là
  protected enemyWaves: EnemySpawn[][] = [
    [
      { type: EnemyType.Lizard, spawnX: 100, spawnY: 100 },
      { type: EnemyType.Lizard, spawnX: 300, spawnY: 200 },
      { type: EnemyType.Lizard, spawnX: 500, spawnY: 300 },
      { type: EnemyType.Lizard, spawnX: 900, spawnY: 400 },
      { type: EnemyType.Lizard, spawnX: 1300, spawnY: 500 },
      { type: EnemyType.Lizard, spawnX: 1600, spawnY: 600 },
      { type: EnemyType.Lizard, spawnX: 1800, spawnY: 600 }
    ],
    [
      { type: EnemyType.Lizard, spawnX: 100, spawnY: 100 },
      { type: EnemyType.Lizard, spawnX: 300, spawnY: 200 },
      { type: EnemyType.Lizard, spawnX: 500, spawnY: 300 },
      { type: EnemyType.Lizard, spawnX: 900, spawnY: 400 },
      { type: EnemyType.Lizard, spawnX: 1300, spawnY: 500 },
      { type: EnemyType.Lizard, spawnX: 1600, spawnY: 600 },
      { type: EnemyType.Lizard, spawnX: 1800, spawnY: 600 }
    ],
    [
      { type: EnemyType.Lizard, spawnX: 100, spawnY: 100 },
      { type: EnemyType.Lizard, spawnX: 300, spawnY: 200 },
      { type: EnemyType.Lizard, spawnX: 500, spawnY: 300 },
      { type: EnemyType.Lizard, spawnX: 900, spawnY: 400 },
      { type: EnemyType.Lizard, spawnX: 1300, spawnY: 500 },
      { type: EnemyType.Lizard, spawnX: 1600, spawnY: 600 },
      { type: EnemyType.Lizard, spawnX: 1800, spawnY: 600 }
    ]
  ]

  constructor() {
    super('IcePlanetScene', 1, 1)
  }

  protected initializeBackground(): void {
    this.add.image(0, 0, 'background_ice_5').setOrigin(0).setScrollFactor(0)
    this.add.image(0, 0, 'background_ice_4').setOrigin(0).setScrollFactor(0.25)
    this.add.image(0, 0, 'background_ice_3').setOrigin(0).setScrollFactor(0.5)
    this.add.image(0, 0, 'background_ice_2').setOrigin(0).setScrollFactor(0.75)
    this.add.image(0, 0, 'background_ice_1').setOrigin(0).setScrollFactor(1)
  }

  protected initializePlatforms(): void {
    this.platformGroup = PlatformGroupFactory.createIcePlatformGroup(this)
  }

  protected initializeSounds(): void {
    super.initializeSounds()
    this.music = this.sound.add('iceTheme', {
      volume: 0.6,
      loop: true
    })

    this.music.play()
  }

  protected goToNextPlanet(): void {
    this.sound.removeAll()
    this.game.scene.switch('IcePlanetScene', 'VolcanoLoadingScene')
  }
}
