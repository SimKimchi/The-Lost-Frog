import 'phaser'
import { PlatformSet } from '../../../gameObjects/platforms'
import { getRandomInt } from '../../../util'
import PlanetScene from '../planetScene'
import CharacterConfigFactory from '../../../factories/characterConfigFactory'
import EnemyFactory from '../../../factories/enemyFactory'

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

  protected initializeStaticAssets(): void {
    this.add.image(480, 320, 'sky').setDisplaySize(960, 640).setDepth(-1)
    this.platforms.initializeStaticGroup(this, this.platformMatrix[0])
  }

  protected initializeCharacters(): void {
    this.frog.init(
      this,
      this.velocityYModifier,
      CharacterConfigFactory.getPlayerConfig()
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
        EnemyFactory.createLizard(this, this.velocityYModifier, spawnX, spawnY)
      )
    }
  }

  protected triggerKeyboardActions(): void {
    this.handleMovement()
    this.handleAttack()
  }

  protected initializeSounds(): void {
    this.music = this.game.sound.add('volcanoTheme', {
      volume: 0.6,
      loop: true
    })

    this.music.play()
  }
}
