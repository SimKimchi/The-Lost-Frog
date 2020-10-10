import 'phaser'
import Platforms, { PlatformSet } from '../../gameObjects/platforms'
import assetRoutes from './assets'
import Player from '../../gameObjects/player'

export default class JunglePlanetScene extends Phaser.Scene {
  private static readonly PLATFORM_SET_1: PlatformSet[] = [
    { x: 400, y: 568, scale: 2 },
    { x: 600, y: 400 },
    { x: 50, y: 250 },
    { x: 750, y: 220 }
  ]

  private frog: Player
  private platforms: Platforms
  private hotKeys: HotKeys | null

  constructor() {
    const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
      key: 'Jungle'
    }
    super(sceneConfig)
    this.frog = new Player()
    this.platforms = new Platforms()
    this.hotKeys = null
  }

  public preload(): void {
    console.log('preload')
    this.load.image('sky', assetRoutes.sky)
    this.load.image('platform', assetRoutes.platform)
    this.load.spritesheet('dude', assetRoutes.dude, {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public create(): void {
    console.log('create')
    this.add.image(480, 320, 'sky')
    this.frog.initializeSprite(this, 1)
    this.platforms.initializeStaticGroup(this, JunglePlanetScene.PLATFORM_SET_1)
    this.physics.add.collider(
      this.frog.getSprite(),
      this.platforms.getStaticGroup()
    )
    this.hotKeys = this.input.keyboard.addKeys('W,A,S,D') as HotKeys
  }

  public update(): void {
    this.setKeyboardActions()
    this.frog.updateAnimation()
  }

  private setKeyboardActions(): void {
    if (!this.hotKeys) {
      return
    }

    if (this.hotKeys.A.isDown) {
      this.frog.run(-1)
    } else if (this.hotKeys.D.isDown) {
      this.frog.run(1)
    } else {
      this.frog.run(0)
    }
    if (this.hotKeys.W.isDown) {
      this.frog.jump(-1)
    }
  }
}

type HotKeys = {
  W: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
}
