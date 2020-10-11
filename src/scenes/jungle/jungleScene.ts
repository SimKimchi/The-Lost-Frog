import 'phaser'
import Platforms, { PlatformSet } from '../../gameObjects/platforms'
import assetRoutes from './assets'
import { Direction } from '../../util'
import Player from '../../gameObjects/player'
import { TheLostFrogGame } from '../..'

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
  private displayScore: Phaser.GameObjects.Text | null
  private displayHp: Phaser.GameObjects.Text | null

  constructor() {
    const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
      key: 'Jungle'
    }
    super(sceneConfig)
    this.frog = new Player()
    this.platforms = new Platforms()
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
  }

  public preload(): void {
    console.log('preload')
    this.load.image('sky', assetRoutes.sky)
    this.load.image('platform', assetRoutes.platform)
    this.load.image('bomb', assetRoutes.bomb)
    this.load.spritesheet('dude', assetRoutes.dude, {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public create(): void {
    console.log('create')

    this.initializeStaticAssets()
    this.initializeCharacters()
    this.initializeCollisions()
    this.initializeTexts()

    this.hotKeys = this.input.keyboard.addKeys('SPACE,A,S,D,E') as HotKeys
  }

  public update(): void {
    this.triggerKeyboardActions()
    this.frog.updateAnimation()
    this.updateTexts()
  }

  private triggerKeyboardActions(): void {
    if (!this.hotKeys) {
      return
    }
    let direction = Direction.Right

    if (this.hotKeys.A.isDown) {
      this.frog.run(-1)
      direction = Direction.Left
    } else if (this.hotKeys.D.isDown) {
      this.frog.run(1)
      direction = Direction.Right
    } else if (this.hotKeys.S.isDown) {
      direction = Direction.Down
    } else {
      this.frog.run(0)
    }
    if (this.hotKeys.SPACE.isDown) {
      this.frog.jump(-1)
      direction = Direction.Up
    }
    if (this.hotKeys.E.isDown) {
      this.frog.attack(this, direction)
    }
  }

  private initializeStaticAssets(): void {
    this.add.image(480, 320, 'sky')
    this.add.image(300, 620, 'bomb')
    this.platforms.initializeStaticGroup(this, JunglePlanetScene.PLATFORM_SET_1)
  }

  private initializeCharacters(): void {
    this.frog.initializeSprite(this, 1)
  }

  private initializeCollisions(): void {
    this.physics.add.collider(
      this.frog.getSprite(),
      this.platforms.getStaticGroup()
    )
  }

  private initializeTexts(): void {
    this.displayScore = this.add.text(
      25,
      25,
      (this.game as TheLostFrogGame).displayScore(),
      {
        fontFamiy: 'Consolas'
      }
    )
    this.displayHp = this.add.text(25, 45, this.frog.displayHp(), {
      fontFamiy: 'Consolas'
    })
  }

  private updateTexts(): void {
    this.displayHp?.setText(this.frog.displayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
  }
}

type HotKeys = {
  SPACE: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
  E: Phaser.Input.Keyboard.Key
}
