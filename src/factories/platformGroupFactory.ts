import { gridHeight, gridWidth, Platform } from '../util'
import PlatformConfigProvider from '../providers/platformConfigProvider'
import PlanetScene from '../scenes/planets/planetScene'

export default abstract class PlatformGroupFactory {
  private static jungleH1Config = PlatformConfigProvider.getJungleH1Config()
  private static jungleH2Config = PlatformConfigProvider.getJungleH2Config()
  private static jungleH3Config = PlatformConfigProvider.getJungleH3Config()
  private static jungleH4Config = PlatformConfigProvider.getJungleH4Config()
  private static jungleV1Config = PlatformConfigProvider.getJungleV1Config()
  private static jungleBranchH1Config = PlatformConfigProvider.getJungleBranchH1Config()
  private static jungleBranchH2Config = PlatformConfigProvider.getJungleBranchH2Config()
  private static jungleSpikesConfig = PlatformConfigProvider.getJungleSpikesConfig()
  private static jungleF1Config = PlatformConfigProvider.getJungleF1Config()
  private static jungleF2Config = PlatformConfigProvider.getJungleF2Config()
  private static jungleF3Config = PlatformConfigProvider.getJungleF3Config()
  private static iceH1Config = PlatformConfigProvider.getIceH1Config()
  private static iceV1Config = PlatformConfigProvider.getIceV1Config()
  private static iceF1Config = PlatformConfigProvider.getIceF1Config()
  private static iceF2Config = PlatformConfigProvider.getIceF2Config()
  private static iceF3Config = PlatformConfigProvider.getIceF3Config()
  private static iceSpikesConfig = PlatformConfigProvider.getIceSpikesConfig()
  private static volcanoH1Config = PlatformConfigProvider.getVolcanoH1Config()
  private static volcanoH2Config = PlatformConfigProvider.getVolcanoH2Config()
  private static volcanoH3Config = PlatformConfigProvider.getVolcanoH3Config()
  private static volcanoV1Config = PlatformConfigProvider.getVolcanoV1Config()
  private static volcanoV2Config = PlatformConfigProvider.getVolcanoV2Config()
  private static volcanoV3Config = PlatformConfigProvider.getVolcanoV3Config()
  private static volcanoF1Config = PlatformConfigProvider.getVolcanoF1Config()
  private static volcanoF2Config = PlatformConfigProvider.getVolcanoF2Config()
  private static volcanoF3Config = PlatformConfigProvider.getVolcanoF3Config()
  private static volcanoSpikesConfig = PlatformConfigProvider.getVolcanoSpikesConfig()

