import { PlatformConfig } from '../util'

export default abstract class PlatformConfigProvider {
  public static getJungleH1Config(): PlatformConfig {
    return {
      width: 64,
      height: 32,
      spriteKey: 'platform_h1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false
    }
  }

  public static getJungleV1Config(): PlatformConfig {
    return {
      width: 32,
      height: 64,
      spriteKey: 'platform_v1',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: true,
      checkRightCollision: true
    }
  }

  public static getJungleV2Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_v2',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false
    }
  }

  public static getJungleV3Config(): PlatformConfig {
    return {
      width: 32,
      height: 32,
      spriteKey: 'platform_v3',
      checkUpCollision: true,
      checkDownCollision: false,
      checkLeftCollision: false,
      checkRightCollision: false
    }
  }
}
