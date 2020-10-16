import LoadingScene from '../loadingScene'

export default class IceLoadingScene extends LoadingScene {
  constructor() {
    super('IceLoadingScene')
  }

  public preload(): void {
    const width = this.game.scale.width
    const height = this.game.scale.height

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })

    assetText
      .setOrigin(0.5, 0.5)
      .setX(width / 2)
      .setY(height / 2)
      .setText('Click anywhere to play!')

    this.input.on(
      'pointerdown',
      function (this: IceLoadingScene) {
        this.goToScene()
      },
      this
    )
    this.input.keyboard.on(
      'keydown',
      function (this: IceLoadingScene) {
        this.goToScene()
      },
      this
    )
  }

  public create(): void {
    // TODO: Changer scène pour qu'elle fasse une transition entre les deux planètes.
  }

  protected goToScene(): void {
    this.game.scene.switch('IceLoadingScene', 'IcePlanetScene')
  }
}
