import { EnemySpawn, EnemyType } from '../util'

export default abstract class PlanetWaveConfigProvider {
  public static getJungleWaveConfig(): EnemySpawn[][] {
    return [
      // Jungle Level 4
      [
        { type: EnemyType.Lizard, spawnTileX: 2, spawnTileY: 8 }
        // { type: EnemyType.Lizard, spawnTileX: 6, spawnTileY: 8 },
        // { type: EnemyType.Lizard, spawnTileX: 11, spawnTileY: 2 },
        // { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 2 },
        // { type: EnemyType.Lizard, spawnTileX: 27, spawnTileY: 8 },
      ],
      // Jungle Level 1
      // [
      // { type: EnemyType.Fox, spawnTileX: 5, spawnTileY: 7 },
      // { type: EnemyType.Owl, spawnTileX: 9, spawnTileY: 6 },
      // { type: EnemyType.Lizard, spawnTileX: 7, spawnTileY: 2 },
      // { type: EnemyType.Fox, spawnTileX: 11, spawnTileY: 4 },
      // { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
      // { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
      // { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
      //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      // ],
      // // Jungle Level 2
      // [
      //   { type: EnemyType.Lizard, spawnTileX: 5, spawnTileY: 7 },
      //   { type: EnemyType.Lizard, spawnTileX: 7, spawnTileY: 2 },
      //   { type: EnemyType.Lizard, spawnTileX: 11, spawnTileY: 4 },
      //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
      //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
      //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
      //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      // ],
      // // Jungle Level 3
      // [{ type: EnemyType.Lizard, spawnTileX: 5, spawnTileY: 7 }]
    ]
  }

  public static getIceWaveConfig(): EnemySpawn[][] {
    return [
      [
        { type: EnemyType.Owl, spawnTileX: 3, spawnTileY: 0 },
        // { type: EnemyType.Lizard, spawnTileX: 11, spawnTileY: 6 },
        // { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 6 },
        // { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 0 },
        // { type: EnemyType.Fox, spawnTileX: 14, spawnTileY: 1 },
        // { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 0 },
        // { type: EnemyType.Lizard, spawnTileX: 24, spawnTileY: 1 },
        // { type: EnemyType.Lizard, spawnTileX: 26, spawnTileY: 8 },
        // { type: EnemyType.Fox, spawnTileX: 15, spawnTileY: 8 },
        // { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 6 },
      ],
      // [
      //   { type: EnemyType.Owl, spawnTileX: 24, spawnTileY: 5 },
      //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
      //   { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 4 },
      //   { type: EnemyType.Owl, spawnTileX: 15, spawnTileY: 1 },
      //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
      //   { type: EnemyType.Lizard, spawnTileX: 20, spawnTileY: 2 },
      //   { type: EnemyType.Owl, spawnTileX: 28, spawnTileY: 3 }
      // ]
    ]
  }

  public static getVolcanoWaveConfig(): EnemySpawn[][] {
    return [
      [
        { type: EnemyType.Lizard, spawnTileX: 9, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 17, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 25, spawnTileY: 8 },
        { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 8 },
        { type: EnemyType.Owl, spawnTileX: 21, spawnTileY: 7 },
        { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 5 },
        { type: EnemyType.Lizard, spawnTileX: 12, spawnTileY: 5 },
        { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 5 },
        { type: EnemyType.Fox, spawnTileX: 8, spawnTileY: 2 },
        { type: EnemyType.Fox, spawnTileX: 16, spawnTileY: 2 },
        { type: EnemyType.Fox, spawnTileX: 24, spawnTileY: 2 },
      ],
      // [
      //   { type: EnemyType.Owl, spawnTileX: 24, spawnTileY: 5 },
      //   { type: EnemyType.Lizard, spawnTileX: 8, spawnTileY: 7 },
      //   { type: EnemyType.Owl, spawnTileX: 9, spawnTileY: 4 },
      //   { type: EnemyType.Lizard, spawnTileX: 15, spawnTileY: 1 },
      //   { type: EnemyType.Lizard, spawnTileX: 18, spawnTileY: 6 },
      //   { type: EnemyType.Owl, spawnTileX: 20, spawnTileY: 2 },
      //   { type: EnemyType.Lizard, spawnTileX: 28, spawnTileY: 3 }
      // ]
    ]
  }
}
