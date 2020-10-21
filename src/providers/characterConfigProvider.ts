import { CharacterConfig } from '../util'

export default abstract class CharacterConfigProvider {
  public static getPlayerConfig(): CharacterConfig {
    return {
      spawnX: 132,
      spawnY: 550,
      spriteKey: 'frog',
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
          assetKey: 'frog_jump_left_anim',
          frameStart: 2,
          frameEnd: 5,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'frog_run_right',
          assetKey: 'frog_jump_right_anim',
          frameStart: 2,
          frameEnd: 5,
          frameRate: 10,
          repeat: -1
        },
        {
          key: 'frog_jump_ascend_left',
          assetKey: 'frog_jump_left_anim',
          frameStart: 1,
          frameEnd: 3,
          frameRate: 20
        },
        {
          key: 'frog_jump_ascend_right',
          assetKey: 'frog_jump_right_anim',
          frameStart: 1,
          frameEnd: 3,
          frameRate: 20
        },
        {
          key: 'frog_jump_descend_left',
          assetKey: 'frog_jump_left_anim',
          frameStart: 4,
          frameEnd: 5,
          frameRate: 10
        },
        {
          key: 'frog_jump_descend_right',
          assetKey: 'frog_jump_right_anim',
          frameStart: 4,
          frameEnd: 5,
          frameRate: 10
        },
        {
          key: 'frog_attack_right',
          assetKey: 'frog_attack',
          frameStart: 1,
          frameEnd: 3,
          frameRate: 13
        },
        {
          key: 'frog_attack_up',
          assetKey: 'frog_attack',
          frameStart: 6,
          frameEnd: 9,
          frameRate: 13
        },
        {
          key: 'frog_attack_left',
          assetKey: 'frog_attack',
          frameStart: 11,
          frameEnd: 13,
          frameRate: 13
        },
        {
          key: 'frog_attack_down',
          assetKey: 'frog_attack',
          frameStart: 18,
          frameEnd: 20,
          frameRate: 13
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

  public static getOwlConfig(spawnX: number, spawnY: number): CharacterConfig {
    return {
      spawnX,
      spawnY,
      spriteKey: 'enemy_owl',
      collideWorldBounds: true,
      animations: [
        {
          key: 'owl_idle_left',
          assetKey: 'enemy_owl_idle_left',
          frameStart: 0,
          frameEnd: 16,
          frameRate: 12,
          repeat: -1
        },
        {
          key: 'owl_idle_right',
          assetKey: 'enemy_owl_idle_right',
          frameStart: 0,
          frameEnd: 16,
          frameRate: 12,
          repeat: -1
        },
        {
          key: 'owl_fly_left',
          assetKey: 'enemy_owl_fly_left',
          frameStart: 0,
          frameEnd: 16,
          frameRate: 25,
          repeat: -1
        },
        {
          key: 'owl_fly_right',
          assetKey: 'enemy_owl_fly_right',
          frameStart: 0,
          frameEnd: 16,
          frameRate: 25,
          repeat: -1
        },
        {
          key: 'owl_hurt',
          assetKey: 'enemy_owl_hurt',
          frameStart: 0,
          frameEnd: 8,
          frameRate: 20,
          repeat: -1
        }
      ],
      hitAreaWidth: 64,
      hitAreaHeight: 64,
      spriteOffsetX: 0,
      spriteOffsetY: 0
    }
  }
}
