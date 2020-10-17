import { TheLostFrogGame } from '../..'
import EnemyFactory from '../../factories/enemyFactory'
import Enemy from '../../gameObjects/enemy'
import Player from '../../gameObjects/player'
import CollisionHelper from '../../helpers/collisionHelper'
import InputHelper from '../../helpers/inputHelper'
import SoundHelper from '../../helpers/soundHelper'
import CharacterConfigProvider from '../../providers/characterConfigProvider'
import { EnemySpawn } from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  public velocityXModifier: number
  public velocityYModifier: number
  public planetFrictionModifier: number
  protected player: Player
  protected enemies: Enemy[]
  protected platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null
  protected abstract enemyWaves: EnemySpawn[][]
  protected currentEnemyWave: number
  protected inputHelper: InputHelper | null
  public soundHelper: SoundHelper | null
  protected collisionHelper: CollisionHelper | null

  constructor(
    planetSceneName: string,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFriction: number
  ) {
    super(planetSceneName)
    this.velocityXModifier = velocityXModifier
    this.velocityYModifier = velocityYModifier
    this.planetFrictionModifier = planetFriction
    this.player = Player.getPlayer(this, () => {
      this.playerDeath()
    })
    this.platformGroup = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.currentEnemyWave = 0
    this.inputHelper = null
    this.soundHelper = null
    this.collisionHelper = null
  }

  public init(): void {
    this.player = Player.getPlayer(this, () => {
      this.playerDeath()
    })
    this.platformGroup = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.currentEnemyWave = 0
    this.inputHelper = new InputHelper(this.input.keyboard)
    this.soundHelper = new SoundHelper(this.sound)
    this.collisionHelper = new CollisionHelper(this.physics, this.player)

    this.events.on('enemyKilled', this.onEnemyDeath, this)
  }

  public create(): void {
    this.initializeWorld()
    this.initializeBackground()
    this.initializePlatforms()
    this.initializeCharacters()
    this.initializeCollisions()
    this.initializeCamera()
    this.initializeSounds()
    this.initializeTexts()
    this.addMuteButtons()
    this.setDebug(false)
  }
  public update(): void {
    this.updateTexts()

    this.inputHelper?.triggerKeyboardActions(
      this.player,
      this.velocityXModifier,
      this.velocityYModifier,
      this.planetFrictionModifier
    )
    this.player.updateAnimation()
  }

  protected abstract initializeBackground(): void
  protected abstract initializePlatforms(): void
  protected abstract goToNextPlanet(): void

  protected initializeWorld(): void {
    this.physics.world.setBounds(0, 0, 1920, 640)
    this.physics.world.setBoundsCollision(true, true, false, true)
  }

  protected initializeCharacters(): void {
    this.player.init(
      this.velocityYModifier,
      CharacterConfigProvider.getPlayerConfig()
    )
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
  }

  protected initializeCollisions(): void {
    this.collisionHelper?.initializeCollisions(this.platformGroup)
  }

  protected initializeCamera(): void {
    this.cameras.main
      .startFollow(this.player.getContainer(), false, 0.1, 0.05, 0, 70)
      .setBounds(0, 0, 1920, 640)
      .setZoom(1.4)
  }

  protected initializeSounds(): void {
    this.soundHelper?.addGenericSounds()
  }

  protected initializeTexts(): void {
    this.displayHp = this.add
      .text(150, 110, this.player.getDisplayHp(), {
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

  private updateTexts(): void {
    this.displayHp?.setText(this.player.getDisplayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
  }

  private onEnemyDeath(): void {
    if (!this.enemies.every((x) => x.getContainer().body === undefined)) return

    if (this.currentEnemyWave === this.enemyWaves.length - 1) {
      this.goToNextPlanet()
    } else {
      this.startNextWave()
    }
  }

  private startNextWave(): void {
    this.spawnEnemies(this.enemyWaves[++this.currentEnemyWave])
  }

  private spawnEnemies(enemySpawns: EnemySpawn[]): void {
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

    this.collisionHelper?.setCollisionsAfterEnemySpawn(
      this.platformGroup,
      this.enemies
    )
  }

  private playerDeath(): void {
    this.physics.pause()
    this.soundHelper?.pauseMusic()

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
        this.scene.restart() // TODO tester this.restart
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this
    )
    this.input.keyboard.on(
      'keydown',
      function (this: PlanetScene) {
        this.scene.restart() // TODO tester this.restart
        ;(this.game as TheLostFrogGame).resetScore()
      },
      this
    )
  }

  private addMuteButtons(): void {
    const soundButton = this.add
      .sprite(790, 120, 'button_sound')
      .setScrollFactor(0, 0)
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.soundHelper?.mute()
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
          this.soundHelper?.unmute()
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
