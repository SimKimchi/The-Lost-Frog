import 'phaser'

export default class JunglePlanetScene extends Phaser.Scene {
  constructor() {
    super('demo')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('platform', 'assets/platform.png')
    this.load.image('sky', 'assets/sky.png')
    this.load.image('star', 'assets/star.png')
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    })
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125444',
  width: 960,
  height: 640,
  scene: JunglePlanetScene
}

new Phaser.Game(config)
