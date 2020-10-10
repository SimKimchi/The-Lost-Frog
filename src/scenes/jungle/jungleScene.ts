import 'phaser'
import Player from '../../gameObjects/player'

export default class JunglePlanetScene extends Phaser.Scene {
  private frog: Player
  private hotKeys: HotKeys | null

  constructor() {
    super('demo')
    this.frog = new Player()
    this.hotKeys = null
  }

  public preload(): void {
    console.log('preload')
    this.load.spritesheet('dude', '/src/assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public create(): void {
    console.log('create')
    this.frog.initializeSprite(this, 1)
    this.hotKeys = this.input.keyboard.addKeys('W,A,S,D') as HotKeys
  }

  public update(): void {
    this.setKeyboardActions()
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
