import { EnemySpawn, EnemyType } from '../util'

export default abstract class PlanetWaveConfigProvider {
  public static getJungleWaveConfig(): EnemySpawn[][] {
    return [
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
  }

  public static getIceWaveConfig(): EnemySpawn[][] {
    return [
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
  }

  public static getVolcanoWaveConfig(): EnemySpawn[][] {
    return [
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
  }
}