  private static junglePlatformLayouts: Platform[][] = [
    // * Jungle Level 1
    // * Floors
    [
      { x: 0, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.jungleF3Config },
      {
        x: 4,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.jungleF1Config
      },
      { x: 5, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 6, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 7, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 8, y: 9, config: PlatformGroupFactory.jungleF3Config },
      {
        x: 16,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.jungleF1Config
      },
      {
        x: 17,
        y: 9,
        config: PlatformGroupFactory.jungleF2Config
      },
      { x: 18, y: 9, config: PlatformGroupFactory.jungleF2Config },
      {
        x: 19,
        y: 9,
        config: PlatformGroupFactory.jungleF2Config
      },
      { x: 20, y: 9, config: PlatformGroupFactory.jungleF3Config },
      {
        x: 22,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.jungleF1Config
      },
      { x: 23, y: 9, config: PlatformGroupFactory.jungleF3Config },
      {
        x: 25,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.jungleF1Config
      },
      { x: 26, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.jungleF3Config },

      // * Platforms
      { x: 8, y: 8, config: PlatformGroupFactory.jungleH1Config },
      { x: 9, y: 8, config: PlatformGroupFactory.jungleH2Config },
      { x: 10, y: 8, config: PlatformGroupFactory.jungleH2Config },
      { x: 11, y: 8, config: PlatformGroupFactory.jungleH3Config },

      { x: 6, y: 7, config: PlatformGroupFactory.jungleH4Config },
      { x: 5, y: 6, config: PlatformGroupFactory.jungleH4Config },
      { x: 4, y: 5, config: PlatformGroupFactory.jungleH4Config },

      { x: 0, y: 4, config: PlatformGroupFactory.jungleH1Config },
      { x: 1, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 2, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 3, y: 4, config: PlatformGroupFactory.jungleH3Config },

      { x: 5, y: 3, config: PlatformGroupFactory.jungleH4Config },
      { x: 6, y: 2, config: PlatformGroupFactory.jungleH4Config },

      { x: 7, y: 1, config: PlatformGroupFactory.jungleH1Config },
      { x: 8, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 9, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 10, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 11, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 12, y: 1, config: PlatformGroupFactory.jungleH3Config },

      { x: 10, y: 4, config: PlatformGroupFactory.jungleH1Config },
      { x: 11, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 12, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 13, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 14, y: 4, config: PlatformGroupFactory.jungleH3Config },

      { x: 16, y: 4, config: PlatformGroupFactory.jungleH1Config },
      { x: 17, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 18, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 19, y: 4, config: PlatformGroupFactory.jungleH2Config },
      { x: 20, y: 4, config: PlatformGroupFactory.jungleH3Config },

      { x: 28, y: 8, config: PlatformGroupFactory.jungleH1Config },
      { x: 29, y: 8, config: PlatformGroupFactory.jungleH3Config },
      { x: 29, y: 7, config: PlatformGroupFactory.jungleH4Config },

      { x: 24, y: 6, config: PlatformGroupFactory.jungleH1Config },
      { x: 25, y: 6, config: PlatformGroupFactory.jungleH2Config },
      { x: 26, y: 6, config: PlatformGroupFactory.jungleH2Config },
      { x: 27, y: 6, config: PlatformGroupFactory.jungleH3Config },

      { x: 22, y: 5, config: PlatformGroupFactory.jungleH4Config },

      { x: 22, y: 3, config: PlatformGroupFactory.jungleH1Config },
      { x: 23, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 24, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 25, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 26, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 27, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 28, y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 29, y: 3, config: PlatformGroupFactory.jungleH3Config }
    ],
    // Jungle Level 2
    [
      // Left Floor of wall
      { x: 0, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 4, y: 9, config: PlatformGroupFactory.jungleF2Config },
      // Standing Wall 1
      { x: 4,  y: 8, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 4,  y: 7, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 4,  y: 6, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 4,  y: 5, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 4,  y: 4, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 4,  y: 3, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      // Right floor of wall
      { x: 5, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 6, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 7, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 8, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 9, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 10, y: 9, config: PlatformGroupFactory.jungleF3Config },
      // Hanging wall 1 with platform
      { x: 9,  y: 5, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 4, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 3, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 2, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 1, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 0, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 9,  y: 3, posOffsetX: 16, config: PlatformGroupFactory.jungleH2Config },
      { x: 10,  y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 11,  y: 3, config: PlatformGroupFactory.jungleH3Config },
      // Standing Wall 2
      { x: 13,  y: 9, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 8, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 7, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 6, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 5, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 4, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      { x: 13,  y: 3, posOffsetX: 16, config: PlatformGroupFactory.jungleV1Config },
      // Free Platform 1
      { x: 16,  y: 8, config: PlatformGroupFactory.jungleH1Config },
      { x: 17,  y: 8, config: PlatformGroupFactory.jungleH3Config },
      // Free Platform 2
      { x: 19,  y: 6, config: PlatformGroupFactory.jungleH1Config },
      { x: 20,  y: 6, config: PlatformGroupFactory.jungleH3Config },
      // Free Platform 2
      { x: 22,  y: 4, config: PlatformGroupFactory.jungleH1Config },
      { x: 23,  y: 4, config: PlatformGroupFactory.jungleH3Config },
      // Right Wall Platform
      { x: 26,  y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 27,  y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 28,  y: 3, config: PlatformGroupFactory.jungleH2Config },
      { x: 29,  y: 3, config: PlatformGroupFactory.jungleH2Config },
      // Free Platform 4
      { x: 22,  y: 7, config: PlatformGroupFactory.jungleH1Config },
      { x: 23,  y: 7, config: PlatformGroupFactory.jungleH3Config },
      // Right floor
      { x: 25, y: 9, posOffsetX: 32, config: PlatformGroupFactory.jungleF1Config },
      { x: 26, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.jungleF2Config },
    ],
    // Jungle Level 3
    [
      // Floor Left
      { x: 0, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 4, y: 9, config: PlatformGroupFactory.jungleF3Config },
      // Middle Platform
      { x: 6, y: 7, config: PlatformGroupFactory.jungleH1Config },
      { x: 7, y: 7, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 8, y: 7, config: PlatformGroupFactory.jungleH1Config },
      { x: 9, y: 7, config: PlatformGroupFactory.jungleH3Config },
      { x: 12, y: 7, config: PlatformGroupFactory.jungleH1Config },
      { x: 13, y: 7, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 14, y: 7, config: PlatformGroupFactory.jungleH2Config },
      // Left Platform
      { x: 2, y: 5, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 3, y: 5, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 4, y: 5, config: PlatformGroupFactory.jungleH1Config },
      { x: 4, y: 5, config: PlatformGroupFactory.jungleH1Config },
      // Right Platform
      { x: 15, y: 5, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 16, y: 5, config: PlatformGroupFactory.jungleH1Config },
      { x: 17, y: 5, config: PlatformGroupFactory.jungleH1Config },
      { x: 18, y: 5, config: PlatformGroupFactory.jungleH1Config },
      // Floor Right
      { x: 16, y: 9, config: PlatformGroupFactory.jungleF1Config, posOffsetX: 32 },
      { x: 17, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 18, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 19, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 20, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 21, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 22, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 23, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 24, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 25, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 26, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.jungleF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.jungleF2Config },
      // Left tunnel wall
      { x: 27, y: 7, config: PlatformGroupFactory.jungleV1Config },
      { x: 27, y: 6, config: PlatformGroupFactory.jungleV1Config },
      { x: 27, y: 5, config: PlatformGroupFactory.jungleV1Config },
      { x: 27, y: 4, config: PlatformGroupFactory.jungleV1Config },
      { x: 27, y: 3, config: PlatformGroupFactory.jungleV1Config },
      // Right tunnel wall
      { x: 29, y: 8, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 7, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 6, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 5, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 4, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 3, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 2, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 1, config: PlatformGroupFactory.jungleV1Config },
      { x: 29, y: 0, config: PlatformGroupFactory.jungleV1Config },
      // Right upper platform
      { x: 25, y: 2, config: PlatformGroupFactory.jungleH3Config },
      { x: 24, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 23, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      // Middle upper platform
      { x: 20, y: 1, config: PlatformGroupFactory.jungleH3Config },
      { x: 19, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 18, y: 1, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 17, y: 1, config: PlatformGroupFactory.jungleH2Config },
      { x: 16, y: 1, config: PlatformGroupFactory.jungleSpikesConfig },
      // Left upper platform
      { x: 14, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 13, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 12, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 11, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 10, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 9, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 8, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 7, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      { x: 6, y: 2, config: PlatformGroupFactory.jungleSpikesConfig },
      // Left upper platform 2
      { x: 4, y: 2, config: PlatformGroupFactory.jungleH3Config },
      { x: 3, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 2, y: 2, config: PlatformGroupFactory.jungleH2Config },
      { x: 1, y: 2, config: PlatformGroupFactory.jungleH1Config },
      { x: 0, y: 2, config: PlatformGroupFactory.jungleH1Config },

    ],
  ]

  private static icePlatformLayouts: Platform[][] = [
    // Ice Level 1
    [
      // Left Floor
      { x: 0, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 4, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 5, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 6, y: 9, config: PlatformGroupFactory.iceF3Config },
      // Middle Platform
      { x: 7, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 8, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 9, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 10, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 11, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 12, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 13, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 14, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 15, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 16, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 17, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 18, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 21, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 22, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 23, y: 7, config: PlatformGroupFactory.iceH1Config },
      // Middle Floor
      { x: 14, y: 9, posOffsetX: 32, config: PlatformGroupFactory.iceF1Config },
      { x: 15, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 16, y: 9, config: PlatformGroupFactory.iceF3Config },
      // Left Tiny Platform
      { x: 8, y: 5, config: PlatformGroupFactory.iceH1Config },
      // Left Platform
      { x: 3, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 4, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 5, y: 3, config: PlatformGroupFactory.iceH1Config },
      // Upper Left Platform
      { x: 8, y: 1, config: PlatformGroupFactory.iceH1Config },
      { x: 9, y: 1, config: PlatformGroupFactory.iceH1Config },
      { x: 10, y: 1, config: PlatformGroupFactory.iceH1Config },
      // Upper Platform
      { x: 13, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 14, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 15, y: 2, config: PlatformGroupFactory.iceH1Config },
      // Upper Right Platform
      { x: 18, y: 1, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 1, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 1, config: PlatformGroupFactory.iceH1Config },
      // Right Tiny Platform
      { x: 21, y: 5, config: PlatformGroupFactory.iceH1Config },
      // Right Platform
      { x: 23, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 24, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 25, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 26, y: 3, config: PlatformGroupFactory.iceH1Config },
      // Right Floor
      { x: 23, y: 9, posOffsetX: 32, config: PlatformGroupFactory.iceF1Config },
      { x: 24, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 25, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 26, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.iceF2Config },
    ],
    // * Ice Level 2
    // * Floors
    [
      { x: 0, y: 9, posOffsetX: 32, config: PlatformGroupFactory.iceF1Config },
      { x: 1, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 4, y: 9, config: PlatformGroupFactory.iceF3Config },

      // Platforms

      { x: 0, y: -3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: -2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: -1, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 0, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 1, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 4, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 5, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 0, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },

      { x: 1, y: 5, config: PlatformGroupFactory.iceH1Config },

      { x: 4, y: 2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 4, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 5, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 4, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },

      { x: 5, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 6, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 7, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 8, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 9, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 10, y: 2, config: PlatformGroupFactory.iceH1Config },

      { x: 9, y: 2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 4, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 5, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 9, y: 9, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },

      {
        x: 13,
        y: -3,
        posOffsetX: 16,
        config: PlatformGroupFactory.iceV1Config
      },
      {
        x: 13,
        y: -2,
        posOffsetX: 16,
        config: PlatformGroupFactory.iceV1Config
      },
      {
        x: 13,
        y: -1,
        posOffsetX: 16,
        config: PlatformGroupFactory.iceV1Config
      },
      { x: 13, y: 0, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 1, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 4, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 5, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 13, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },

      { x: 10, y: 8, config: PlatformGroupFactory.iceH1Config },

      { x: 9, y: 9, posOffsetX: 32, config: PlatformGroupFactory.iceF1Config },
      { x: 10, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 11, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 12, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 13, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 14, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 15, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 16, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 17, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 18, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 19, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 20, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 21, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 22, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 23, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 24, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 25, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 26, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.iceF2Config },

      { x: 16, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 18, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 18, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 20, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 22, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 22, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 24, y: 8, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 26, y: 6, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 26, y: 7, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },

      { x: 14, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 15, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 16, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 17, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 18, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 21, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 18, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 21, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 22, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 23, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 24, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 25, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 26, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 27, y: 6, config: PlatformGroupFactory.iceH1Config },
      { x: 29, y: 7, config: PlatformGroupFactory.iceH1Config },

      { x: 25, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 24, y: 4, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 21, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 22, y: 3, config: PlatformGroupFactory.iceH1Config },
      { x: 23, y: 3, config: PlatformGroupFactory.iceH1Config },

      { x: 18, y: 2, config: PlatformGroupFactory.iceH1Config },

      { x: 17, y: 0, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 17, y: 1, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 17, y: 2, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 17, y: 3, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 17, y: 4, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config },
      { x: 17, y: 5, posOffsetX: 16, config: PlatformGroupFactory.iceV1Config }
    ],
    // Ice Level 3
    [
      // Floor
      { x: 0, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 4, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 9, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 10, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 11, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 12, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 17, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 18, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 19, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 20, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 25, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 26, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.iceF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.iceF2Config },
      // Floor Spikes
      { x: 5, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 6, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 7, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 8, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      // Floor Spikes 2
      { x: 13, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 14, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 15, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 16, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      // Floor Spikes 3 
      { x: 21, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 22, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 23, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 24, y: 9, config: PlatformGroupFactory.iceSpikesConfig },
      // Bottom Left Platform
      { x: 4, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 5, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 6, y: 7, config: PlatformGroupFactory.iceH1Config },
      // Bottom Right Platform
      { x: 23, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 24, y: 7, config: PlatformGroupFactory.iceH1Config },
      { x: 25, y: 7, config: PlatformGroupFactory.iceH1Config },
      // Middle Left Platform
      { x: 8, y: 5, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 9, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 10, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 11, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 12, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 13, y: 5, config: PlatformGroupFactory.iceSpikesConfig },
      // Middle Right Platform
      { x: 15, y: 5, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 16, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 17, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 18, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 19, y: 5, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 5, config: PlatformGroupFactory.iceSpikesConfig },
      // Tiny Platforms Left
      { x: 6, y: 4, config: PlatformGroupFactory.iceH1Config },
      { x: 23, y: 4, config: PlatformGroupFactory.iceH1Config },
      // Upper Left Platform
      { x: 8, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 9, y: 2, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 10, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 11, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 12, y: 2, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 13, y: 2, config: PlatformGroupFactory.iceH1Config },
      // Upper Right Platform
      { x: 17, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 18, y: 2, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 19, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 20, y: 2, config: PlatformGroupFactory.iceH1Config },
      { x: 21, y: 2, config: PlatformGroupFactory.iceSpikesConfig },
      { x: 22, y: 2, config: PlatformGroupFactory.iceH1Config },
    ]
  ]

  private static volcanoPlatformLayouts: Platform[][] = [
    // * Volcano Level 1
    // * Floors
    [
      { x: 0, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 1, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 2, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 3, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      {
        x: 4,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.volcanoF1Config
      },
      { x: 5, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 6, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 7, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 8, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      {
        x: 10,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.volcanoF1Config
      },
      { x: 11, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 12, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 13, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 14, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      {
        x: 16,
        y: 9,
        posOffsetX: 48,
        config: PlatformGroupFactory.volcanoF1Config
      },
      {
        x: 17,
        y: 9,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoF3Config
      },

      {
        x: 19,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.volcanoF1Config
      },
      { x: 20, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      {
        x: 22,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.volcanoF1Config
      },
      { x: 23, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      {
        x: 25,
        y: 9,
        posOffsetX: 32,
        config: PlatformGroupFactory.volcanoF1Config
      },
      { x: 26, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 27, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 28, y: 9, config: PlatformGroupFactory.volcanoF2Config },
      { x: 29, y: 9, config: PlatformGroupFactory.volcanoF3Config },

      // * Platforms
      { x: 0, y: 7, config: PlatformGroupFactory.volcanoH3Config },
      { x: 0, y: 5, config: PlatformGroupFactory.volcanoH3Config },
      { x: 0, y: 3, config: PlatformGroupFactory.volcanoH3Config },
      { x: 3, y: 6, config: PlatformGroupFactory.volcanoH1Config },
      { x: 3, y: 4, config: PlatformGroupFactory.volcanoH1Config },
      { x: 3, y: 2, config: PlatformGroupFactory.volcanoH1Config },
      { x: 4, y: 6, config: PlatformGroupFactory.volcanoH3Config },
      { x: 4, y: 4, config: PlatformGroupFactory.volcanoH3Config },
      { x: 4, y: 2, config: PlatformGroupFactory.volcanoH2Config },

      {
        x: 5,
        y: 2,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 5,
        y: 3,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 5,
        y: 4,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 5,
        y: 5,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 5,
        y: 6,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 5,
        y: 7,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV3Config
      },
      { x: 5, y: 2, config: PlatformGroupFactory.volcanoH2Config },
      { x: 6, y: 2, config: PlatformGroupFactory.volcanoH2Config },
      { x: 7, y: 2, config: PlatformGroupFactory.volcanoH2Config },
      { x: 8, y: 2, config: PlatformGroupFactory.volcanoH3Config },
      { x: 8, y: 7, config: PlatformGroupFactory.volcanoH1Config },
      { x: 9, y: 5, config: PlatformGroupFactory.volcanoH1Config },
      { x: 9, y: 7, config: PlatformGroupFactory.volcanoH3Config },
      { x: 10, y: 5, config: PlatformGroupFactory.volcanoH2Config },
      { x: 11, y: 5, config: PlatformGroupFactory.volcanoH2Config },
      { x: 12, y: 5, config: PlatformGroupFactory.volcanoH2Config },
      { x: 13, y: 5, config: PlatformGroupFactory.volcanoH3Config },
      { x: 14, y: 0, config: PlatformGroupFactory.volcanoH1Config },
      {
        x: 14,
        y: 0,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 14,
        y: 1,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 14,
        y: 2,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 14,
        y: 3,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 14,
        y: 4,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 14,
        y: 5,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 14,
        y: 6,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      { x: 15, y: 0, config: PlatformGroupFactory.volcanoH2Config },
      { x: 16, y: 0, config: PlatformGroupFactory.volcanoH3Config },
      {
        x: 16,
        y: 2,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 16,
        y: 3,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 16,
        y: 4,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV1Config
      },
      {
        x: 16,
        y: 5,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 16,
        y: 6,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 16,
        y: 7,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV2Config
      },
      {
        x: 16,
        y: 8,
        posOffsetX: 16,
        config: PlatformGroupFactory.volcanoV3Config
      },

      { x: 19, y: 2, config: PlatformGroupFactory.volcanoV1Config },
      { x: 20, y: 0, config: PlatformGroupFactory.volcanoV1Config },
      { x: 20, y: 1, config: PlatformGroupFactory.volcanoV2Config },
      { x: 20, y: 2, config: PlatformGroupFactory.volcanoV2Config },

      { x: 18, y: 6, config: PlatformGroupFactory.volcanoH1Config },
      { x: 19, y: 3, config: PlatformGroupFactory.volcanoH1Config },
      { x: 19, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 20, y: 3, config: PlatformGroupFactory.volcanoH2Config },
      { x: 20, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 21, y: 3, config: PlatformGroupFactory.volcanoH3Config },
      { x: 21, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 22, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 23, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 24, y: 2, config: PlatformGroupFactory.volcanoH1Config },
      { x: 24, y: 6, config: PlatformGroupFactory.volcanoH1Config },
      { x: 25, y: 2, config: PlatformGroupFactory.volcanoH2Config },
      { x: 25, y: 6, config: PlatformGroupFactory.volcanoH3Config },
      { x: 26, y: 2, config: PlatformGroupFactory.volcanoH2Config },
      { x: 26, y: 5, config: PlatformGroupFactory.volcanoH2Config },
      { x: 27, y: 2, config: PlatformGroupFactory.volcanoH3Config },
      { x: 28, y: 4, config: PlatformGroupFactory.volcanoH1Config },
      { x: 28, y: 8, config: PlatformGroupFactory.volcanoH2Config },
      { x: 29, y: 4, config: PlatformGroupFactory.volcanoH3Config },
      { x: 29, y: 7, config: PlatformGroupFactory.volcanoH2Config }
    ],
    // Volcano Level 2
    [
      // Left Boundary
      { x: 0, y: 9, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 8, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 7, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 6, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 5, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 4, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 3, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 2, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 1, config: PlatformGroupFactory.volcanoV1Config},
      // Right Boundary
      { x: 29, y: 9, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 8, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 7, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 6, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 5, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 4, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 3, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 2, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      { x: 29, y: 1, posOffsetX: 32, config: PlatformGroupFactory.volcanoV1Config},
      // Start floor
      { x: 0, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 1, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 2, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 3, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 4, y: 9, config: PlatformGroupFactory.volcanoF3Config},
      // Ceilling 1
      { x: 0, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 1, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 2, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 3, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 4, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 5, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 6, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 7, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 8, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 9, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 10, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 11, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 12, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 13, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 14, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 15, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 16, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 17, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 18, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 19, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 20, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 21, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 22, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 23, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 24, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      { x: 25, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      // Small bottom floors
      { x: 9, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 10, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 17, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 18, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      // Right floor
      { x: 24, y: 9, posOffsetX: 32, config: PlatformGroupFactory.volcanoF1Config},
      { x: 25, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 26, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 27, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 28, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 29, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      // Ceilling 2
      { x: 4, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 5, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 6, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 7, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 8, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 9, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 12, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 13, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 14, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 15, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 18, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 19, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 20, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 21, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 22, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 23, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 24, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 25, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 26, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 27, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 28, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 29, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      // Tiny room 2 platforms
      { x: 18, y: 5, config: PlatformGroupFactory.volcanoH2Config, posOffsetY: 32},
      { x: 12, y: 5, config: PlatformGroupFactory.volcanoH2Config, posOffsetY: 32},
      { x: 8, y: 5, config: PlatformGroupFactory.volcanoH2Config, posOffsetY: 32},
      // Floor 2 spikes
      { x: 6, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 7, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 9, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 10, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 11, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 13, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 14, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 15, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 16, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 17, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 19, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 20, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
      { x: 21, y: 5, config: PlatformGroupFactory.volcanoSpikesConfig, posOffsetY: 32},
    ],
    // Volcano Level 3
    [
      // Left Boundary
      { x: 0, y: 9, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 8, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 7, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 6, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 5, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 4, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 3, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 2, config: PlatformGroupFactory.volcanoV1Config},
      { x: 0, y: 1, config: PlatformGroupFactory.volcanoV1Config},
      // Left Pillar
      { x: 9, y: 9, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 8, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 7, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 6, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 5, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 4, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 3, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 2, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      { x: 9, y: 1, config: PlatformGroupFactory.volcanoV1Config, posOffsetX: 32},
      // Start floor
      { x: 0, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 1, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 2, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 3, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 4, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 5, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 6, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 7, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 8, y: 9, config: PlatformGroupFactory.volcanoF2Config},
      { x: 9, y: 9, config: PlatformGroupFactory.volcanoF3Config},
      // Left Platform 1
      { x: 6, y: 7, config: PlatformGroupFactory.volcanoH1Config },
      { x: 7, y: 7, config: PlatformGroupFactory.volcanoH2Config},
      { x: 8, y: 7, config: PlatformGroupFactory.volcanoH2Config},
      { x: 9, y: 7, config: PlatformGroupFactory.volcanoH2Config},
      // Left Platform 2
      { x: 0, y: 5, config: PlatformGroupFactory.volcanoH2Config },
      { x: 1, y: 5, config: PlatformGroupFactory.volcanoH2Config},
      { x: 2, y: 5, config: PlatformGroupFactory.volcanoH2Config},
      { x: 3, y: 5, config: PlatformGroupFactory.volcanoH3Config},
      // Left Platform 3
      { x: 6, y: 3, config: PlatformGroupFactory.volcanoH1Config },
      { x: 7, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 8, y: 3, config: PlatformGroupFactory.volcanoH2Config},
      { x: 9, y: 3, config: PlatformGroupFactory.volcanoH3Config},
      // Spike Platform Middle
      { x: 13, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 14, y: 6, config: PlatformGroupFactory.volcanoSpikesConfig},
      { x: 15, y: 6, config: PlatformGroupFactory.volcanoSpikesConfig},
      { x: 16, y: 6, config: PlatformGroupFactory.volcanoH2Config},
      // Right Pillar
      { x: 20, y: 9, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 8, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 7, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 6, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 5, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 4, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 3, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 2, config: PlatformGroupFactory.volcanoV1Config},
      { x: 20, y: 1, config: PlatformGroupFactory.volcanoV1Config},
      // Spike Platform Right
      { x: 24, y: 6, config: PlatformGroupFactory.volcanoH2Config },
      { x: 25, y: 6, config: PlatformGroupFactory.volcanoSpikesConfig},
      { x: 26, y: 6, config: PlatformGroupFactory.volcanoSpikesConfig},
      { x: 27, y: 6, config: PlatformGroupFactory.volcanoH2Config},
    ]
  ]

  public static createJunglePlatformGroups(
    scene: PlanetScene
  ): Phaser.Physics.Arcade.StaticGroup {
    const layout =
      PlatformGroupFactory.junglePlatformLayouts[scene.currentEnemyWave] ??
      PlatformGroupFactory.junglePlatformLayouts[
        scene.currentEnemyWave %
          PlatformGroupFactory.junglePlatformLayouts.length
      ]

    return this.createPlatformGroups(scene, layout)
  }

  public static createIcePlatformGroups(
    scene: PlanetScene
  ): Phaser.Physics.Arcade.StaticGroup {
    const layout =
      PlatformGroupFactory.icePlatformLayouts[scene.currentEnemyWave] ??
      PlatformGroupFactory.icePlatformLayouts[
        scene.currentEnemyWave % PlatformGroupFactory.icePlatformLayouts.length
      ]

    return this.createPlatformGroups(scene, layout)
  }

  public static createVolcanoPlatformGroups(
    scene: PlanetScene
  ): Phaser.Physics.Arcade.StaticGroup {
    const layout =
      PlatformGroupFactory.volcanoPlatformLayouts[scene.currentEnemyWave] ??
      PlatformGroupFactory.volcanoPlatformLayouts[
        scene.currentEnemyWave %
          PlatformGroupFactory.volcanoPlatformLayouts.length
      ]

    return this.createPlatformGroups(scene, layout)
  }

  private static createPlatformGroups(
    scene: PlanetScene,
    platformLayout: Platform[]
  ): Phaser.Physics.Arcade.StaticGroup {
    const platformGroup = scene.physics.add.staticGroup()

    for (const platform of platformLayout) {
      const sprite = (platformGroup.create(
        platform.x * gridWidth +
          platform.config.width / 2 +
          (platform.posOffsetX ?? 0),
        platform.y * gridHeight +
          platform.config.height / 2 +
          (platform.posOffsetY ?? 0),
        platform.config.spriteKey
      ) as Phaser.Physics.Arcade.Sprite).setScale(platform.scale ?? 1)

      sprite.setSize(platform.config.width, platform.config.height)
      sprite.body.checkCollision.down =
        platform.config.checkDownCollision ?? true
      sprite.body.checkCollision.up = platform.config.checkUpCollision ?? true
      sprite.body.checkCollision.left =
        platform.config.checkLeftCollision ?? true
      sprite.body.checkCollision.right =
        platform.config.checkRightCollision ?? true

      sprite.setData('damageUp', platform.config.damageUp ?? false)
      sprite.setData('damageDown', platform.config.damageDown ?? false)
      sprite.setData('damageLeft', platform.config.damageLeft ?? false)
      sprite.setData('damageRight', platform.config.damageRight ?? false)

      sprite.setData('clingSides', platform.config.clingSides ?? false)
      sprite.setData('clingUnder', platform.config.clingUnder ?? false)
      sprite.setData('letEnemiesFall', platform.config.letEnemiesFall ?? false)

      sprite.setData('offsetX', platform.posOffsetX ?? 0)
    }

    return platformGroup
  }
}
