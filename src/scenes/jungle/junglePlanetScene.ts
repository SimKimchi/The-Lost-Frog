import 'phaser'
import { PlatformSet } from '../../gameObjects/platforms'
import assetRoutes from './assets'
import { Direction } from '../../util'
import Enemy from '../../gameObjects/enemy'
import PlanetScene from '../PlanetScene'

export default class JunglePlanetScene extends PlanetScene {
  constructor() {
    const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
      key: 'Jungle'
    }
    const platformMatrix: PlatformSet[][] = [
      [
        { x: 400, y: 568, scale: 2 },
        { x: 600, y: 400 },
        { x: 50, y: 250 },
        { x: 750, y: 220 }
      ]
    ]
    super(sceneConfig, 1, 1, platformMatrix)
  }

  public preload(): void {
    this.load.image('sky', assetRoutes.sky)
    this.load.image('platform', assetRoutes.platform)
    this.load.image('bomb', assetRoutes.bomb)
    this.load.spritesheet('dude', assetRoutes.dude, {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public create(): void {
    super.create()

    this.initializeStaticAssets()
    this.initializeCharacters()
    this.initializeCollisions()
  }

  public update(): void {
    super.update()

    this.triggerKeyboardActions()
    this.frog.updateAnimation()
  }

  protected initializeStaticAssets(): void {
    this.add.image(480, 320, 'sky')
    this.add.image(300, 620, 'bomb')
    this.platforms.initializeStaticGroup(this, this.platformMatrix[0])
  }

  protected initializeCharacters(): void {
    this.frog.initializeSprite(this, this.gravityYModifier)
    //this.spawnEnemies()
  }

  protected initializeCollisions(): void {
    this.physics.add.collider(
      this.frog.getSprite(),
      this.platforms.getStaticGroup()
    )
  }

  protected spawnEnemies(numberOfEnemies: number): void {
    for (let i = 0; i < numberOfEnemies; i++) {
      const enemy: Enemy = new Enemy()
      enemy.initializeSprite(this, this.gravityYModifier)
    }
  }

  protected triggerKeyboardActions(): void {
    if (!this.hotKeys) {
      return
    }
    let direction = Direction.Right

    if (this.hotKeys.A.isDown) {
      this.frog.run(-this.gravityXModifier)
      direction = Direction.Left
    } else if (this.hotKeys.D.isDown) {
      this.frog.run(this.gravityXModifier)
      direction = Direction.Right
    } else if (this.hotKeys.S.isDown) {
      direction = Direction.Down
    } else {
      this.frog.run(0)
    }
    if (this.hotKeys.SPACE.isDown) {
      this.frog.jump(-this.gravityYModifier)
      direction = Direction.Up
    }
    if (this.hotKeys.E.isDown) {
      //this.frog.attack(this, direction)
    }
  }
}