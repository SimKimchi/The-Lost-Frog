import 'phaser'

export default class JunglePlanetScene extends Phaser.Scene {
  constructor() {
    super('demo')
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
