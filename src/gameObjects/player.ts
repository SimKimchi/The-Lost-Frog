import 'phaser'
import Character from './character'

export default class Player extends Character {
  constructor() {
    super(5, 1)
  }

  public initializeSprite(scene: Phaser.Scene, planetGravity: number): void {
    this.sprite = scene.physics.add.sprite(100, 450, 'dude')

    this.sprite.setCollideWorldBounds(true)

    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    scene.anims.create({
      key: 'idle',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    })

    this.setGravity(planetGravity)
  }

  public run(multiplier: number): void {
    if (!this.sprite) return

    this.sprite.setVelocityX(Player.VELOCITY_X * multiplier)
  }

  public jump(multiplier: number): void {
    if (!this.sprite) return

    if (this.isGrounded()) {
      this.sprite.setVelocityY(Player.VELOCITY_Y * multiplier)
    }
  }

  public updateAnimation(): void {
    if (!this.sprite) return

    // TODO: Uncomment once we have the 'jump' and 'fall' animations
    // if (this.sprite.body.velocity.y < 0) {
    //   this.sprite.anims.play('up', true)
    // } else if (this.sprite.body.velocity.y > 0) {
    //   this.sprite.anims.play('down', true)
    // } else
    if (this.sprite.body.velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.anims.play('right', false)
    } else {
      this.sprite.anims.play('idle', false)
    }
  }

  public displayHp(): string {
    return `Health: ${this.currentHp}/${this.maxHp}`
  }

  public setGravity(multiplier: number): void {
    if (!this.sprite) return
    ;(<Phaser.Physics.Arcade.Body>this.sprite.body).setGravityY(
      Player.GRAVITY * multiplier
    )
  }
}
