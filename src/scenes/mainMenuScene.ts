import { HotKeys } from '../util'

export default class MainMenuScene extends Phaser.Scene {
  private playTextOption: Phaser.GameObjects.Text | null
  private creditsTextOption: Phaser.GameObjects.Text | null
  private hotKeys: HotKeys | null

  constructor() {
    super('MainMenuScene')

    this.playTextOption = null
    this.creditsTextOption = null
    this.hotKeys = null
  }

  public init(): void {
    this.hotKeys = this.input.keyboard.addKeys('S,W,UP,DOWN,ENTER') as HotKeys
  }

  public create(): void {
    const width = this.game.scale.width
    const height = this.game.scale.height

    this.add
      .text(width / 2, height / 2 - 200, 'The Lost Frog', {
        font: '45px monospace',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)
    this.add
      .text(width / 2, height / 2 - 150, '(main menu design coming soon :D)', {
        font: '16px monospace',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)

    this.playTextOption = this.add
      .text(width / 2, height / 2, '[Play!]', {
        font: '35px monospace',
        fill: '#ffffff'
      })
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.goToFirstPlanet()
        },
        this
      )
      .setOrigin(0.5, 0.5)
      .setData('selected', true)

    this.creditsTextOption = this.add
      .text(width / 2, height / 2 + 100, 'See credits', {
        font: '18px monospace',
        fill: '#ffffff'
      })
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.goToCredits()
        },
        this
      )
      .setOrigin(0.5, 0.5)

    this.input.keyboard.on(
      'keydown',
      function (this: MainMenuScene) {
        if (!this.hotKeys) return

        if (this.hotKeys.W.isDown || this.hotKeys.UP.isDown) {
          this.menuGoUp()
        } else if (this.hotKeys.S.isDown || this.hotKeys.DOWN.isDown) {
          this.menuGoDown()
        } else if (this.hotKeys.ENTER.isDown) {
          if (this.playTextOption?.getData('selected')) {
            this.goToFirstPlanet()
          } else {
            this.goToCredits()
          }
        }
      },
      this
    )
  }

  private goToFirstPlanet(): void {
    this.game.scene.switch('MainMenuScene', 'JunglePlanetTransitionScene')
  }

  private goToCredits(): void {
    this.game.scene.switch('MainMenuScene', 'CreditsScene')
  }

  private menuGoDown(): void {
    if (this.playTextOption?.text.startsWith('[')) {
      this.playTextOption?.setText('Play!')
      this.creditsTextOption?.setText('[See credits]')
      this.playTextOption.setData('selected', false)
      this.creditsTextOption?.setData('selected', true)
    }
  }

  private menuGoUp(): void {
    if (this.creditsTextOption?.text.startsWith('[')) {
      this.playTextOption?.setText('[Play!]')
      this.creditsTextOption?.setText('See credits')
      this.playTextOption?.setData('selected', true)
      this.creditsTextOption.setData('selected', false)
    }
  }
}