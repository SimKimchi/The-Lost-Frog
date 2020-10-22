import { PlatformConfig } from '../util'

export default abstract class PlatformConfigProvider {
  public static getJungleH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h1',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getJungleH2Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h2',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getJungleH3Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h3',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getJungleH4Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h4',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getJungleV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_jungle_v1',
      clingSides: true
    }
  }

  public static getJungleBranchH1Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_jungle_branch_h1',
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      letEnemiesFall: true
    }
  }

  public static getJungleBranchH2Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_jungle_branch_h2',
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      letEnemiesFall: true
    }
  }

  public static getJungleF1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_jungle_1',
      clingSides: true
    }
  }

  public static getJungleF2Config(): PlatformConfig {
    return {
      width: 64,
      height: 64,
      spriteKey: 'floor_jungle_2',
      clingSides: true
    }
  }

  public static getJungleF3Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_jungle_3',
      clingSides: true
    }
  }

  public static getJungleSpikesConfig(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'spikes_jungle',
      damageUp: true,
      clingUnder: true,
      clingSides: true
    }
  }

  public static getIceH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_ice_h1',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getIceV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_ice_v1',
      clingSides: true
    }
  }

  public static getIceF1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_ice_1',
      clingSides: true
    }
  }

  public static getIceF2Config(): PlatformConfig {
    return {
      width: 64,
      height: 64,
      spriteKey: 'floor_ice_2',
      clingSides: true
    }
  }

  public static getIceF3Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_ice_3',
      clingSides: true
    }
  }

  public static getIceSpikesConfig(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'spikes_ice',
      damageUp: true
    }
  }

  public static getVolcanoH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h1',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getVolcanoH2Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h2',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getVolcanoH3Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h3',
      checkLeftCollision: false,
      checkRightCollision: false,
      clingUnder: true
    }
  }

  public static getVolcanoV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_volcano_v1',
      clingSides: true
    }
  }

  public static getVolcanoV2Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_volcano_v2',
      clingSides: true
    }
  }

  public static getVolcanoV3Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_volcano_v3',
      clingSides: true
    }
  }

  public static getVolcanoF1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_volcano_1',
      clingSides: true
    }
  }

  public static getVolcanoF2Config(): PlatformConfig {
    return {
      width: 64,
      height: 64,
      spriteKey: 'floor_volcano_2',
      clingSides: true
    }
  }

  public static getVolcanoF3Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'floor_volcano_3',
      clingSides: true
    }
  }
}
