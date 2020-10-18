import { HotKeys } from '../util'

export default class CreditsScene extends Phaser.Scene {
  private hotKeys: HotKeys | null

  constructor() {
    super('CreditsScene')

    this.hotKeys = null
  }

  public init(): void {
    this.hotKeys = this.input.keyboard.addKeys('ENTER,BACKSPACE') as HotKeys
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
      .text(
        width / 2,
        height / 2 + 75,
        `Project Leader :

    Simkimchi


Programmers :

    SimKimchi
    BenoitV5000


Artists :

    Ochiogrande
    Motorthud
    Mnix
    TheknightOwl


Music composer :

    Troisnyx


Special thanks for our testers :

    ViBe
    c'est qui
    Papaprune
    Renard Rusé
`,
        {
          font: '14px monospace',
          fill: '#ffffff'
        }
      )
      .setOrigin(0.5, 0.5)

    this.add
      .text(100, 50, '[Go back]', {
        font: '15px monospace',
        fill: '#ffffff'
      })
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.goToMainMenu()
        },
        this
      )
      .setOrigin(0.5, 0.5)

    this.input.keyboard.on(
      'keydown',
      function (this: CreditsScene) {
        if (!this.hotKeys) return

        if (this.hotKeys.ENTER.isDown || this.hotKeys.BACKSPACE.isDown) {
          this.goToMainMenu()
        }
      },
      this
    )
  }

  protected goToMainMenu(): void {
    this.game.scene.switch('CreditsScene', 'MainMenuScene')
  }
}
