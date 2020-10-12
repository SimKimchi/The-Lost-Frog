import 'phaser'
import { PlatformSet } from '../../../gameObjects/platforms'

import { Direction, getRandomInt } from '../../../util'
import PlanetScene from '../planetScene'
import CharacterConfigFatory from '../../../factories/characterConfigFactory'
import EnemyFatory from '../../../factories/enemyFactory'

export default class JunglePlanetScene extends PlanetScene {
  constructor() {
    const platformMatrix: PlatformSet[][] = [
      [
        { x: 400, y: 568 },
        { x: 600, y: 400 },
        { x: 50, y: 250 },
        { x: 750, y: 220 }
      ]
    ]
    super('JunglePlanetScene', 1, 1, platformMatrix)
  }

  public create(): void {
    super.create()

    this.initializeStaticAssets()
    this.initializeCharacters()
    this.initializeEnemyBehavior()
    this.initializeCollisions()
    this.initializeSounds()
  }

  public update(): void {
    super.update()

    this.triggerKeyboardActions()
    this.frog.updateAnimation()
  }

  protected initializeStaticAssets(): void {
    this.add.image(480, 320, 'sky').setDisplaySize(960, 640).setDepth(-1)
    this.platforms.initializeStaticGroup(this, this.platformMatrix[0])
  }

  protected initializeCharacters(): void {
    this.frog.init(
      this,
      this.velocityYModifier,
      CharacterConfigFatory.getPlayerConfig()
    )
    this.spawnEnemies(5)
  }

  protected initializeEnemyBehavior(): void {
    for (const enemy of this.enemies) {
      const direction = getRandomInt(2)
      if (direction === 1) {
        enemy.run(-this.velocityXModifier)
      } else {
        enemy.run(this.velocityXModifier)
      }
      enemy.updateAnimation()
    }
  }

  protected initializeCollisions(): void {
    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })
    this.platformCollision(enemyContainers)
    this.enemyCollision(enemyContainers)
    this.frogAttackCollision()
  }

  protected spawnEnemies(numberOfEnemies: number): void {
    for (let i = 0; i < numberOfEnemies; i++) {
      const spawnX = getRandomInt(900)
      const spawnY = getRandomInt(300)
      this.enemies.push(
        EnemyFatory.createLizard(this, this.velocityYModifier, spawnX, spawnY)
      )
    }
  }

  protected triggerKeyboardActions(): void {
    this.handleMovement()
    this.handleAttack()
  }

  protected initializeSounds(): void {
    this.game.sound
      .add('volcanoTheme', {
        volume: 0.6,
        loop: true
      })
      .play()
  }

  private platformCollision(
    enemyContainers: Phaser.GameObjects.Container[]
  ): void {
    this.physics.add.collider(
      [this.frog.getContainer(), ...enemyContainers],
      this.platforms.getStaticGroup()
    )
  }

  private enemyCollision(
    enemyContainers: Phaser.GameObjects.Container[]
  ): void {
    this.physics.add.overlap(
      this.frog.getContainer(),
      enemyContainers,
      (_frog, enemy) => {
        if (!this.frog.getIsInvulnerable()) {
          this.frog.takeDamage(enemy.getData('damage'))
          this.frog.invulnerable(this)
        }
      }
    )

    this.physics.world.setBoundsCollision(true, true, false, true)

    this.physics.world.on(
      'worldbounds',
      (
        body: Phaser.Physics.Arcade.Body,
        touchingUp: boolean,
        touchingDown: boolean,
        touchingLeft: boolean,
        touchingRight: boolean
      ) =>
        this.onBodyTouchesWorldBound(
          body,
          touchingUp,
          touchingDown,
          touchingLeft,
          touchingRight
        )
    )
  }

  private frogAttackCollision(): void {
    for (const key in this.enemies) {
      this.physics.add.overlap(
        this.frog.getAttackSprite(),
        this.enemies[key].getContainer(),
        (frog) => {
          if (this.frog.getAttackSprite().visible) {
            this.enemies[key].takeDamage(frog.getData('damage'))
            this.enemies[key].getSprite().setTint(0xff0000)
            this.time.addEvent({
              delay: 200,
              callback: () => this.enemies[key].getSprite().clearTint()
            })
          }
        }
      )
    }
  }

  private handleMovement(): void {
    if (!this.hotKeys) return

    if (this.hotKeys.A.isDown) {
      this.frog.run(-this.velocityXModifier)
    } else if (this.hotKeys.D.isDown) {
      this.frog.run(this.velocityXModifier)
    } else {
      this.frog.run(0)
    }
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
      this.frog.jump(-this.velocityYModifier)
    }
  }

  private handleAttack(): void {
    if (!this.hotKeys) return

    let direction = Direction.Neutral
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.UP)) {
      direction = Direction.Up
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.DOWN)) {
      direction = Direction.Down
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.LEFT)) {
      direction = Direction.Left
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.RIGHT)) {
      direction = Direction.Right
    }
    if (direction !== Direction.Neutral) {
      this.frog.attack(this, direction)
    }
  }
}
