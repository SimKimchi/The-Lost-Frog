import { CharacterConfig } from '../util'

export default abstract class CharacterConfigProvider {
  public static getPlayerConfig(): CharacterConfig {
    return {
      spawnX: 128,
      spawnY: 550,
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
        },
        {
          key: 'frog_jump_left',
          assetKey: 'frog_jump_left_anim',
          frameStart: 0,
          frameEnd: 8,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'frog_jump_right',
          assetKey: 'frog_jump_right_anim',
          frameStart: 0,
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
          key: 'lizard_right',
          assetKey: 'enemy_lizard_right',
          frameStart: 0,
          frameEnd: 4,
          frameRate: 6,
          repeat: -1
        },
        {
          key: 'lizard_hurt_left',
          assetKey: 'enemy_lizard_hurt_left',
          frameStart: 0,
          frameEnd: 5,
          frameRate: 30,
          repeat: -1
        },
        {
          key: 'lizard_hurt_right',
          assetKey: 'enemy_lizard_hurt_right',
          frameStart: 0,
          frameEnd: 5,
          frameRate: 30,
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
