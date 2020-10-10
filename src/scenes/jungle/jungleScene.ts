import 'phaser'
import Player from '../../gameObjects/player'

export default class JunglePlanetScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
  private frog: Player

  constructor() {
    super('demo')
    this.frog = new Player()
    this.cursors = null
  }

  /* @return void */
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
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  public update(): void {
    this.setKeyboardActions()
  }

  private setKeyboardActions(): void {
    if (this.cursors) {
      if (this.cursors.left?.isDown) {
        console.log('test')
        this.frog.run(-1)
      } else if (this.cursors.right?.isDown) {
        this.frog.run(1)
      } else {
        this.frog.run(0)
      }
      if (this.cursors.up?.isDown) {
        this.frog.jump(-1)
      }
    }
  }
}
