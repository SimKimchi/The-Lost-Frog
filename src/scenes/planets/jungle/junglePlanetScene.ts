import 'phaser'
import { PlatformSet } from '../../../gameObjects/platforms'
import { getRandomInt } from '../../../util'
import PlanetScene from '../planetScene'
import CharacterConfigFactory from '../../../factories/characterConfigFactory'
import EnemyFactory from '../../../factories/enemyFactory'

export default class JunglePlanetScene extends PlanetScene {
  constructor() {
    // ! TODO: Tasser ça de d'là
    const platformArrayDictionary: { [key: string]: PlatformSet[] } = {
      platform_h1: [
        { x: 400, y: 568 },
        { x: 464, y: 568 },
        { x: 528, y: 568 },
        { x: 592, y: 568 },
        { x: 600, y: 400 },
        { x: 664, y: 400 },
        { x: 728, y: 400 },
        { x: 50, y: 250 },
        { x: 114, y: 250 },
        { x: 178, y: 250 },
        { x: 750, y: 220 },
        { x: 814, y: 220 }
      ],
      platform_v1: [{ x: 432, y: 534 }],
      platform_v2: [],
      platform_v3: []
    }
    super('JunglePlanetScene', 1, 1, platformArrayDictionary)
  }

  protected initializeStaticAssets(): void {
    this.add.image(0, 0, 'background_5').setOrigin(0).setScrollFactor(0)
    this.add.image(0, 0, 'background_4').setOrigin(0).setScrollFactor(0.25)
    this.add.image(0, 0, 'background_3').setOrigin(0).setScrollFactor(0.5)
    this.add.image(0, 0, 'background_2').setOrigin(0).setScrollFactor(0.75)
    this.add.image(0, 0, 'background_1').setOrigin(0).setScrollFactor(1)

    this.platforms.initializeStaticGroup(
      this,
      this.platformArrayDictionary['platform_h1'],
      'platform_h1'
    )

    // TODO: Initialiser plusieurs groupes de platformes selon l'asset
    // this.platforms.initializeStaticGroup(
    //   this,
    //   this.platformArrayDictionary['platform_v1'],
    //   'platform_v1'
    // )
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
