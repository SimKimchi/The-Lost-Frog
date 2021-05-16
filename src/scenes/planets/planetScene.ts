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
import Clock from 'phaser3-rex-plugins/plugins/clock.js'
import {
  PlayerSpawn,
  EnemySpawn,
  gridHeight,
  gridWidth,
  ItemSpawn,
  msToTime,
  LevelResultClockMillisecondsMapping,
  getLevelResult,
  LevelResult
} from '../../util'

export default abstract class PlanetScene extends Phaser.Scene {
  public velocityXModifier: number
  public velocityYModifier: number
  public planetFrictionModifier: number
  public currentEnemies: Enemy[]
  public abstract enemyWaves: EnemySpawn[][]
  public currentItems: Phaser.Physics.Arcade.Sprite[]
  public abstract itemWaves: ItemSpawn[][]
  public currentEnemyWave: number
  public soundHelper: SoundHelper | null
  public cutSceneGoingOn: boolean
  protected player: Player
  protected abstract levelResultClockMillisecondsMapping: LevelResultClockMillisecondsMapping
  protected clock: typeof Clock | null
  protected currentPlatformLayout: Phaser.Physics.Arcade.StaticGroup | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null
  protected displayWave: Phaser.GameObjects.Text | null
  protected displayEnemies: Phaser.GameObjects.Text | null
  protected displayClock: Phaser.GameObjects.Text | null
  protected inputHelper: InputHelper | null
  protected collisionHelper: CollisionHelper | null
  protected deathHelper: DeathHelper | null

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
    this.displayWave = null
    this.displayEnemies = null
    this.displayClock = null
    this.currentEnemies = []
    this.currentItems = []
    this.currentEnemyWave = 0
    this.inputHelper = null
    this.soundHelper = null
    this.collisionHelper = null
    this.deathHelper = null
    this.cutSceneGoingOn = false
    this.clock = null
  }

  public init(): void {
    this.player = Player.getPlayer(this, () => {
      this.player.setDead()
      this.deathHelper?.playerDeath()
    })
    this.currentPlatformLayout = null
    this.displayScore = null
    this.displayHp = null
    this.displayWave = null
    this.displayEnemies = null
    this.displayClock = null
    this.currentEnemies = []
    this.currentItems = []
    this.currentEnemyWave = 0
    this.collisionHelper = new CollisionHelper(this.physics, this.player)
    this.inputHelper = new InputHelper(
      this.input.keyboard,
      this.collisionHelper
    )
    this.soundHelper = new SoundHelper(this.sound)
    this.deathHelper = new DeathHelper(this)
    this.cutSceneGoingOn = false
    this.clock = new Clock(this, {})
    this.initializeItemAnim()
  }

  public create(): void {
    this.initializeWorld()
    this.initializeSounds()
    this.initializeBackground()

    this.spawnPlatforms()
    this.initializePlayer()
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
    this.collisionHelper?.setEnemyPlatformCollisions(
      this.currentPlatformLayout,
      this.currentEnemies
    )
    this.collisionHelper?.setWorldCollisionListener(this.currentEnemies)
    this.spawnItems(this.itemWaves[this.currentEnemyWave])

    this.startCutscene()
    this.setDebug(false)
  }

  private finishSceneCreation(): void {
    this.player.show()
    this.collisionHelper?.setPlayerCollisionsWithEnemies(this.currentEnemies)
    this.collisionHelper?.setPlayerCollisionsWithItems(this.currentItems)
    this.collisionHelper?.setPlayerAttackCollisions(this.currentEnemies)

    this.collisionHelper?.setPlayerPlatformCollisions(
      this.currentPlatformLayout
    )

    this.initializePlayerCamera()
    this.initializeTexts()
    this.addMuteButtons()
    this.clock.start()
  }

  public update(): void {
    this.updateTexts()

    if (this.cutSceneGoingOn) return

    this.inputHelper?.triggerKeyboardActions(
      this.player,
      this.velocityXModifier,
      this.velocityYModifier,
      this.planetFrictionModifier,
      this.currentPlatformLayout
    )

    this.currentEnemies
      .filter((enemy) => enemy instanceof FlyingEnemy)
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
      .startFollow(this.player.container, false, 0.1, 0.05, 0, 50)
      .setBounds(0, 0, 1920, 640)
      .setZoom(1.4)
  }

  protected initializeSounds(): void {
    this.soundHelper?.addGenericSounds()
  }

  protected initializeTexts(): void {
    this.add
      .text(150, 110, 'Health: ', {
        font: '23px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
    this.displayHp = this.add
      .text(225, 110, this.player.getDisplayHp(), {
        font: '23px PlayMeGames',
        color: 'lightgreen'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
    this.displayScore = this.add
      .text(150, 135, (this.game as TheLostFrogGame).displayScore(), {
        font: '16px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
    this.displayWave = this.add
      .text(150, 155, `Region: 1 / ${this.enemyWaves.length}`, {
        font: '16px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
    this.displayEnemies = this.add
      .text(150, 175, `Enemies remaining: ${this.currentEnemies.length}`, {
        font: '16px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
    this.displayClock = this.add
      .text(150, 195, `Time elapsed: ${this.clockTime}`, {
        font: '16px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setDepth(3)
      .setStroke('black', 2)
  }

  private updateTexts(): void {
    this.displayHp?.setText(this.player.getDisplayHp())
    this.displayHp?.setColor(this.getDisplayHpColor())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
    this.displayWave?.setText(
      `Region: ${this.currentEnemyWave + 1} / ${this.enemyWaves.length}`
    )

    const enemiesRemaining: number = this.currentEnemies.filter(
      (el) => !el.isDead()
    ).length
    if (enemiesRemaining > 1) {
      this.displayEnemies?.setText(`Enemies remaining: ${enemiesRemaining}`)
    } else if (enemiesRemaining === 1) {
      this.displayEnemies?.setText('One enemy remains')
    } else {
      this.displayEnemies?.setText("They're all dead")
    }
    this.displayClock?.setText(`Time elapsed: ${msToTime(this.clockTime)}`)
  }

  private getDisplayHpColor(): string {
    const playerCurrentHp: number = this.player.currentHp

    if (playerCurrentHp > 6) {
      return 'lightgreen'
    }

    if (playerCurrentHp > 3) {
      return 'yellow'
    }

    return '#ff6961'
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

  private spawnItems(itemSpawns: ItemSpawn[]): void {
    this.currentItems = []

    for (const itemSpawn of itemSpawns) {
      const itemSprite = this.physics.add.staticSprite(
        itemSpawn.spawnTileX * 64 + 32,
        itemSpawn.spawnTileY * 64 + 32,
        'item_heal'
      )
      itemSprite.anims.play('item_heal', true)
      itemSprite.setDisplaySize(64, 64)

      this.currentItems.push(itemSprite)
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
      .setDepth(2)

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
      .setDepth(2)
  }

  public completeWave(): void {
    this.pauseClock()
    this.cameras.main
      .fadeOut(1500, 0, 0, 0)
      .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.startNextWave()
      })
  }

  private startNextWave(): void {
    if (!this.currentEnemies.every((x) => x.container.body === undefined))
      return

    this.cutSceneGoingOn = true
    this.currentEnemyWave++

    this.player.stopWallCling()
    this.removeCurrentPlatforms()
    this.spawnPlatforms()
    this.collisionHelper?.removeWorldCollisionsListener()
    this.spawnEnemies(this.enemyWaves[this.currentEnemyWave])
    this.spawnItems(this.itemWaves[this.currentEnemyWave])
    this.repositionPlayer()

    this.collisionHelper?.setNextWaveCollisions(
      this.currentPlatformLayout,
      this.currentEnemies,
      this.currentItems
    )

    this.collisionHelper?.setWorldCollisionListener(this.currentEnemies)

    this.cameras.main.fadeIn(1500, 0, 0, 0)
    this.cutSceneGoingOn = false
    this.resumeClock()
  }

  private repositionPlayer(): void {
    const spawn: PlayerSpawn = CharacterSpawnConfigProvider.getPlayerSpawn(
      this.currentEnemyWave
    )
    const spawnX = spawn.spawnTileX * gridWidth + (spawn.spawnOffsetX ?? 0)
    const spawnY = spawn.spawnTileY * gridHeight + (spawn.spawnOffsetY ?? 0)

    this.player.container.setPosition(spawnX, spawnY)
    this.player.lastJumpCoordinates = { x: spawnX, y: spawnY }
  }

  public completeLevel(): void {
    if (!this.soundHelper) return

    this.cutSceneGoingOn = true
    this.physics.pause()
    this.pauseClock()
    this.soundHelper.stopAllSounds()
    this.soundHelper.setMusic('transition_theme', 0.3, false)

    const levelResult = getLevelResult(
      this.clockTime,
      this.levelResultClockMillisecondsMapping
    )

    const healthBonusScore: number = this.player.currentHp * 50
    this.displayEndLevelResult(levelResult, healthBonusScore)
    ;(this.game as TheLostFrogGame).increaseScore(levelResult.levelScore)
    ;(this.game as TheLostFrogGame).increaseScore(healthBonusScore)

    this.input.once(
      'pointerdown',
      function (this: PlanetScene) {
        this.cameras.main
          .fadeOut(1500, 0, 0, 0)
          .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.goToNextPlanet()
          })
      },
      this
    )
    this.input.keyboard.once(
      'keydown',
      function (this: PlanetScene) {
        if (!this.inputHelper?.enterIsDown()) return

        this.cameras.main
          .fadeOut(1500, 0, 0, 0)
          .once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.goToNextPlanet()
          })
      },
      this
    )
  }

  private displayEndLevelResult(
    levelResult: LevelResult,
    healthBonusScore: number
  ): void {
    const currentScore: number = (this.game as TheLostFrogGame).highScore

    const titleText = this.add
      .text(0, 0, 'Planet clear!', {
        font: '50px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 4)
      .setDepth(3)
    titleText.setPosition(
      this.game.scale.width / 2 - titleText.width / 2,
      this.game.scale.height / 2 - titleText.height / 2 - 75
    )

    const scoreText = this.add
      .text(0, 0, `Score: ${currentScore}`, {
        font: '18px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    scoreText.setPosition(
      this.game.scale.width / 2 - scoreText.width / 2,
      this.game.scale.height / 2 - scoreText.height / 2
    )

    const timeScoreText = this.add
      .text(0, 0, `Time bonus: +${levelResult.levelScore}`, {
        font: '18px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    timeScoreText.setPosition(
      this.game.scale.width / 2 - timeScoreText.width / 2,
      this.game.scale.height / 2 - timeScoreText.height / 2 + 18
    )

    const healthScoreText = this.add
      .text(0, 0, `Health bonus: +${healthBonusScore}`, {
        font: '18px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    healthScoreText.setPosition(
      this.game.scale.width / 2 - healthScoreText.width / 2,
      this.game.scale.height / 2 - healthScoreText.height / 2 + 36
    )

    const totalScoreText = this.add
      .text(
        0,
        0,
        `Total: ${currentScore + levelResult.levelScore + healthBonusScore}`,
        {
          font: '18px PlayMeGames',
          color: 'white'
        }
      )
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    totalScoreText.setPosition(
      this.game.scale.width / 2 - totalScoreText.width / 2,
      this.game.scale.height / 2 - totalScoreText.height / 2 + 54
    )

    const appreciationText = this.add
      .text(0, 0, `Appreciation: ${levelResult.levelAppreciation}`, {
        font: '25px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    appreciationText.setPosition(
      this.game.scale.width / 2 - appreciationText.width / 2,
      this.game.scale.height / 2 - appreciationText.height / 2 + 100
    )

    const continueText = this.add
      .text(0, 0, 'Click or press Enter to continue...', {
        font: '18px PlayMeGames',
        color: 'white'
      })
      .setScrollFactor(0, 0)
      .setStroke('black', 3)
      .setDepth(3)
    continueText.setPosition(
      this.game.scale.width / 2 - continueText.width / 2,
      this.game.scale.height / 2 - continueText.height / 2 + 150
    )
  }

  public abstract goToNextPlanet(): void

  public pauseClock(): void {
    this.clock.pause()
  }

  public resumeClock(): void {
    this.clock.resume()
  }

  public get clockTime(): number {
    return this.clock.now
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

    this.soundHelper!.mute()
  }

  private removeCurrentPlatforms(): void {
    this.collisionHelper?.removePlayerVsPlatformCollider()
    this.collisionHelper?.removeEnemyVsPlatformCollider()

    this.currentPlatformLayout?.destroy(true)
  }

  private initializeItemAnim(): void {
    this.anims.create({
      key: 'item_heal',
      frames: this.anims.generateFrameNumbers('item_heal', {
        start: 0,
        end: 16
      }),
      frameRate: 16,
      repeat: -1
    })
  }
}
