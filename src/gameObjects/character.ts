/* eslint-disable indent */
import 'phaser'
import { CharacterConfig, Direction } from '../util'

export default abstract class Character {
  protected abstract moveSpeed: number
  protected abstract jumpStrength: number
  protected abstract gravity: number
  protected abstract invulnerableTime: number
  protected abstract die: (() => void) | null
  protected direction: Direction
  protected currentHp: number
  protected maxHp: number
  protected damage: number
  protected sprite: Phaser.GameObjects.Sprite | null
  protected container: Phaser.GameObjects.Container | null
  protected invulnerable: boolean

  constructor(maxHp: number, damage: number) {
    this.sprite = null
    this.container = null
    this.currentHp = this.maxHp = maxHp
    this.damage = damage
    this.direction = Direction.Neutral
    this.invulnerable = false
  }

  public getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite as Phaser.Physics.Arcade.Sprite
  }

  public getContainer(): Phaser.GameObjects.Container {
    return this.container as Phaser.GameObjects.Container
  }

  public isInvulnerable(): boolean {
    return this.invulnerable
  }

  public init(
    scene: Phaser.Scene,
    planetGravity: number,
    config: CharacterConfig
  ): void {
    this.sprite = scene.add.sprite(
      config.spriteOffsetX,
      config.spriteOffsetY,
      config.spriteKey
    )
    this.container = scene.add.container(config.spawnX, config.spawnY, [
      this.sprite
    ])
    this.container.setSize(config.containerSizeX, config.containerSizeY)
    scene.physics.world.enable(this.container)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setCollideWorldBounds(
      config.collideWorldBounds
    )

    for (const animation of config.animations) {
      scene.anims.create({
        key: animation.key,
        frames:
          animation.frame !== undefined
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

    this.container.setData('damage', this.damage)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).onWorldBounds = true
  }

  public run(multiplier: number): void {
    if (!this.container) return

    const velocityX = this.moveSpeed * multiplier
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityX(velocityX)

    if (velocityX > 0) {
      this.direction = Direction.Right
    } else if (velocityX < 0) {
      this.direction = Direction.Left
    } else {
      this.direction = Direction.Neutral
    }
  }

  public abstract jump(multiplier: number): void

  public abstract updateAnimation(): void

  public takeDamage(damage: number): void {
    this.currentHp -= damage

    if (this.currentHp <= 0) {
      this.currentHp = 0
      this.die()
    }
  }

  public setGravity(multiplier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setGravityY(
      this.gravity * multiplier
    )
  }

  public makeInvulnerable(scene: Phaser.Scene): void {
    this.invulnerable = true
    scene.time.addEvent({
      delay: this.invulnerableTime,
      args: [this],
      callback: (character: Character) => {
        character.invulnerable = false
      },
      callbackScope: scene
    })
  }

  protected isGrounded(): boolean {
    if (!this.container) return false

    return (<Phaser.Physics.Arcade.Body>this.container.body).blocked.down
  }
}
