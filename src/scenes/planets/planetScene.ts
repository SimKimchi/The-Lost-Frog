import { TheLostFrogGame } from '../..'
import EnemyFactory from '../../factories/enemyFactory'
import Enemy from '../../gameObjects/enemy'
import Player from '../../gameObjects/player'
import CollisionHelper from '../../helpers/collisionHelper'
import DeathHelper from '../../helpers/deathHelper'
import InputHelper from '../../helpers/inputHelper'
import SoundHelper from '../../helpers/soundHelper'
import UiHelper from '../../helpers/uiHelper'
import CharacterConfigProvider from '../../providers/characterConfigProvider'
import { EnemySpawn } from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  public velocityXModifier: number
  public velocityYModifier: number
  public planetFrictionModifier: number
  public enemies: Enemy[]
  public abstract enemyWaves: EnemySpawn[][]
  public currentEnemyWave: number
  public soundHelper: SoundHelper | null
  protected player: Player
  protected platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null
  protected inputHelper: InputHelper | null
  protected collisionHelper: CollisionHelper | null
  protected deathHelper: DeathHelper | null
  protected uiHelper: UiHelper | null

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
      this.deathHelper?.playerDeath()
    })
    this.platformGroup = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.currentEnemyWave = 0
    this.inputHelper = null
    this.soundHelper = null
    this.collisionHelper = null
    this.deathHelper = null
    this.uiHelper = null
  }

  public abstract goToNextPlanet(): void

  public init(): void {
    this.player = Player.getPlayer(this, () => {
      this.deathHelper?.playerDeath()
    })
    this.platformGroup = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
    this.currentEnemyWave = 0
    this.inputHelper = new InputHelper(this.input.keyboard)
    this.soundHelper = new SoundHelper(this.sound)
    this.collisionHelper = new CollisionHelper(this.physics, this.player)
    this.deathHelper = new DeathHelper(this)
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

  public startNextWave(): void {
    this.spawnEnemies(this.enemyWaves[++this.currentEnemyWave])
  }

  protected abstract initializeBackground(): void
  protected abstract initializePlatforms(): void

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
      .text(150, 110, this.player.displayHp(), {
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
    this.displayHp?.setText(this.player.displayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
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
