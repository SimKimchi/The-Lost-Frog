import 'phaser'

export default class Player {
  private static readonly VELOCITY_X = 500
  private static readonly VELOCITY_Y = 900
  private static readonly GRAVITY = 500

  private currentHp: number
  private maxHp: number
  private damage: number
  private sprite: Phaser.Physics.Arcade.Sprite | null

  constructor() {
    this.sprite = null
    this.currentHp = this.maxHp = 5
    this.damage = 1
  }

  public getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite as Phaser.Physics.Arcade.Sprite
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

    if (this.sprite.body.velocity.y < 0) {
      this.sprite.anims.play('up', true)
    } else if (this.sprite.body.velocity.y > 0) {
      this.sprite.anims.play('down', true)
    } else if (this.sprite.body.velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (this.sprite.body.velocity.x > 0) {
      this.sprite.anims.play('right', false)
    } else {
      this.sprite.anims.play('idle', false)
    }
  }

  public takeDamage(damage: number): void {
    this.currentHp -= damage

    if (this.currentHp < 0) {
      this.currentHp = 0
    }
  }

  public isDead(): boolean {
    return this.currentHp <= 0
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

  private isGrounded() {
    if (!this.sprite) return

    return this.sprite.body.blocked.down
  }
}
