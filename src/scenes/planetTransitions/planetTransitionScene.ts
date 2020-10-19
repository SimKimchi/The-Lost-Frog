import { HotKeys } from '../../util'

export default class PlanetTransitionScene extends Phaser.Scene {
  private hotKeys: HotKeys | null
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
  }

  public init(): void {
    this.hotKeys = this.input.keyboard.addKeys('ENTER') as HotKeys
  }
  public create(): void {
    const width = this.game.scale.width
    const height = this.game.scale.height

    this.add
      .text(width / 2, height / 2 - 200, this.sceneTitle, {
        font: '45px monospace',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)
    this.add
      .text(width / 2, height / 2, this.sceneDescription, {
        font: '16px monospace',
        fill: '#ffffff'
      })
      .setOrigin(0.5, 0.5)

    this.add
      .text(width / 2, height / 2 + 125, '[Land on the planet!]', {
        font: '35px monospace',
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
  }

  protected goToScene(): void {
    this.game.scene.switch(this.currentSceneName, this.nextPlanetSceneName)
  }
}