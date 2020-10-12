import LoadingScene from '../loadingScene'
import assets from '../../../assets/jungle'

export default class JungleLoadingScene extends LoadingScene {
  constructor() {
    super('JungleLoadingScene')
  }

  public preload(): void {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const progressBar = this.add.graphics()
    const progressBox = this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(width / 2 - 160, height / 2 - 25, 320, 50)

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })

    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value: number) {
      percentText.setText(`${value * 100}%`)
      progressBar
        .clear()
        .fillStyle(0xffffff, 1)
        .fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30)
    })

    this.load.on('fileprogress', function (file: Phaser.Loader.File) {
      assetText.setText('Loading asset: ' + file.key)
    })

    this.load.on(
      'complete',
      function (this: JungleLoadingScene) {
        progressBar.destroy()
        progressBox.destroy()
        loadingText.destroy()
        percentText.destroy()
        assetText
          .setX(width / 2)
          .setY(height / 2)
          .setText('Click anywhere to play!')

        this.input.on(
          'pointerdown',
          function (this: JungleLoadingScene) {
            console.log('change scene!')
            this.goToScene()
          },
          this
        )
      },
      this
    )
  }

  public create(): void {
    this.load.audio('volcanoTheme', assets.sounds.volcano_theme)
    this.load.image('sky', assets.images.sky)
    this.load.image('platform', assets.images.platform)
    this.load.image('bomb', assets.images.bomb)
    this.load.spritesheet('dude', assets.images.dude, {
      frameWidth: 32,
      frameHeight: 48
    })
    this.load.start()
  }

  protected goToScene(): void {
    const newScene = this.scene.start('JunglePlanetScene')
    console.log(newScene)
  }
}
