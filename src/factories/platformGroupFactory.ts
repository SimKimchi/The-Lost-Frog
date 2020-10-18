import { gridHeight, gridWidth, Platform } from '../util'
import PlatformConfigProvider from '../providers/platformConfigProvider'

export default abstract class PlatformGroupFactory {
  public static createJunglePlatformGroup(
    scene: Phaser.Scene
  ): Phaser.Physics.Arcade.StaticGroup {
    const jungleH1Config = PlatformConfigProvider.getJungleH1Config()
    const jungleV1Config = PlatformConfigProvider.getJungleV1Config()
    const jungleV2Config = PlatformConfigProvider.getJungleV2Config()
    const jungleV3Config = PlatformConfigProvider.getJungleV3Config()
    const platformArray: Platform[] = [
      { x: 0, y: 9, config: jungleH1Config },
      { x: 1, y: 9, config: jungleH1Config },
      { x: 2, y: 9, config: jungleH1Config },
      { x: 4, y: 1, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 2, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 3, xOffSet: -16, config: jungleV2Config },
      { x: 4, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 48, yOffSet: 16, config: jungleV3Config },
      { x: 4, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 9, config: jungleH1Config },
      { x: 5, y: 7, config: jungleH1Config },
      { x: 6, y: 2, config: jungleH1Config },
      { x: 6, y: 7, config: jungleH1Config },
      { x: 6, y: 9, config: jungleH1Config },
      { x: 7, y: 2, config: jungleH1Config },
      { x: 8, y: 2, config: jungleH1Config },
      { x: 8, y: 8, config: jungleH1Config },
      { x: 9, y: 5, config: jungleH1Config },
      { x: 9, y: 8, config: jungleH1Config },
      { x: 10, y: 5, config: jungleH1Config },
      { x: 11, y: 5, config: jungleH1Config },
      { x: 11, y: 9, config: jungleH1Config },
      { x: 12, y: 9, config: jungleH1Config },
      { x: 13, y: 9, config: jungleH1Config },
      { x: 14, y: 2, config: jungleH1Config },
      { x: 14, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 9, config: jungleH1Config },
      { x: 15, y: 2, config: jungleH1Config },
      { x: 15, y: 9, config: jungleH1Config },
      { x: 16, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 8, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 9, xOffSet: 16, config: jungleV1Config },
      { x: 18, y: 7, config: jungleH1Config },
      { x: 19, y: 3, config: jungleH1Config },
      { x: 19, y: 7, config: jungleH1Config },
      { x: 20, y: 3, config: jungleH1Config },
      { x: 20, y: 8, config: jungleH1Config },
      { x: 21, y: 3, config: jungleH1Config },
      { x: 21, y: 8, config: jungleH1Config },
      { x: 22, y: 7, config: jungleH1Config },
      { x: 24, y: 2, config: jungleH1Config },
      { x: 24, y: 6, config: jungleH1Config },
      { x: 25, y: 2, config: jungleH1Config },
      { x: 25, y: 6, config: jungleH1Config },
      { x: 26, y: 2, config: jungleH1Config },
      { x: 26, y: 5, config: jungleH1Config },
      { x: 27, y: 2, config: jungleH1Config },
      { x: 28, y: 4, config: jungleH1Config },
      { x: 29, y: 4, config: jungleH1Config }
    ]

    const platformGroup = scene.physics.add.staticGroup()

    for (const platform of platformArray) {
      const sprite = (platformGroup.create(
        platform.x * gridWidth +
          platform.config.width / 2 +
          (platform.xOffSet ?? 0),
        platform.y * gridHeight +
          platform.config.height / 2 +
          (platform.yOffSet ?? 0),
        platform.config.spriteKey
      ) as Phaser.Physics.Arcade.Sprite).setScale(platform.scale ?? 1)

      sprite.body.checkCollision.down = platform.config.checkDownCollision
      sprite.body.checkCollision.up = platform.config.checkUpCollision
      sprite.body.checkCollision.left = platform.config.checkLeftCollision
      sprite.body.checkCollision.right = platform.config.checkRightCollision
    }

    return platformGroup
  }

