import { TheLostFrogGame } from '..'
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
    this.add.sprite(150, height / 2, 'frogault')
    this.add.sprite(width - 150, height / 2, 'froguette')
    this.add
      .text(width / 2, height / 2 - 200, 'The Lost Frog', {
        font: '45px PlayMeGames',
        color: 'white'
      })
      .setOrigin(0.5, 0.5)
    this.add
      .text(
        width / 2,
        height / 2 - 150,
        (this.game as TheLostFrogGame).displayFinalScore(),
        {
          font: '15px PlayMeGames',
          color: 'white'
        }
      )
      .setOrigin(0.5, 0.5)
    this.add
      .text(
        width / 2,
        height / 2,
        `After fighting off countless wild predators,
Frogault finally saw Froguette and rushed to her. It must've
been by a miracle that she was not hurt at all after everything
she went through.

Froguette explained to his beloved half how she got kidnapped
while gathering her special ingredients to make his favorite
bug soup. Now, they can safely return to Tadpolurn and have
a nice dinner.


Thank you player for helping Frogault save his wife!`,
        {
          font: '16px PlayMeGames',
          color: 'white'
        }
      )
      .setOrigin(0.5, 0.5)
      .setStroke('black', 2)
    this.add
      .text(width / 2, height - 100, 'Thanks for playing our game!', {
        font: '30px PlayMeGames',
        color: 'white'
      })
      .setOrigin(0.5, 0.5)

    this.playMusic()
  }

  private playMusic(): void {
    if (!this.soundHelper) return

    this.soundHelper.setMusic('ending_theme', 0.25, false)
  }
}
