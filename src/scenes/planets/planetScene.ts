import { TheLostFrogGame } from '../..'
import EnemyFactory from '../../factories/enemyFactory'
import Character from '../../gameObjects/character'
import Enemy from '../../gameObjects/enemy'
import Player from '../../gameObjects/player'
import CharacterConfigProvider from '../../providers/characterConfigProvider'
import { Direction, EnemySpawn, HotKeys } from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  public velocityXModifier: number
  public velocityYModifier: number
  protected frog: Player
  protected enemies: Enemy[]
  protected platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  protected hotKeys: HotKeys | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null
  protected music: Phaser.Sound.BaseSound | null
  protected abstract enemyWaves: EnemySpawn[][]
  protected currentEnemyWave: number

  constructor(
    planetSceneName: string,
    gravityXModifier: number,
    gravityYModifier: number
  ) {
    super(planetSceneName)
    this.velocityXModifier = gravityXModifier
    this.velocityYModifier = gravityYModifier
    this.frog = Player.getPlayer(() => {
      this.playerDeath()
    })
    this.platformGroup = null
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.music = null
    this.currentEnemyWave = 0
  }

  public init(): void {
    this.frog = Player.getPlayer(() => {
      this.playerDeath()
    })
    this.platformGroup = null
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.music = null
    this.currentEnemyWave = 0

    this.events.on('enemyKilled', () => {
      this.onEnemyDeath()
    })
  }

  public create(): void {
    this.hotKeys = this.input.keyboard.addKeys(
      'SPACE,A,S,D,E,W,UP,DOWN,LEFT,RIGHT'
    ) as HotKeys

    this.initializeWorld()
    this.initializeStaticAssets()
    this.initializeCharacters()
    this.setPlayerPlatformCollisions()
    this.initializeCamera()
    this.initializeSounds()
    this.initializeTexts()
    this.setDebug(false)
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
      .startFollow(this.frog.getContainer(), false, 0.1, 0.05, 0, 70)
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
      const jumpSound = this.sound.get('jump')
      const doubleJumpSound = this.sound.get('double_jump')

      this.frog.jump(-this.velocityYModifier, jumpSound, doubleJumpSound)
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

  protected setEnemyPlatformCollisions(): void {
    if (!this.platformGroup) return

    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })

    this.physics.add.collider(enemyContainers, this.platformGroup, (enemy) => {
      if (
        (enemy.body as Phaser.Physics.Arcade.Body).touching.left ||
        (enemy.body as Phaser.Physics.Arcade.Body).touching.right
      ) {
        ;(this.findCharacterByContainer(
          this.enemies,
          enemy as Phaser.GameObjects.Container
        ) as Enemy).turnAround()
      }
    })
  }

  protected setPlayerCollisionsWithEnemies(): void {
    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })

    this.physics.add.overlap(
      this.frog.getContainer(),
      enemyContainers,
      (frog, enemy) => {
        const direction =
          enemy.body.position.x >= frog.body.position.x
            ? Direction.Left
            : Direction.Right
        this.frog.handleHit(this, direction, enemy.getData('damage'))
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

  protected setPlayerAttackCollisions(): void {
    const attackSprite = this.frog.getAttackSprite()
    for (const key in this.enemies) {
      this.physics.add.overlap(
        attackSprite,
        this.enemies[key].getContainer(),
        () => {
          if (!attackSprite.visible) return
          if (attackSprite.getData('direction') === Direction.Down) {
            this.frog.bounce(1.25)
          }
          this.enemies[key].handleHit(
            this,
            attackSprite.getData('direction'),
            this.frog.getContainer().getData('damage')
          )
        }
      )
    }
  }

  protected onEnemyDeath(): void {
    if (!this.enemies.every((x) => x.getContainer().body === undefined)) return

    if (this.currentEnemyWave === this.enemyWaves.length - 1) {
      this.goToNextPlanet()
    } else {
      this.startNextWave()
    }
  }

  protected abstract goToNextPlanet(): void

  private setPlayerPlatformCollisions(): void {
    if (!this.platformGroup) return

    this.physics.add.collider([this.frog.getContainer()], this.platformGroup)
  }

  private startNextWave(): void {
    this.spawnEnemies(this.enemyWaves[++this.currentEnemyWave])
  }

  protected spawnEnemies(enemySpawns: EnemySpawn[]): void {
    this.enemies = []

    for (const enemySpawn of enemySpawns) {
      this.enemies.push(
        EnemyFactory.createEnemyByType(
          enemySpawn.type,
          this as PlanetScene,
          enemySpawn.spawnX,
          enemySpawn.spawnY
        )
      )
    }

    this.setEnemyPlatformCollisions()
    this.setPlayerCollisionsWithEnemies()
    this.setPlayerAttackCollisions()
  }

  private initializeStaticAssets(): void {
    this.initializeBackground()
    this.initializePlatforms()
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

  private triggerKeyboardActions(): void {
    this.handleMovement()
    this.handleAttack()
  }

  private initializeCharacters(): void {
    this.frog.init(
      this,
      this.velocityYModifier,
      CharacterConfigProvider.getPlayerConfig()
    )
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
  }

  protected abstract initializePlatforms(): void
  protected abstract initializeBackground(): void
  protected initializeSounds(): void {
    this.sound.add('hit', { volume: 0.1 })
    this.sound.add('hurt', { volume: 0.1 })
    this.sound.add('jump', { volume: 0.1 })
    this.sound.add('double_jump', { volume: 0.1 })

    const soundButton = this.add
      .sprite(790, 120, 'button_sound')
      .setScrollFactor(0, 0)
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.sound.mute = true
          soundButton.setVisible(false)
          mutedButton.setVisible(true)
        },
        this
      )
      .setSize(32, 32)
      .setDisplaySize(32, 32)

    const mutedButton = this.add
      .sprite(790, 120, 'button_mute')
      .setScrollFactor(0, 0)
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.sound.mute = false
          mutedButton.setVisible(false)
          soundButton.setVisible(true)
        },
        this
      )
      .setSize(32, 32)
      .setDisplaySize(32, 32)
      .setVisible(false)
  }

  private setDebug(debug: boolean) {
    if (!debug) {
      return
    }

    this.add.grid(
      this.game.scale.width,
      this.game.scale.height / 2,
      1920,
      640,
      64,
      64,
      0x000000,
      0,
      0x000000,
      1
    )
    for (let x = 0; x < this.game.scale.width / 32; x++) {
      for (let y = 0; y < this.game.scale.height / 64; y++) {
        this.add.text(x * 64, y * 64, `${x}-${y}`)
      }
    }
  }
}
