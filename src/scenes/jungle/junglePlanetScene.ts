import 'phaser'
import { PlatformSet } from '../../gameObjects/platforms'
import assets from './assets'
import { Direction, getRandomInt } from '../../util'
import PlanetScene from '../PlanetScene'
import CharacterConfigFatory from '../../factories/characterConfigFactory'
import EnemyFatory from '../../factories/enemyFactory'
import Character from '../../gameObjects/character'
import Enemy from '../../gameObjects/enemy'

export default class JunglePlanetScene extends PlanetScene {
  constructor() {
    const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
      key: 'Jungle'
    }
    const platformMatrix: PlatformSet[][] = [
      [
        { x: 400, y: 568 },
        { x: 600, y: 400 },
        { x: 50, y: 250 },
        { x: 750, y: 220 }
      ]
    ]
    super(sceneConfig, 1, 1, platformMatrix)
  }

  public preload(): void {
    this.load.image('sky', assets.images.sky)
    this.load.image('platform', assets.images.platform)
    this.load.image('bomb', assets.images.bomb)
    this.load.spritesheet('dude', assets.images.dude, {
      frameWidth: 32,
      frameHeight: 48
    })
  }

  public create(): void {
    super.create()

    this.initializeStaticAssets()
    this.initializeCharacters()
    this.initializeEnemyBehavior()
    this.initializeCollisions()

    this.physics.world.setBoundsCollision(true, true, false, true)

    this.physics.world.on(
      'worldbounds',
      (
        body: Phaser.Physics.Arcade.Body,
        touchingUp: boolean,
        touchingDown: boolean,
        touchingLeft: boolean,
        touchingRight: boolean
      ) =>
        this.onBodyTouchesWorldBound(
          body,
          touchingUp,
          touchingDown,
          touchingLeft,
          touchingRight
        )
    )

    this.playMusic()
  }

  public update(): void {
    super.update()

    this.triggerKeyboardActions()
    this.frog.updateAnimation()
  }

  protected initializeStaticAssets(): void {
    this.add.image(480, 320, 'sky').setDepth(-1)
    this.add.image(300, 620, 'bomb')
    this.platforms.initializeStaticGroup(this, this.platformMatrix[0])
  }

  protected initializeCharacters(): void {
    this.frog.init(
      this,
      this.velocityYModifier,
      CharacterConfigFatory.getPlayerConfig()
    )
    this.spawnEnemies(5)
  }

  protected initializeCollisions(): void {
    const enemyContainers = this.enemies.map((enemy) => {
      return enemy.getContainer()
    })
    this.physics.add.collider(
      [this.frog.getContainer(), ...enemyContainers],
      this.platforms.getStaticGroup()
    )
    this.physics.add.overlap(
      this.frog.getContainer(),
      enemyContainers,
      (_frog, enemy) => {
        this.frog.takeDamage(enemy.getData('damage'))
      }
    )
  }

  protected spawnEnemies(numberOfEnemies: number): void {
    for (let i = 0; i < numberOfEnemies; i++) {
      const spawnX = getRandomInt(900)
      const spawnY = getRandomInt(300)
      this.enemies.push(
        EnemyFatory.createLizard(this, this.velocityYModifier, spawnX, spawnY)
      )
    }
  }

  protected triggerKeyboardActions(): void {
    if (!this.hotKeys) {
      return
    }
    let direction = Direction.Right

    if (this.hotKeys.A.isDown) {
      this.frog.run(-this.velocityXModifier)
      direction = Direction.Left
    } else if (this.hotKeys.D.isDown) {
      this.frog.run(this.velocityXModifier)
      direction = Direction.Right
    } else if (this.hotKeys.S.isDown) {
      direction = Direction.Down
    } else {
      this.frog.run(0)
    }
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
      this.frog.jump(-this.velocityYModifier)
      direction = Direction.Up
    }
    if (this.hotKeys.E.isDown) {
      //this.frog.attack(this, direction)
    }
  }

  protected initializeEnemyBehavior(): void {
    for (const enemy of this.enemies) {
      const direction = getRandomInt(2)
      if (direction === 1) {
        enemy.run(-this.velocityXModifier)
      } else {
        enemy.run(this.velocityXModifier)
      }
    }
  }

  protected playMusic(): void {
    this.songLoader = this.load.audio(
      'volcanoTheme',
      assets.sounds.volcano_theme
    )
    this.songLoader.on('filecomplete', () => {
      this.music = this.sound.add('volcanoTheme', {
        volume: 0.5,
        loop: true
      })
      if (!this.sound.locked) {
        // already unlocked so play
        this.music.play()
      } else {
        // wait for 'unlocked' to fire and then play
        this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
          this.music?.play()
        })
      }
    })
    this.songLoader.start()
  }

  public onBodyTouchesWorldBound(
    e: Phaser.Physics.Arcade.Body,
    _touchingUp: boolean,
    _touchingDown: boolean,
    touchingLeft: boolean,
    touchingRight: boolean
  ): void {
    if (!touchingLeft && !touchingRight) {
      return
    }

    const character = this.findCharacterByContainer(
      e.gameObject as Phaser.GameObjects.Container
    )

    if (character && character instanceof Enemy) {
      ;(character as Enemy).turnAround()
    }
  }

  public findCharacterByContainer(
    container: Phaser.GameObjects.Container
  ): Character | undefined {
    if (this.frog.getContainer() === container) {
      return this.frog
    } else {
      const enemy = this.enemies.find((x) => x.getContainer() === container)

      return enemy
    }
  }
}
