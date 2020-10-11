import { TheLostFrogGame } from '..'
import Enemy from '../gameObjects/enemy'
import Platforms, { PlatformSet } from '../gameObjects/platforms'
import Player from '../gameObjects/player'
import { HotKeys } from '../util'

export default abstract class PlanetScene extends Phaser.Scene {
  protected gravityXModifier: number
  protected gravityYModifier: number
  protected platformMatrix: PlatformSet[][]

  protected frog: Player
  protected enemies: Enemy[]
  protected platforms: Platforms
  protected hotKeys: HotKeys | null
  protected displayScore: Phaser.GameObjects.Text | null
  protected displayHp: Phaser.GameObjects.Text | null

  constructor(
    sceneConfig: Phaser.Types.Scenes.SettingsConfig,
    gravityXModifier: number,
    gravityYModifier: number,
    platformMatrix: PlatformSet[][]
  ) {
    super(sceneConfig)
    this.gravityXModifier = gravityXModifier
    this.gravityYModifier = gravityYModifier
    this.platformMatrix = platformMatrix
    this.frog = new Player()
    this.platforms = new Platforms()
    this.hotKeys = null
    this.displayScore = null
    this.displayHp = null
    this.enemies = []
  }

  public abstract preload(): void
  public create(): void {
    this.hotKeys = this.input.keyboard.addKeys('SPACE,A,S,D,E') as HotKeys

    this.initializeTexts()
  }
  public update(): void {
    this.updateTexts()
  }

  protected initializeTexts(): void {
    this.displayScore = this.add.text(
      25,
      25,
      (this.game as TheLostFrogGame).displayScore(),
      {
        fontFamiy: 'Consolas'
      }
    )
    this.displayHp = this.add.text(25, 45, this.frog.displayHp(), {
      fontFamiy: 'Consolas'
    })
  }

  protected updateTexts(): void {
    this.displayHp?.setText(this.frog.displayHp())
    this.displayScore?.setText((this.game as TheLostFrogGame).displayScore())
  }

  protected abstract triggerKeyboardActions(): void
  protected abstract initializeStaticAssets(): void
  protected abstract initializeCharacters(): void
  protected abstract initializeCollisions(): void
  protected abstract spawnEnemies(numberOfEnemies: number): void
}
