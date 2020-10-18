import { PlatformConfig } from '../util'

export default abstract class PlatformConfigProvider {
  public static getJungleH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getJungleH2Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h2',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getJungleH3Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h3',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getJungleH4Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_jungle_h4',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getJungleV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_jungle_v1',
      checkUpCollision: true,
      checkDownCollision: true,
      checkLeftCollision: true,
      checkRightCollision: true,
      clingSides: true,
      clingUnder: false
    }
  }

  public static getJungleBranchH1Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_jungle_branch_h1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: false
    }
  }

  public static getJungleBranchH2Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_jungle_branch_h2',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: false
    }
  }

  public static getIceH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 0.1,
      spriteKey: 'platform_ice_h1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getIceV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_ice_v1',
      checkUpCollision: true,
      checkDownCollision: true,
      checkLeftCollision: true,
      checkRightCollision: true,
      clingSides: true,
      clingUnder: false
    }
  }

  public static getVolcanoH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getVolcanoH2Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h2',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }

  public static getVolcanoH3Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_volcano_h3',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false,
      clingSides: false,
      clingUnder: true
    }
  }
}
