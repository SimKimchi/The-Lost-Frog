/* eslint-disable indent */
import 'phaser'
import { CharacterConfig } from '../util'

export default abstract class Character {
  protected static readonly VELOCITY_X = 400
  protected static readonly VELOCITY_Y = 900
  protected static readonly GRAVITY = 500

  protected currentHp: number
  protected maxHp: number
  protected damage: number
  protected sprite: Phaser.Physics.Arcade.Sprite | null

  constructor(maxHp: number, damage: number) {
    this.sprite = null
    this.currentHp = this.maxHp = maxHp
    this.damage = damage
  }

  public getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite as Phaser.Physics.Arcade.Sprite
  }

  public initializeSprite(
    scene: Phaser.Scene,
    planetGravity: number,
    config: CharacterConfig
  ): void {
    this.sprite = scene.physics.add.sprite(
      config.spawnX,
      config.spawnY,
      config.spriteKey
    )

    this.sprite.setCollideWorldBounds(config.collideWorldBounds)

    for (const animation of config.animations) {
      scene.anims.create({
        key: animation.key,
        frames: animation.frame
          ? [{ key: config.spriteKey, frame: animation.frame }]
          : scene.anims.generateFrameNumbers(config.spriteKey, {
              start: animation.frameStart,
              end: animation.frameEnd
            }),
        frameRate: animation.frameRate,
        repeat: animation.repeat
      })
    }

    this.setGravity(planetGravity)

    this.sprite.setData('damage', this.damage)
  }

  public abstract run(multiplier: number): void

  public abstract jump(multiplier: number): void

  public abstract updateAnimation(): void

  public takeDamage(damage: number): void {
    this.currentHp -= damage

    if (this.currentHp < 0) {
      this.currentHp = 0
    }
  }

  public isDead(): boolean {
    return this.currentHp === 0
  }

  public setGravity(multiplier: number): void {
    if (!this.sprite) return
    ;(<Phaser.Physics.Arcade.Body>this.sprite.body).setGravityY(
      Character.GRAVITY * multiplier
    )
  }

  protected isGrounded(): boolean {
    if (!this.sprite) return false

    return this.sprite.body.blocked.down
  }
}
