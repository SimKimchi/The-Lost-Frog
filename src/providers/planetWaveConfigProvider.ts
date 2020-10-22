import { EnemySpawn, EnemyType } from '../util'

export default abstract class PlanetWaveConfigProvider {
  public static getJungleWaveConfig(): EnemySpawn[][] {
    return [
      [
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 7 }
        //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        //   { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
        // ],
        // [
        //   { type: EnemyType.Lizard, spawnTileX: 24, spawnTileY: 5 },
        //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        //   { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      ],
      [{ type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 5 }],
      [{ type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 5 }],
      [{ type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 5 }]
    ]
  }

  public static getIceWaveConfig(): EnemySpawn[][] {
    return [
      [
        { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 8, spawnTileY: 6 }
        //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        //   { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
        // ],
        // [
        //   { type: EnemyType.Lizard, spawnTileX: 24, spawnTileY: 5 },
        //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        //   { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      ]
    ]
  }

  public static getVolcanoWaveConfig(): EnemySpawn[][] {
    return [
      [
        { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      ],
      [
        { type: EnemyType.Lizard, spawnTileX: 24, spawnTileY: 5 },
        { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
        { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
        { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
        { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      ]
    ]
  }
}
