import 'phaser'
import Character from './character'
import { CharacterConfig } from '../util'

export default class Player extends Character {
  protected moveSpeed = 400
  protected jumpStrength = 670
  protected gravity = 500
  private static instance: Player
  private canDoubleJump = false

  private tongueSprite: Phaser.GameObjects.Sprite | null

  constructor() {
    super(5, 1)
    this.tongueSprite = null
  }

  public init(
    scene: Phaser.Scene,
    planetGravity: number,
    config: CharacterConfig
  ): void {
    super.init(scene, planetGravity, config)

    if (!this.container) return

    //this.tongueSprite = scene.add.sprite(50, 50, 'bomb')
    //this.container.add(this.tongueSprite)
  }

  public static getPlayer(): Player {
    if (!Player.instance) {
      Player.instance = new Player()
    }

    return Player.instance
  }

  public jump(multiplier: number): void {
    if (!this.container) return

    if (this.isGrounded()) {
      this.canDoubleJump = true
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
    } else if (this.canDoubleJump) {
      this.canDoubleJump = false
      ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityY(
        this.jumpStrength * multiplier
      )
    }
  }

  public updateAnimation(): void {
    if (!this.container || !this.sprite) return

    // TODO: Uncomment once we have the 'jump' and 'fall' animations
    // if (this.sprite.body.velocity.y < 0) {
    //   this.sprite.anims.play('up', true)
    // } else if (this.sprite.body.velocity.y > 0) {
    //   this.sprite.anims.play('down', true)
    // } else
    if ((<Phaser.Physics.Arcade.Body>this.container.body).velocity.x < 0) {
      this.sprite.anims.play('left', true)
    } else if (
      (<Phaser.Physics.Arcade.Body>this.container.body).velocity.x > 0
    ) {
      this.sprite.anims.play('right', true)
    } else {
      this.sprite.anims.play('idle', true)
    }
  }

  public displayHp(): string {
    return `Health: ${this.currentHp}/${this.maxHp}`
  }
}
