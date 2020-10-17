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
          key: 'frog_idle_left',
          assetKey: 'frog_idle_anim',
          frameStart: 6,
          frameEnd: 11,
          frameRate: 8
        },
        {
          key: 'frog_idle_right',
          assetKey: 'frog_idle_anim',
          frameStart: 0,
          frameEnd: 5,
          frameRate: 8
        },
        {
          key: 'frog_run_left',
          assetKey: 'dude',
          frameStart: 0,
          frameEnd: 3,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'frog_run_right',
          assetKey: 'dude',
          frameStart: 5,
          frameEnd: 8,
          frameRate: 10,
          repeat: -1
        }
      ],
      hitAreaWidth: 28,
      hitAreaHeight: 45,
      spriteOffsetX: 0,
      spriteOffsetY: -10
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
          assetKey: 'enemy_lizard_left',
          frameStart: 0,
          frameEnd: 4,
          frameRate: 6,
          repeat: -1
        },
        {
          key: 'lizard_idle',
          assetKey: 'enemy_lizard_left',
          frame: 1,
          frameRate: 20
        },
        {
          key: 'lizard_right',
          assetKey: 'enemy_lizard_right',
          frameStart: 0,
          frameEnd: 4,
          frameRate: 6,
          repeat: -1
        }
      ],
      hitAreaWidth: 48,
      hitAreaHeight: 24,
      spriteOffsetX: 0,
      spriteOffsetY: -2
    }
  }
}
