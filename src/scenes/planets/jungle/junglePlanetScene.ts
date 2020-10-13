import 'phaser'
import { getRandomInt } from '../../../util'
import PlanetScene from '../planetScene'
import CharacterConfigProvider from '../../../providers/characterConfigProvider'
import EnemyFactory from '../../../factories/enemyFactory'
import PlatformGroupFactory from '../../../factories/platformGroupFactory'

export default class JunglePlanetScene extends PlanetScene {
  constructor() {
    super('JunglePlanetScene', 1, 1)
  }

  protected initializeBackground(): void {
    this.add.image(0, 0, 'background_5').setOrigin(0).setScrollFactor(0)
    this.add.image(0, 0, 'background_4').setOrigin(0).setScrollFactor(0.25)
    this.add.image(0, 0, 'background_3').setOrigin(0).setScrollFactor(0.5)
    this.add.image(0, 0, 'background_2').setOrigin(0).setScrollFactor(0.75)
    this.add.image(0, 0, 'background_1').setOrigin(0).setScrollFactor(1)
  }

  protected initializePlatforms(): void {
    this.platformGroup = PlatformGroupFactory.createJunglePlatformGroup(this)
  }

  protected initializeCharacters(): void {
    this.frog.init(
      this,
      this.velocityYModifier,
      CharacterConfigProvider.getPlayerConfig()
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
