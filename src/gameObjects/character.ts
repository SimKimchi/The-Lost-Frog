/* eslint-disable indent */
import 'phaser'
import { CharacterConfig, Direction } from '../util'

// TODO Ajouter scene comme champ privé
export default abstract class Character {
  protected abstract moveSpeed: number
  protected abstract jumpStrength: number
  protected abstract gravity: number
  protected abstract invulnerableTime: number
  protected abstract die: (() => void) | null
  protected abstract knockback: number
  protected direction: Direction
  protected currentHp: number
  protected maxHp: number
  protected damage: number
  protected sprite: Phaser.GameObjects.Sprite | null
  protected container: Phaser.GameObjects.Container | null
  protected invulnerable: boolean
  protected assetPrefix: string

  constructor(maxHp: number, damage: number, assetPrefix: string) {
    this.sprite = null
    this.container = null
    this.currentHp = this.maxHp = maxHp
    this.damage = damage
    this.direction = Direction.Neutral
    this.invulnerable = false
    this.assetPrefix = assetPrefix
  }

  public abstract jump(
    multiplier: number,
    jumpSound: Phaser.Sound.BaseSound,
    doubleJumpSound: Phaser.Sound.BaseSound
  ): void

  public abstract updateAnimation(): void

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
            ? [{ key: animation.assetKey, frame: animation.frame }]
            : scene.anims.generateFrameNumbers(animation.assetKey, {
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
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setMaxVelocity(
      this.moveSpeed,
      this.jumpStrength
    )
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

  public handleHit(
    scene: Phaser.Scene,
    direction: Direction,
    damage: number
  ): void {
    this.makeInvulnerable(scene)
    this.triggerKnockback(scene, direction)
    this.takeDamage(damage)
  }

  protected takeDamage(damage: number): void {
    this.currentHp -= damage

    if (this.currentHp <= 0) {
      this.currentHp = 0

      if (this.die) {
        this.die()
      }
    }
  }

  protected triggerKnockback(scene: Phaser.Scene, direction: Direction): void {
    if (!this.container) return

    let props = {}
    if (direction === Direction.Right || direction === Direction.Left) {
      const currentX = (<Phaser.Physics.Arcade.Body>this.container.body).x
      props = {
        x:
          direction === Direction.Right
            ? currentX + this.knockback
            : currentX - this.knockback
      }
    } else if (direction === Direction.Up) {
      const currentY = (<Phaser.Physics.Arcade.Body>this.container.body).y
      props = {
        y: currentY - this.knockback / 2
      }
    }
    scene.tweens.add({
      targets: this.container,
      duration: 100,
      props
    })
  }

  public setGravity(multiplier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setGravityY(
      this.gravity * multiplier
    )
  }

  protected makeInvulnerable(scene: Phaser.Scene): void {
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
