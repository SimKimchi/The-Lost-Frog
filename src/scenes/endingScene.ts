import SoundHelper from '../helpers/soundHelper'

export default class EndingScene extends Phaser.Scene {
  public soundHelper: SoundHelper | null

  constructor() {
    super('EndingScene')

    this.soundHelper = null
  }

  public init(): void {
    this.soundHelper = new SoundHelper(this.sound)
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
      .text(width / 2, height / 2, 'Thanks for playing our game!', {
        font: '30px monospace',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)

    this.playMusic()
  }

  private playMusic(): void {
    if (!this.soundHelper) return

    this.soundHelper.setMusic('ending_theme', 0.25, false)
  }
}
