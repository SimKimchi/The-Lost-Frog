import 'phaser'

export interface PlatformSet {
  x: number
  y: number
  scale?: number
}

export default class Platforms {
  private platforms: Phaser.Physics.Arcade.StaticGroup | null

  constructor() {
    this.platforms = null
  }

  public getStaticGroup(): Phaser.Physics.Arcade.StaticGroup {
    return this.platforms as Phaser.Physics.Arcade.StaticGroup
  }

  public initializeStaticGroup(
    scene: Phaser.Scene,
    platformSet: PlatformSet[],
    assetKey: string
  ): void {
    this.platforms = scene.physics.add.staticGroup()

    for (const platform of platformSet) {
      this.platforms
        .create(platform.x, platform.y, assetKey)
        .setScale(platform.scale)
    }
  }
}
