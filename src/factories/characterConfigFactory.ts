import { CharacterConfig } from '../util'

export default abstract class CharacterConfigFatory {
  public static getPlayerConfig(): CharacterConfig {
    return {
      spawnX: 100,
      spawnY: 450,
      spriteKey: 'dude',
      collideWorldBounds: true,
      animations: [
        {
          key: 'left',
          frameStart: 0,
          frameEnd: 3,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'idle',
          frame: 4,
          frameRate: 20
        },
        {
          key: 'right',
          frameStart: 5,
          frameEnd: 8,
          frameRate: 10,
          repeat: -1
        }
      ]
    }
  }

  public static getLizardConfig(
    spawnX: number,
    spawnY: number
  ): CharacterConfig {
    return {
      spawnX,
      spawnY,
      spriteKey: 'dude',
      collideWorldBounds: true,
      animations: [
        {
          key: 'left',
          frameStart: 0,
          frameEnd: 3,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'idle',
          frame: 4,
          frameRate: 20
        },
        {
          key: 'right',
          frameStart: 5,
          frameEnd: 8,
          frameRate: 10,
          repeat: -1
        }
      ]
    }
  }
}
