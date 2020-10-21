import { TheLostFrogGame } from '../..'
import EnemyFactory from '../../factories/enemyFactory'
import Enemy from '../../gameObjects/enemy'
import FlyingEnemy from '../../gameObjects/flyingEnemy'
import Player from '../../gameObjects/player'
import CollisionHelper from '../../helpers/collisionHelper'
import DeathHelper from '../../helpers/deathHelper'
import InputHelper from '../../helpers/inputHelper'
import SoundHelper from '../../helpers/soundHelper'
import CharacterConfigProvider from '../../providers/characterConfigProvider'
import { EnemySpawn, gridHeight, gridWidth } from '../../util'

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
  protected cutSceneGoingOn: boolean

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
    this.cutSceneGoingOn = false
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
    this.collisionHelper = new CollisionHelper(this.physics, this.player)
    this.inputHelper = new InputHelper(
      this.input.keyboard,
      this.collisionHelper
    )
    this.soundHelper = new SoundHelper(this.sound)
    this.deathHelper = new DeathHelper(this)
    this.cutSceneGoingOn = false
  }

  public create(): void {
    this.initializeWorld()
    this.initializeSounds()
    this.initializeBackground()
    this.initializePlatforms()
    this.startCutscene()
    this.setDebug(false)
  }

  public update(): void {
    this.updateTexts()

    if (!this.cutSceneGoingOn) {
      this.inputHelper?.triggerKeyboardActions(
        this.player,
        this.velocityXModifier,
        this.velocityYModifier,
        this.planetFrictionModifier,
        this.platformGroup
      )
    }

    this.enemies
      .filter((enemy) => enemy.constructor.name === 'FlyingEnemy')
      .forEach((enemy) => {
        ;(<FlyingEnemy>enemy).fly(this.player)
      })
  }

  public startNextWave(): void {
    this.spawnEnemies(this.enemyWaves[++this.currentEnemyWave])
  }

  protected initializeWorld(): void {
    this.physics.world.setBounds(0, 0, 1920, 640)
    this.physics.world.setBoundsCollision(true, true, false, true)
  }

  protected abstract initializeBackground(): void
  protected abstract initializePlatforms(): void

  private startCutscene(): void {
    this.cutSceneGoingOn = true

    const cutscene = this.physics.add
      .staticSprite(0, 0, 'cutscene_shuttle')
      .setOrigin(0)

    this.anims.create({
      key: 'cutscene_shuttle_1',
      frames: this.anims.generateFrameNumbers('cutscene_shuttle', {
        start: 0,
        end: 38
      }),
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: 'cutscene_shuttle_2',
      frames: this.anims.generateFrameNumbers('cutscene_shuttle', {
        start: 38,
        end: 55
      }),
      frameRate: 10
    })

    cutscene.anims.play('cutscene_shuttle_1', true).once(
      'animationcomplete',
      () => {
        this.initializeCharacters()
        this.initializeCollisions()
        this.initializePlayerCamera()
        this.initializeTexts()
        this.addMuteButtons()

        this.cutSceneGoingOn = false
        cutscene.anims.play('cutscene_shuttle_2', true)
      },
      this
    )
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

  protected initializePlayerCamera(): void {
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
      .setDepth(3)
    this.displayScore = this.add
      .text(150, 140, (this.game as TheLostFrogGame).displayScore(), {
        font: '20px monospace',
        fill: '#FFFFFF'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
  }

  private updateTexts(): void {
    this.displayHp?.setText(this.player.getDisplayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
  }

  private spawnEnemies(enemySpawns: EnemySpawn[]): void {
    this.enemies = []

    for (const enemySpawn of enemySpawns) {
      this.enemies.push(
        EnemyFactory.createEnemyByType(
          enemySpawn.type,
          this as PlanetScene,
          enemySpawn.spawnTileX * gridWidth,
          enemySpawn.spawnTileY * gridHeight
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