  public static createIcePlatformGroup(
    scene: Phaser.Scene
  ): Phaser.Physics.Arcade.StaticGroup {
    const jungleH1Config = PlatformConfigProvider.getJungleH1Config()
    const jungleV1Config = PlatformConfigProvider.getJungleV1Config()
    const jungleV2Config = PlatformConfigProvider.getJungleV2Config()
    const jungleV3Config = PlatformConfigProvider.getJungleV3Config()
    const platformArray: Platform[] = [
      { x: 0, y: 9, config: jungleH1Config },
      { x: 1, y: 9, config: jungleH1Config },
      { x: 2, y: 9, config: jungleH1Config },
      { x: 4, y: 1, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 2, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 3, xOffSet: -16, config: jungleV2Config },
      { x: 4, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 48, yOffSet: 16, config: jungleV3Config },
      { x: 4, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 9, config: jungleH1Config },
      { x: 5, y: 7, config: jungleH1Config },
      { x: 6, y: 2, config: jungleH1Config },
      { x: 6, y: 7, config: jungleH1Config },
      { x: 6, y: 9, config: jungleH1Config },
      { x: 7, y: 2, config: jungleH1Config },
      { x: 8, y: 2, config: jungleH1Config },
      { x: 8, y: 8, config: jungleH1Config },
      { x: 9, y: 5, config: jungleH1Config },
      { x: 9, y: 8, config: jungleH1Config },
      { x: 10, y: 5, config: jungleH1Config },
      { x: 11, y: 5, config: jungleH1Config },
      { x: 11, y: 9, config: jungleH1Config },
      { x: 12, y: 9, config: jungleH1Config },
      { x: 13, y: 9, config: jungleH1Config },
      { x: 14, y: 2, config: jungleH1Config },
      { x: 14, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 9, config: jungleH1Config },
      { x: 15, y: 2, config: jungleH1Config },
      { x: 15, y: 9, config: jungleH1Config },
      { x: 16, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 8, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 9, xOffSet: 16, config: jungleV1Config },
      { x: 18, y: 7, config: jungleH1Config },
      { x: 19, y: 3, config: jungleH1Config },
      { x: 19, y: 7, config: jungleH1Config },
      { x: 20, y: 3, config: jungleH1Config },
      { x: 20, y: 8, config: jungleH1Config },
      { x: 21, y: 3, config: jungleH1Config },
      { x: 21, y: 8, config: jungleH1Config },
      { x: 22, y: 7, config: jungleH1Config },
      { x: 24, y: 2, config: jungleH1Config },
      { x: 24, y: 6, config: jungleH1Config },
      { x: 25, y: 2, config: jungleH1Config },
      { x: 25, y: 6, config: jungleH1Config },
      { x: 26, y: 2, config: jungleH1Config },
      { x: 26, y: 5, config: jungleH1Config },
      { x: 27, y: 2, config: jungleH1Config },
      { x: 28, y: 4, config: jungleH1Config },
      { x: 29, y: 4, config: jungleH1Config }
    ]

    const platformGroup = scene.physics.add.staticGroup()

    for (const platform of platformArray) {
      const sprite = (platformGroup.create(
        platform.x * gridWidth +
          platform.config.width / 2 +
          (platform.xOffSet ?? 0),
        platform.y * gridHeight +
          platform.config.height / 2 +
          (platform.yOffSet ?? 0),
        platform.config.spriteKey
      ) as Phaser.Physics.Arcade.Sprite).setScale(platform.scale ?? 1)

      sprite.body.checkCollision.down = platform.config.checkDownCollision
      sprite.body.checkCollision.up = platform.config.checkUpCollision
      sprite.body.checkCollision.left = platform.config.checkLeftCollision
      sprite.body.checkCollision.right = platform.config.checkRightCollision
    }

    return platformGroup
  }

