import { TheLostFrogGame } from '../..'
import Character from '../../gameObjects/character'
import Enemy from '../../gameObjects/enemy'
import Platforms, { PlatformSet } from '../../gameObjects/platforms'
import Player from '../../gameObjects/player'
import { Direction, HotKeys } from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  protected velocityXModifier: number
  protected velocityYModifier: number
  protected platformArrayDictionary: { [key: string]: PlatformSet[] }

  protected frog: Player
  protected enemies: Enemy[]
  protected platforms: Platforms
  protected hotKeys: HotKeys | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null
  protected music: Phaser.Sound.BaseSound | null

  constructor(
    planetSceneName: string,
    gravityXModifier: number,
    gravityYModifier: number,
    platformArrayDictionary: { [key: string]: PlatformSet[] }
  ) {
    super(planetSceneName)
    this.velocityXModifier = gravityXModifier
    this.velocityYModifier = gravityYModifier
    this.platformArrayDictionary = platformArrayDictionary
    this.frog = Player.getPlayer(() => {
      this.playerDeath()
    })
    this.platforms = new Platforms()
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.music = null
  }

  public init(): void {
    this.frog = Player.getPlayer(() => {
      this.playerDeath()
    })
    this.platforms = new Platforms()
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.music = null
  }

  public create(): void {
    this.hotKeys = this.input.keyboard.addKeys(
      'SPACE,A,S,D,E,W,UP,DOWN,LEFT,RIGHT'
    ) as HotKeys

    this.initializeWorld()
    this.initializeStaticAssets()
    this.initializeCharacters()
    this.initializeCamera()
    this.initializeEnemyBehavior()
    this.initializeCollisions()
    this.initializeSounds()
    this.initializeTexts()
  }
  public update(): void {
    this.updateTexts()

    this.triggerKeyboardActions()
    this.frog.updateAnimation()
  }

  protected initializeWorld(): void {
    this.physics.world.setBounds(0, 0, 1920, 640)
    this.physics.world.setBoundsCollision(true, true, false, true)
  }

  protected initializeTexts(): void {
    this.displayHp = this.add
      .text(150, 110, this.frog.displayHp(), {
        font: ' 20px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
    this.displayScore = this.add
      .text(150, 140, (this.game as TheLostFrogGame).displayScore(), {
        font: '20px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
  }

  protected initializeCamera(): void {
    this.cameras.main
      .startFollow(this.frog.getContainer(), false, 0.1, 0.05, 0, 80)
      .setBounds(0, 0, 1920, 640)
      .setZoom(1.4)
  }

  protected updateTexts(): void {
    this.displayHp?.setText(this.frog.displayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
  }

  protected onBodyTouchesWorldBound(
    body: Phaser.Physics.Arcade.Body,
    _touchingUp: boolean,
    _touchingDown: boolean,
    touchingLeft: boolean,
    touchingRight: boolean
  ): void {
    if (!touchingLeft && !touchingRight) {
      return
    }

    const character = this.findCharacterByContainer(
      [this.frog, ...this.enemies],
      body.gameObject as Phaser.GameObjects.Container
    )

    if (character && character instanceof Enemy) {
      ;(character as Enemy).turnAround()
    }
  }

  protected findCharacterByContainer(
    characters: Character[],
    container: Phaser.GameObjects.Container
  ): Character | undefined {
    return characters.find((x) => x.getContainer() === container)
  }

  protected handleMovement(): void {
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

  protected handleAttack(): void {
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

  protected platformCollision(
    enemyContainers: Phaser.GameObjects.Container[]
  ): void {
    this.physics.add.collider(
      [this.frog.getContainer(), ...enemyContainers],
      this.platforms.getStaticGroup()
    )
  }

  protected enemyCollision(
    enemyContainers: Phaser.GameObjects.Container[]
  ): void {
    this.physics.add.overlap(
      this.frog.getContainer(),
      enemyContainers,
      (_frog, enemy) => {
        if (!this.frog.isInvulnerable()) {
          this.frog.takeDamage(enemy.getData('damage'))
          this.frog.makeInvulnerable(this)
        }
      }
    )

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

  protected frogAttackCollision(): void {
    const attackSprite = this.frog.getAttackSprite()
    for (const key in this.enemies) {
      this.physics.add.overlap(
        attackSprite,
        this.enemies[key].getContainer(),
        () => {
          if (!attackSprite.visible || this.enemies[key].isInvulnerable()) {
            return
          }

          this.enemies[key].takeDamage(
            this.frog.getContainer().getData('damage')
          )
          this.enemies[key].makeInvulnerable(this)
        }
      )
    }
  }

  private playerDeath(): void {
    this.physics.pause()
    this.music?.pause()

    this.displayGameOver()
    this.allowRetry()
  }

  private displayGameOver(): void {
    const gameOverText = this.add
      .text(0, 0, 'Game over!', {
        font: '45px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
    gameOverText.setPosition(
      this.game.scale.width / 2 - gameOverText.width / 2,
      this.game.scale.height / 2 - gameOverText.height / 2
    )
    const retryText = this.add
      .text(0, 0, 'Try again?', {
        font: '25px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
    retryText.setPosition(
      this.game.scale.width / 2 - retryText.width / 2,
      this.game.scale.height / 2 - retryText.height / 2 + 50
    )
  }

  private allowRetry(): void {
    this.input.on(
      'pointerdown',
      function (this: PlanetScene) {
        this.scene.restart()
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this
    )
  }

  protected abstract triggerKeyboardActions(): void
  protected abstract initializeEnemyBehavior(): void
  protected abstract initializeStaticAssets(): void
  protected abstract initializeCharacters(): void
  protected abstract initializeCollisions(): void
  protected abstract spawnEnemies(numberOfEnemies: number): void
  protected abstract initializeSounds(): void
}
