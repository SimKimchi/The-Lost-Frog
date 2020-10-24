import { EnemySpawn, EnemyType } from '../util'

export default abstract class PlanetWaveConfigProvider {
  public static getJungleWaveConfig(): EnemySpawn[][] {
    return [
      // Jungle Level 1
      [
        { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 2, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 10, spawnTileY: 0 },
        { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 7 },
        { type: EnemyType.Lizard, spawnTileX: 12, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 25, spawnTileY: 5 },
        { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 2 }
      ],
      // Jungle Level 2
      [
        { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 11, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 23, spawnTileY: 6 }
      ],
      // Jungle Level 3
      [
        { type: EnemyType.Owl, spawnTileX: 2, spawnTileY: 3 },
        { type: EnemyType.Owl, spawnTileX: 18, spawnTileY: 4 },
        { type: EnemyType.Lizard, spawnTileX: 17, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 23, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 26, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 20, spawnTileY: 0 },
        { type: EnemyType.Owl, spawnTileX: 9, spawnTileY: 0 },
        { type: EnemyType.Fox, spawnTileX: 2, spawnTileY: 1 }
      ]
    ]
  }

  public static getIceWaveConfig(): EnemySpawn[][] {
    return [
      // Ice Level 1
      [
        { type: EnemyType.Owl, spawnTileX: 3, spawnTileY: 2 },
        { type: EnemyType.Lizard, spawnTileX: 11, spawnTileY: 6 },
        { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 6 },
        { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 0 },
        { type: EnemyType.Fox, spawnTileX: 14, spawnTileY: 1 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 0 },
        { type: EnemyType.Lizard, spawnTileX: 24, spawnTileY: 1 },
        { type: EnemyType.Lizard, spawnTileX: 26, spawnTileY: 8 },
        { type: EnemyType.Fox, spawnTileX: 15, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 6 }
      ],
      // Ice Level 2
      [
        { type: EnemyType.Owl, spawnTileX: 1, spawnTileY: 4 },
        { type: EnemyType.Owl, spawnTileX: 10, spawnTileY: 7 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 22, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 26, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 18, spawnTileY: 1 }
      ],
      // Ice Level 3
      [
        { type: EnemyType.Owl, spawnTileX: 11, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 19, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 16, spawnTileY: 4 },
        { type: EnemyType.Owl, spawnTileX: 18, spawnTileY: 1 },
        { type: EnemyType.Owl, spawnTileX: 22, spawnTileY: 1 },
        { type: EnemyType.Owl, spawnTileX: 9, spawnTileY: 1 },
        { type: EnemyType.Owl, spawnTileX: 12, spawnTileY: 1 }
      ]
    ]
  }

  public static getVolcanoWaveConfig(): EnemySpawn[][] {
    return [
      // Volcano Level 1
      [
        { type: EnemyType.Fox, spawnTileX: 6, spawnTileY: 1 },
        { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        { type: EnemyType.Fox, spawnTileX: 11, spawnTileY: 4 },
        { type: EnemyType.Owl, spawnTileX: 19, spawnTileY: 1 },
        { type: EnemyType.Fox, spawnTileX: 20, spawnTileY: 5 },
        { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 8 },
        { type: EnemyType.Fox, spawnTileX: 25, spawnTileY: 1 }
      ],
      // Volcano Level 2
      [
        { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 17, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 25, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 21, spawnTileY: 7 },
        { type: EnemyType.Owl, spawnTileX: 7, spawnTileY: 4 },
        { type: EnemyType.Fox, spawnTileX: 8, spawnTileY: 2 },
        { type: EnemyType.Fox, spawnTileX: 16, spawnTileY: 2 },
        { type: EnemyType.Fox, spawnTileX: 24, spawnTileY: 2 }
      ],
      // Volcano Level 3
      [
        { type: EnemyType.Fox, spawnTileX: 8, spawnTileY: 5 },
        { type: EnemyType.Fox, spawnTileX: 2, spawnTileY: 3 },
        { type: EnemyType.Fox, spawnTileX: 8, spawnTileY: 2 },
        { type: EnemyType.Owl, spawnTileX: 14, spawnTileY: 2 },
        { type: EnemyType.Owl, spawnTileX: 16, spawnTileY: 5 },
        { type: EnemyType.Owl, spawnTileX: 18, spawnTileY: 7 },
        { type: EnemyType.Owl, spawnTileX: 23, spawnTileY: 2 },
        { type: EnemyType.Owl, spawnTileX: 18, spawnTileY: 7 },
        { type: EnemyType.Owl, spawnTileX: 24, spawnTileY: 7 },
        { type: EnemyType.Owl, spawnTileX: 27, spawnTileY: 5 }
      ]
    ]
  }
}
