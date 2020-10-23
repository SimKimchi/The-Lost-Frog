import { ItemSpawn, ItemType } from '../util'

export default abstract class ItemConfigProvider {
  public static getJungleItemConfig(): ItemSpawn[][] {
    return [
      // Jungle Level 1
      [{ type: ItemType.Heal, spawnTileX: 18, spawnTileY: 8 }],
      // Jungle Level 2
      [
        { type: ItemType.Heal, spawnTileX: 26, spawnTileY: 6 },
        { type: ItemType.Heal, spawnTileX: 19, spawnTileY: 2 }
      ],
      // Jungle Level 3
      [
        { type: ItemType.Heal, spawnTileX: 28, spawnTileY: 2 },
        { type: ItemType.Heal, spawnTileX: 28, spawnTileY: 6 },
        { type: ItemType.Heal, spawnTileX: 1, spawnTileY: 3 },
        { type: ItemType.Heal, spawnTileX: 8, spawnTileY: 8 }
      ]
    ]
  }

  public static getIceItemConfig(): ItemSpawn[][] {
    return [
      // Ice Level 1
      [
        { type: ItemType.Heal, spawnTileX: 15, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 4, spawnTileY: 2 },
        { type: ItemType.Heal, spawnTileX: 11, spawnTileY: 4 }
      ],
      // Ice Level 2
      [
        { type: ItemType.Heal, spawnTileX: 8, spawnTileY: 0 },
        { type: ItemType.Heal, spawnTileX: 10, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 18, spawnTileY: 1 }
      ],
      // Ice Level 3
      [
        { type: ItemType.Heal, spawnTileX: 28, spawnTileY: 7 },
        { type: ItemType.Heal, spawnTileX: 26, spawnTileY: 2 },
        { type: ItemType.Heal, spawnTileX: 3, spawnTileY: 3 }
      ]
    ]
  }

  public static getVolcanoItemConfig(): ItemSpawn[][] {
    return [
      // Volcano Level 1
      [
        { type: ItemType.Heal, spawnTileX: 7, spawnTileY: 4 },
        { type: ItemType.Heal, spawnTileX: 15, spawnTileY: 4 },
        { type: ItemType.Heal, spawnTileX: 21, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 21, spawnTileY: 2 }
      ],
      // Volcano Level 2
      [
        { type: ItemType.Heal, spawnTileX: 21, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 14, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 23, spawnTileY: 1 }
      ],
      // Volcano Level 3
      [
        { type: ItemType.Heal, spawnTileX: 12, spawnTileY: 8 },
        { type: ItemType.Heal, spawnTileX: 18, spawnTileY: 3 },
        { type: ItemType.Heal, spawnTileX: 26, spawnTileY: 7 }
      ]
    ]
  }
}
