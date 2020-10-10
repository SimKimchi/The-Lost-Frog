import 'phaser'

export default class Player {
  private sprite: Phaser.Physics.Arcade.Sprite

  constructor(private scene: Phaser.Scene) {
    this.scene = scene
    this.sprite = this.initializeSprite()
  }

  setGravity(gravity: number): void {
    this.sprite.body.setGravityY(gravity)
  }

  initializeSprite(): Phaser.Physics.Arcade.Sprite {
    const sprite: Phaser.Physics.Arcade.Sprite = this.scene.physics.add.sprite(
      100,
      450,
      'dude'
    )
    sprite.setCollideWorldBounds(true)
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    })

    return sprite
  }
}
