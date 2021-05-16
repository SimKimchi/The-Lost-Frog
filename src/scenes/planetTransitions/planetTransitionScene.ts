import SoundHelper from '../../helpers/soundHelper'
import { HotKeys } from '../../util'

// TODO: Change the art for the next planet during transition
export default class PlanetTransitionScene extends Phaser.Scene {
  private hotKeys: HotKeys | null
  public soundHelper: SoundHelper | null
  private currentSceneName: string
  private nextPlanetSceneName: string
  private sceneTitle: string
  private sceneDescription: string

  constructor(
    currentSceneName: string,
    nextPlanetSceneName: string,
    sceneTitle: string,
    sceneDescription: string
  ) {
    super(currentSceneName)

    this.hotKeys = null
    this.currentSceneName = currentSceneName
    this.nextPlanetSceneName = nextPlanetSceneName
    this.sceneTitle = sceneTitle
    this.sceneDescription = sceneDescription
    this.soundHelper = null
  }

  public init(): void {
    this.hotKeys = this.input.keyboard.addKeys('ENTER') as HotKeys
    this.soundHelper = new SoundHelper(this.sound)
  }
  public create(): void {
    this.add.image(0, 0, 'screen_transition').setOrigin(0)

    const width = this.game.scale.width
    const height = this.game.scale.height

    this.add
      .text(350, 50, this.sceneTitle, {
        font: '45px PlayMeGames',
        color: 'white'
      })
      .setOrigin(0.5, 0.5)
      .setStroke('black', 2)
    this.add
      .text(350, 165, this.sceneDescription, {
        font: '16px PlayMeGames',
        color: 'white'
      })
      .setOrigin(0.5, 0.5)
      .setStroke('black', 2)

    this.add
      .text(width / 2, height - 75, '[ Land on the planet! ]', {
        font: '35px PlayMeGames',
        color: 'white'
      })
      .setInteractive()
      .on(
        'pointerdown',
        () => {
          this.goToScene()
        },
        this
      )
      .setOrigin(0.5, 0.5)
      .setStroke('black', 4)

    this.input.keyboard.on(
      'keydown',
      function (this: PlanetTransitionScene) {
        if (!this.hotKeys) return

        if (this.hotKeys.ENTER.isDown) {
          this.goToScene()
        }
      },
      this
    )

    this.playMusic()
  }

  private playMusic(): void {
    if (!this.soundHelper || this.soundHelper.isMusicPlaying('main_theme'))
      return

    this.soundHelper.setMusic('main_theme', 1.1)
  }

  protected goToScene(): void {
    this.soundHelper?.stopAllSounds()

    this.game.scene.switch(this.currentSceneName, this.nextPlanetSceneName)
  }
}
