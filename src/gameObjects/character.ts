/* eslint-disable indent */
import 'phaser'
import PlanetScene from '../scenes/planets/planetScene'
import { CharacterConfig, Direction } from '../util'

// TODO Construire de l'extérieur, puisqu'on a besoin de Scene qui ne devrait pas être visible par le Character.
export default abstract class Character {
  protected abstract jumpStrength: number
  protected abstract gravity: number
  protected abstract invulnerableTime: number
  protected abstract die: (() => void) | null
  protected abstract knockback: number
  protected _currentHp: number
  protected maxHp: number
  protected damage: number
  protected moveSpeed: number
  protected direction: Direction
  protected idle: boolean
  protected _sprite: Phaser.GameObjects.Sprite | null
  protected _container: Phaser.GameObjects.Container | null
  protected invulnerable: boolean
  protected assetPrefix: string
  protected scene: PlanetScene
  protected spriteWidth: number
  protected spriteHeight: number

  constructor(
    maxHp: number,
    damage: number,
    bodyWidth: number,
    bodyHeight: number,
    moveSpeed: number,
    assetPrefix: string,
    scene: PlanetScene
  ) {
    this._sprite = null
    this._container = null
    this._currentHp = this.maxHp = maxHp
    this.damage = damage
    this.spriteWidth = bodyWidth
    this.spriteHeight = bodyHeight
    this.moveSpeed = moveSpeed
    this.direction = Direction.Right
    this.invulnerable = false
    this.assetPrefix = assetPrefix
    this.idle = true
    this.scene = scene
  }

  public abstract jump(
    multiplier: number,
    jumpSound: Phaser.Sound.BaseSound,
    doubleJumpSound: Phaser.Sound.BaseSound
  ): void

  public abstract updateAnimation(): void

  public get sprite(): Phaser.GameObjects.Sprite {
    if (!this._sprite) throw new Error("Sprite not yet initialized.")

    return this._sprite as Phaser.GameObjects.Sprite
  }

  public set sprite(sprite: Phaser.GameObjects.Sprite) {
    this._sprite = sprite;
  }

  public get container(): Phaser.GameObjects.Container {
    if (!this._container) throw new Error("Container not yet initialized.")

    return this._container as Phaser.GameObjects.Container
  }

  public set container(container: Phaser.GameObjects.Container) {
    this._container = container
  }

  public get body(): Phaser.Physics.Arcade.Body {
    if (!this._container) throw new Error("Container not yet initialized to access its body.")

    return this._container.body as Phaser.Physics.Arcade.Body
  }

  public get currentHp(): number {
    return this._currentHp
  }

  public isInvulnerable(): boolean {
    return this.invulnerable
  }

  public init(planetGravity: number, config: CharacterConfig): void {
    this.sprite = this.scene.add.sprite(
      config.spriteOffsetX,
      config.spriteOffsetY,
      config.spriteKey
    )
    this.container = this.scene.add.container(config.spawnX, config.spawnY, [
      this.sprite
    ])
    this.container.setSize(config.hitAreaWidth, config.hitAreaHeight)
    this.scene.physics.world.enable(this.container)
    this.body.setCollideWorldBounds(
      config.collideWorldBounds
    )

    for (const animation of config.animations) {
      this.scene.anims.create({
        key: animation.key,
        frames:
          animation.frame !== undefined
            ? [{ key: animation.assetKey, frame: animation.frame }]
            : this.scene.anims.generateFrameNumbers(animation.assetKey, {
                start: animation.frameStart,
                end: animation.frameEnd
              }),
        frameRate: animation.frameRate,
        repeat: animation.repeat
      })
    }

    this.setGravity(planetGravity)

    this.container.setData('damage', this.damage)
    this.body.onWorldBounds = true
    this.body.setMaxVelocity(
      this.moveSpeed,
      this.jumpStrength
    )
  }

  public run(multiplier: number): void {
    if (multiplier === 0) throw new Error('Call stop() instead.')

    const velocityX = this.moveSpeed * multiplier
    this.body.setVelocityX(velocityX)
    this.body.setDragX(0)

    if (velocityX > 0) {
      this.direction = Direction.Right
    } else if (velocityX < 0) {
      this.direction = Direction.Left
    }

    this.idle = false

    this.updateAnimation()
  }

  public stop(planetFrictionModifier: number): void {
    this.body.setDragX(
      planetFrictionModifier
    )

    if (this.isGrounded()) {
      this.updateAnimation()
    }

    this.idle = true
  }

  public handleHit(direction: Direction | null, damage: number): void {
    this.makeInvulnerable()

    if (direction) {
      this.triggerKnockback(direction)
    }

    this.takeDamage(damage)
  }

  public isDead(): boolean {
    return this._currentHp === 0
  }

  protected takeDamage(damage: number): void {
    this._currentHp -= damage

    if (this._currentHp <= 0) {
      this._currentHp = 0

      if (this.die) {
        this.die()
      }
    }
  }

  protected triggerKnockback(direction: Direction): void {
    let props = {}
    if (direction === Direction.Right || direction === Direction.Left) {
      props = {
        x: direction === Direction.Right ? this.knockback : -this.knockback
      }
    } else if (direction === Direction.Up) {
      props = {
        y: -this.knockback / 5
      }
    }

    this.triggerKnockbackTween(props)
  }

  protected abstract triggerKnockbackTween(props: Record<string, unknown>): void

  public setGravity(multiplier: number): void {
    this.body.setGravityY(
      this.gravity * multiplier
    )
  }

  protected makeInvulnerable(): void {
    this.invulnerable = true
    this.scene.time.addEvent({
      delay: this.invulnerableTime,
      args: [this],
      callback: (character: Character) => {
        character.invulnerable = false
        character.updateAnimation()
      },
      callbackScope: this.scene
    })
  }

  protected isGrounded(): boolean {
    return this.body.blocked.down
  }

  protected isFacingLeft(): boolean {
    return this.direction === Direction.Left
  }
}