  public static createVolcanoPlatformGroup(
    scene: Phaser.Scene
  ): Phaser.Physics.Arcade.StaticGroup {
    const jungleH1Config = PlatformConfigProvider.getJungleH1Config()
    const jungleV1Config = PlatformConfigProvider.getJungleV1Config()
    const jungleV2Config = PlatformConfigProvider.getJungleV2Config()
    const jungleV3Config = PlatformConfigProvider.getJungleV3Config()
    const platformArray: Platform[] = [
      { x: 0, y: 9, config: jungleH1Config },
      { x: 1, y: 9, config: jungleH1Config },
      { x: 2, y: 9, config: jungleH1Config },
      { x: 4, y: 1, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 2, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 3, xOffSet: -16, config: jungleV2Config },
      { x: 4, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 4, xOffSet: 48, yOffSet: 16, config: jungleV3Config },
      { x: 4, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 4, y: 9, config: jungleH1Config },
      { x: 5, y: 7, config: jungleH1Config },
      { x: 6, y: 2, config: jungleH1Config },
      { x: 6, y: 7, config: jungleH1Config },
      { x: 6, y: 9, config: jungleH1Config },
      { x: 7, y: 2, config: jungleH1Config },
      { x: 8, y: 2, config: jungleH1Config },
      { x: 8, y: 8, config: jungleH1Config },
      { x: 9, y: 5, config: jungleH1Config },
      { x: 9, y: 8, config: jungleH1Config },
      { x: 10, y: 5, config: jungleH1Config },
      { x: 11, y: 5, config: jungleH1Config },
      { x: 11, y: 9, config: jungleH1Config },
      { x: 12, y: 9, config: jungleH1Config },
      { x: 13, y: 9, config: jungleH1Config },
      { x: 14, y: 2, config: jungleH1Config },
      { x: 14, y: 3, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 14, y: 9, config: jungleH1Config },
      { x: 15, y: 2, config: jungleH1Config },
      { x: 15, y: 9, config: jungleH1Config },
      { x: 16, y: 4, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 5, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 6, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 7, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 8, xOffSet: 16, config: jungleV1Config },
      { x: 16, y: 9, xOffSet: 16, config: jungleV1Config },
      { x: 18, y: 7, config: jungleH1Config },
      { x: 19, y: 3, config: jungleH1Config },
      { x: 19, y: 7, config: jungleH1Config },
      { x: 20, y: 3, config: jungleH1Config },
      { x: 20, y: 8, config: jungleH1Config },
      { x: 21, y: 3, config: jungleH1Config },
      { x: 21, y: 8, config: jungleH1Config },
      { x: 22, y: 7, config: jungleH1Config },
      { x: 24, y: 2, config: jungleH1Config },
      { x: 24, y: 6, config: jungleH1Config },
      { x: 25, y: 2, config: jungleH1Config },
      { x: 25, y: 6, config: jungleH1Config },
      { x: 26, y: 2, config: jungleH1Config },
      { x: 26, y: 5, config: jungleH1Config },
      { x: 27, y: 2, config: jungleH1Config },
      { x: 28, y: 4, config: jungleH1Config },
      { x: 29, y: 4, config: jungleH1Config }
    ]

    const platformGroup = scene.physics.add.staticGroup()

    for (const platform of platformArray) {
      const sprite = (platformGroup.create(
        platform.x * gridWidth +
          platform.config.width / 2 +
          (platform.xOffSet ?? 0),
        platform.y * gridHeight +
          platform.config.height / 2 +
          (platform.yOffSet ?? 0),
        platform.config.spriteKey
      ) as Phaser.Physics.Arcade.Sprite).setScale(platform.scale ?? 1)

      sprite.body.checkCollision.down = platform.config.checkDownCollision
      sprite.body.checkCollision.up = platform.config.checkUpCollision
      sprite.body.checkCollision.left = platform.config.checkLeftCollision
      sprite.body.checkCollision.right = platform.config.checkRightCollision
    }

    return platformGroup
  }
}
