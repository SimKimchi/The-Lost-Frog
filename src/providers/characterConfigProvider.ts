import { CharacterConfig } from '../util'

export default abstract class CharacterConfigProvider {
  public static getPlayerConfig(): CharacterConfig {
    return {
      spawnX: 100,
      spawnY: 450,
      spriteKey: 'dude',
      collideWorldBounds: true,
      animations: [
        {
          key: 'frog_left',
          assetKey: 'dude',
          frameStart: 0,
          frameEnd: 3,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'frog_idle_right',
          assetKey: 'dude',
          frame: 4,
          frameRate: 20
        },
        {
          key: 'frog_right',
          assetKey: 'dude',
          frameStart: 5,
          frameEnd: 8,
          frameRate: 10,
          repeat: -1
        }
      ],
      containerSizeX: 32,
      containerSizeY: 48,
      spriteOffsetX: 0,
      spriteOffsetY: 0
    }
  }

  public static getLizardConfig(
    spawnX: number,
    spawnY: number
  ): CharacterConfig {
    return {
      spawnX,
      spawnY,
      spriteKey: 'enemy_lizard',
      collideWorldBounds: true,
      animations: [
        {
          key: 'lizard_left',
          assetKey: 'enemy_lizard',
          frameStart: 0,
          frameEnd: 4,
          frameRate: 6,
          repeat: -1
        },
        {
          key: 'lizard_idle',
          assetKey: 'enemy_lizard',
          frame: 1,
          frameRate: 20
        },
        {
          key: 'lizard_right',
          assetKey: 'enemy_lizard',
          frameStart: 0,
          frameEnd: 4,
          frameRate: 6,
          repeat: -1
        }
      ],
      containerSizeX: 32,
      containerSizeY: 16,
      spriteOffsetX: 0,
      spriteOffsetY: 0
    }
  }
}
