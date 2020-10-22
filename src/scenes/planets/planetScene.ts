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
import CharacterSpawnConfigProvider from '../../providers/characterSpawnConfigProvider'
import { PlayerSpawn, EnemySpawn, gridHeight, gridWidth } from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  public velocityXModifier: number
  public velocityYModifier: number
  public planetFrictionModifier: number
  public currentEnemies: Enemy[]
  public abstract enemyWaves: EnemySpawn[][]
  public currentEnemyWave: number
  public soundHelper: SoundHelper | null
  protected player: Player
  protected currentPlatformLayout: Phaser.Physics.Arcade.StaticGroup | null
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
    this.currentPlatformLayout = null
    this.displayScore = null
    this.displayHp = null
    this.currentEnemies = []
    this.currentEnemyWave = 0
    this.inputHelper = null
    this.soundHelper = null
    this.collisionHelper = null
    this.deathHelper = null
    this.cutSceneGoingOn = false
  }

  public init(): void {
    this.player = Player.getPlayer(this, () => {
      this.player.setDead()
      this.deathHelper?.playerDeath()
    })
    this.currentPlatformLayout = null
    this.displayScore = null
    this.displayHp = null
    this.currentEnemies = []
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

    this.spawnPlatforms()
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
    this.collisionHelper?.setEnemyPlatformCollisions(
      this.currentPlatformLayout,
      this.currentEnemies
    )
    this.collisionHelper?.setEnemyWorldCollisions(this.currentEnemies)

    this.startCutscene()
    this.setDebug(false)
  }

  private finishSceneCreation(): void {
    this.initializePlayer()

    this.collisionHelper?.setPlayerCollisionsWithEnemies(this.currentEnemies)
    this.collisionHelper?.setPlayerAttackCollisions(this.currentEnemies)

    this.collisionHelper?.setPlayerPlatformCollisions(
      this.currentPlatformLayout
    )

    this.initializePlayerCamera()
    this.initializeTexts()
    this.addMuteButtons()
  }

  public update(): void {
    if (this.cutSceneGoingOn) return

    this.updateTexts()

    this.inputHelper?.triggerKeyboardActions(
      this.player,
      this.velocityXModifier,
      this.velocityYModifier,
      this.planetFrictionModifier,
      this.currentPlatformLayout
    )

    this.currentEnemies
      .filter((enemy) => enemy.constructor.name === 'FlyingEnemy')
      .forEach((enemy) => {
        ;(<FlyingEnemy>enemy).fly(this.player)
      })
  }

  protected initializeWorld(): void {
    this.physics.world.setBounds(0, 0, 1920, 640)
    this.physics.world.setBoundsCollision(true, true, false, true)
  }

  protected abstract initializeBackground(): void
  protected abstract spawnPlatforms(): void

  private startCutscene(): void {
    if (!this.soundHelper) return

    this.cutSceneGoingOn = true

    const cutscene = this.physics.add
      .staticSprite(0, 0, 'cutscene_shuttle')
      .setOrigin(0)

    this.soundHelper.playShuttleSound()

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

    this.cameras.main.fadeIn(1500, 0, 0, 0)

    cutscene.anims.play('cutscene_shuttle_1', true).once(
      'animationcomplete',
      () => {
        this.finishSceneCreation()

        this.cutSceneGoingOn = false
        cutscene.anims.play('cutscene_shuttle_2', true)
      },
      this
    )
  }

  protected initializePlayer(): void {
    this.player.init(
      this.velocityYModifier,
      CharacterConfigProvider.getPlayerConfig()
    )
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
    this.currentEnemies = []

    for (const enemySpawn of enemySpawns) {
      this.currentEnemies.push(
        EnemyFactory.createEnemyByType(
          enemySpawn.type,
          this as PlanetScene,
          enemySpawn.spawnTileX * gridWidth,
          enemySpawn.spawnTileY * gridHeight
        )
      )
    }
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

  public completeWave(): void {
    this.cameras.main
      .fadeOut(1500, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.startNextWave()
      })
  }

  private startNextWave(): void {
    this.currentEnemyWave++

    this.removeCurrentPlatforms()
    this.spawnPlatforms()
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
    this.repositionPlayer()

    this.collisionHelper?.setNextWaveCollisions(
      this.currentPlatformLayout,
      this.currentEnemies
    )

    this.cameras.main.fadeIn(1500, 0, 0, 0)
  }

  private repositionPlayer(): void {
    const spawn: PlayerSpawn = CharacterSpawnConfigProvider.getPlayerSpawn(
      this.currentEnemyWave
    )
    this.player
      .getContainer()
      .setPosition(
        spawn.spawnTileX * gridWidth + (spawn.spawnOffsetX ?? 0),
        spawn.spawnTileY * gridHeight + (spawn.spawnOffsetY ?? 0)
      )
  }

  public completeLevel(): void {
    if (!this.soundHelper) return

    this.soundHelper.fadeMusicOut(this)

    this.cameras.main
      .fadeOut(1500, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.goToNextPlanet()
      })
  }

  public abstract goToNextPlanet(): void

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

  private removeCurrentPlatforms(): void {
    this.collisionHelper?.removePlayerVsPlatformCollider()
    this.collisionHelper?.removeEnemyVsPlatformCollider()

    this.currentPlatformLayout?.destroy(true)
  }
}
