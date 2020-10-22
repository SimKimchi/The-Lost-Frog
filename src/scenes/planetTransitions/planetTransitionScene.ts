import SoundHelper from '../../helpers/soundHelper'
import { HotKeys } from '../../util'

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
    const width = this.game.scale.width
    const height = this.game.scale.height

    this.add
      .text(width / 2, height / 2 - 200, this.sceneTitle, {
        font: '45px PlayMeGames',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)
    this.add
      .text(width / 2, height / 2, this.sceneDescription, {
        font: '16px PlayMeGames',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)

    this.add
      .text(width / 2, height / 2 + 125, '[Land on the planet!]', {
        font: '35px PlayMeGames',
        fill: '#ffffff'
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
    if (!this.soundHelper) return

    this.soundHelper.setMusic('transition_theme', 0.3, false)
  }

  protected goToScene(): void {
    this.soundHelper?.stopAllSounds()

    this.game.scene.switch(this.currentSceneName, this.nextPlanetSceneName)
  }
}
