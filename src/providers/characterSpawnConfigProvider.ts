import { PlayerSpawn } from '../util'

export default abstract class CharacterSpawnConfigProvider {
  private static playerSpawns: PlayerSpawn[] = [
    {
      spawnTileX: 2,
      spawnTileY: 8,
      spawnOffsetX: 4,
      spawnOffsetY: 38
    }
  ]

  public static getPlayerSpawn(enemyWave: number): PlayerSpawn {
    return (
      CharacterSpawnConfigProvider.playerSpawns[enemyWave] ??
      CharacterSpawnConfigProvider.playerSpawns[
        enemyWave % CharacterSpawnConfigProvider.playerSpawns.length
      ]
    )
  }
}
