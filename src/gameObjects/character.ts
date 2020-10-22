/* eslint-disable indent */
import 'phaser'
import PlanetScene from '../scenes/planets/planetScene'
import { CharacterConfig, Direction } from '../util'

// TODO Ajouter scene comme champ privé
export default abstract class Character {
  protected abstract moveSpeed: number
  protected abstract jumpStrength: number
  protected abstract gravity: number
  protected abstract invulnerableTime: number
  protected abstract die: (() => void) | null
  protected abstract knockback: number
  protected currentHp: number
  protected maxHp: number
  protected damage: number
  protected direction: Direction
  protected idle: boolean
  protected sprite: Phaser.GameObjects.Sprite | null
  protected container: Phaser.GameObjects.Container | null
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
    assetPrefix: string,
    scene: PlanetScene
  ) {
    this.sprite = null
    this.container = null
    this.currentHp = this.maxHp = maxHp
    this.damage = damage
    this.spriteWidth = bodyWidth
    this.spriteHeight = bodyHeight
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

  public getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.sprite as Phaser.Physics.Arcade.Sprite
  }

  public getContainer(): Phaser.GameObjects.Container {
    return this.container as Phaser.GameObjects.Container
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
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setCollideWorldBounds(
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
    ;(<Phaser.Physics.Arcade.Body>this.container.body).onWorldBounds = true
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setMaxVelocity(
      this.moveSpeed,
      this.jumpStrength
    )
    ;(<Phaser.Physics.Arcade.Body>this.container.body).useDamping = true
  }

  public run(multiplier: number): void {
    if (!this.container) return
    if (multiplier === 0) throw new Error('Call stop() instead.')

    const velocityX = this.moveSpeed * multiplier
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setVelocityX(velocityX)
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setDragX(0)

    if (velocityX > 0) {
      this.direction = Direction.Right
    } else if (velocityX < 0) {
      this.direction = Direction.Left
    }

    this.idle = false

    this.updateAnimation()
  }

  public stop(planetFrictionModifier: number): void {
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setDragX(
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
    return this.currentHp === 0
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

  protected triggerKnockback(direction: Direction): void {
    if (!this.container) return

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
    if (!this.container) return
    ;(<Phaser.Physics.Arcade.Body>this.container.body).setGravityY(
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
    if (!this.container) return false

    return (<Phaser.Physics.Arcade.Body>this.container.body).blocked.down
  }

  protected isFacingLeft(): boolean {
    return this.direction === Direction.Left
  }
}
