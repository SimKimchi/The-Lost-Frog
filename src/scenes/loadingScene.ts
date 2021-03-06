import genericAssets from '../assets/generic'
import jungleAssets from '../assets/jungle'
import iceAssets from '../assets/ice'
import volcanoAssets from '../assets/volcano'

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene')
  }

  public preload(): void {
    const width = this.game.scale.width
    const height = this.game.scale.height

    const progressBar = this.add.graphics()
    this.add
      .graphics()
      .fillStyle(0x222222, 0.8)
      .fillRect(width / 2 - 160, height / 2 - 25, 320, 50)

    const loadingText = this.make
      .text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
          font: '20px PlayMeGames',
          color: 'white'
        }
      })
      .setOrigin(0.5, 0.5)

    const percentText = this.make
      .text({
        x: width / 2,
        y: height / 2,
        text: '0%',
        style: {
          font: '18px PlayMeGames',
          color: 'white'
        }
      })
      .setOrigin(0.5, 0.5)

    const assetText = this.make
      .text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
          font: '18px PlayMeGames',
          color: 'white'
        }
      })
      .setOrigin(0.5, 0.5)

    this.load.on('progress', function (value: number) {
      percentText.setText(`${Math.round(value * 100)}%`)
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
      function (this: LoadingScene) {
        loadingText.setText('Complete!')
        assetText.destroy()
        this.make
          .text({
            x: width / 2,
            y: height / 2 + 50,
            text: 'Click or press any key to continue!',
            style: {
              font: '20px PlayMeGames',
              color: 'white'
            }
          })
          .setOrigin(0.5, 0.5)

        this.input.on(
          'pointerdown',
          function (this: LoadingScene) {
            this.goToScene()
          },
          this
        )
        this.input.keyboard.on(
          'keydown',
          function (this: LoadingScene) {
            this.goToScene()
          },
          this
        )
      },
      this
    )
  }

  public create(): void {
    this.loadBackgrounds()
    this.loadForegrounds()
    this.loadCharacters()
    this.loadPlatforms()
    this.loadFloors()
    this.loadSpikes()
    this.loadSounds()
    this.loadUIElements()
    this.loadOther()

    this.load.start()
  }

  protected goToScene(): void {
    this.game.scene.switch('LoadingScene', 'MainMenuScene')
  }

  private loadUIElements(): void {
    this.load.image('button_mute', genericAssets.images.button_mute)
    this.load.image('button_sound', genericAssets.images.button_sound)
  }

  private loadBackgrounds(): void {
    this.load.image(
      'background_jungle_1',
      jungleAssets.images.background_jungle_1
    )
    this.load.image(
      'background_jungle_2',
      jungleAssets.images.background_jungle_2
    )
    this.load.image(
      'background_jungle_3',
      jungleAssets.images.background_jungle_3
    )
    this.load.image(
      'background_jungle_4',
      jungleAssets.images.background_jungle_4
    )
    this.load.image(
      'background_jungle_5',
      jungleAssets.images.background_jungle_5
    )
    this.load.image('background_ice_1', iceAssets.images.background_ice_1)
    this.load.image('background_ice_2', iceAssets.images.background_ice_2)
    this.load.image('background_ice_3', iceAssets.images.background_ice_3)
    this.load.image('background_ice_4', iceAssets.images.background_ice_4)
    this.load.image('background_ice_5', iceAssets.images.background_ice_5)
    this.load.image(
      'background_volcano_1',
      volcanoAssets.images.background_volcano_1
    )
    this.load.image(
      'background_volcano_2',
      volcanoAssets.images.background_volcano_2
    )
    this.load.image(
      'background_volcano_3',
      volcanoAssets.images.background_volcano_3
    )
    this.load.image(
      'background_volcano_4',
      volcanoAssets.images.background_volcano_4
    )
    this.load.image(
      'background_volcano_5',
      volcanoAssets.images.background_volcano_5
    )
    this.load.image('screen_transition', genericAssets.images.screen_transition)
    this.load.image('screen_title', genericAssets.images.screen_title)
  }

  private loadForegrounds(): void {
    this.load.image(
      'foreground_jungle_1',
      jungleAssets.images.foreground_jungle_1
    )
    this.load.image(
      'foreground_volcano_1',
      volcanoAssets.images.foreground_volcano_1
    )
    this.load.image(
      'foreground_volcano_2',
      volcanoAssets.images.foreground_volcano_2
    )
  }

  private loadPlatforms(): void {
    this.load.image(
      'platform_jungle_h1',
      jungleAssets.images.platform_jungle_h1
    )
    this.load.image(
      'platform_jungle_h2',
      jungleAssets.images.platform_jungle_h2
    )
    this.load.image(
      'platform_jungle_h3',
      jungleAssets.images.platform_jungle_h3
    )
    this.load.image(
      'platform_jungle_h4',
      jungleAssets.images.platform_jungle_h4
    )
    this.load.image(
      'platform_jungle_v1',
      jungleAssets.images.platform_jungle_v1
    )
    this.load.image(
      'platform_jungle_branch_h1',
      jungleAssets.images.platform_jungle_branch_h1
    )
    this.load.image(
      'platform_jungle_branch_h2',
      jungleAssets.images.platform_jungle_branch_h2
    )
    this.load.image('platform_ice_h1', iceAssets.images.platform_ice_h1)
    this.load.image('platform_ice_v1', iceAssets.images.platform_ice_v1)
    this.load.image(
      'platform_volcano_h1',
      volcanoAssets.images.platform_volcano_h1
    )
    this.load.image(
      'platform_volcano_h2',
      volcanoAssets.images.platform_volcano_h2
    )
    this.load.image(
      'platform_volcano_h3',
      volcanoAssets.images.platform_volcano_h3
    )
    this.load.image(
      'platform_volcano_v1',
      volcanoAssets.images.platform_volcano_v1
    )
    this.load.image(
      'platform_volcano_v2',
      volcanoAssets.images.platform_volcano_v2
    )
    this.load.image(
      'platform_volcano_v3',
      volcanoAssets.images.platform_volcano_v3
    )
  }

  private loadFloors(): void {
    this.load.image('floor_jungle_1', jungleAssets.images.floor_jungle_1)
    this.load.image('floor_jungle_2', jungleAssets.images.floor_jungle_2)
    this.load.image('floor_jungle_3', jungleAssets.images.floor_jungle_3)
    this.load.image('floor_ice_1', iceAssets.images.floor_ice_1)
    this.load.image('floor_ice_2', iceAssets.images.floor_ice_2)
    this.load.image('floor_ice_3', iceAssets.images.floor_ice_3)
    this.load.image('floor_volcano_1', volcanoAssets.images.floor_volcano_1)
    this.load.image('floor_volcano_2', volcanoAssets.images.floor_volcano_2)
    this.load.image('floor_volcano_3', volcanoAssets.images.floor_volcano_3)
  }

  private loadCharacters(): void {
    this.load.image('frogault', genericAssets.images.frogault)
    this.load.image('froguette', genericAssets.images.froguette)
    this.load.spritesheet('tongue_up', genericAssets.images.tongue_up, {
      frameWidth: 32,
      frameHeight: 64
    })
    this.load.spritesheet('tongue_down', genericAssets.images.tongue_down, {
      frameWidth: 32,
      frameHeight: 64
    })
    this.load.spritesheet('tongue_right', genericAssets.images.tongue_right, {
      frameWidth: 64,
      frameHeight: 32
    })
    this.load.spritesheet('tongue_left', genericAssets.images.tongue_left, {
      frameWidth: 64,
      frameHeight: 32
    })
    this.load.spritesheet(
      'enemy_lizard_left',
      jungleAssets.images.enemy_lizard_left,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    )
    this.load.spritesheet(
      'enemy_lizard_right',
      jungleAssets.images.enemy_lizard_right,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    )
    this.load.spritesheet(
      'enemy_lizard_hurt_right',
      jungleAssets.images.enemy_lizard_hurt_right,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    )
    this.load.spritesheet(
      'enemy_lizard_hurt_left',
      jungleAssets.images.enemy_lizard_hurt_left,
      {
        frameWidth: 32,
        frameHeight: 16
      }
    )
    this.load.spritesheet(
      'frog_hurt_right',
      genericAssets.images.frog_hurt_right,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_hurt_left',
      genericAssets.images.frog_hurt_left,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_idle_anim',
      genericAssets.images.frog_idle_anim,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_jump_left_anim',
      genericAssets.images.frog_jump_left_anim,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_jump_right_anim',
      genericAssets.images.frog_jump_right_anim,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet('frog_attack', genericAssets.images.frog_attack, {
      frameWidth: 256,
      frameHeight: 256
    })
    this.load.spritesheet(
      'frog_cling_up_facing_right',
      genericAssets.images.frog_cling_up_facing_right,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_cling_up_facing_left',
      genericAssets.images.frog_cling_up_facing_left,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_cling_right',
      genericAssets.images.frog_cling_right,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'frog_cling_left',
      genericAssets.images.frog_cling_left,
      {
        frameWidth: 256,
        frameHeight: 256
      }
    )
    this.load.spritesheet(
      'enemy_owl_idle_left',
      iceAssets.images.enemy_owl_idle_left,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
    this.load.spritesheet(
      'enemy_owl_idle_right',
      iceAssets.images.enemy_owl_idle_right,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
    this.load.spritesheet(
      'enemy_owl_fly_left',
      iceAssets.images.enemy_owl_fly_left,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
    this.load.spritesheet(
      'enemy_owl_fly_right',
      iceAssets.images.enemy_owl_fly_right,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
    this.load.spritesheet('enemy_owl_hurt', iceAssets.images.enemy_owl_hurt, {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet('enemy_fox_run', volcanoAssets.images.enemy_fox_run, {
      frameWidth: 64,
      frameHeight: 64
    })
    this.load.spritesheet(
      'enemy_fox_hurt',
      volcanoAssets.images.enemy_fox_hurt,
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )
  }

  private loadSounds(): void {
    this.load.audio('main_theme', genericAssets.sounds.main_theme)
    this.load.audio('transition_theme', genericAssets.sounds.transition_theme)
    this.load.audio('jungle_theme', jungleAssets.sounds.jungle_theme)
    this.load.audio('ice_theme', iceAssets.sounds.ice_theme)
    this.load.audio('volcano_theme', volcanoAssets.sounds.volcano_theme)
    this.load.audio('ending_theme', genericAssets.sounds.ending_theme)
    this.load.audio('gameover_theme', genericAssets.sounds.gameover_theme)
    this.load.audio('shuttle_sound', genericAssets.sounds.shuttle_sound)
    this.load.audio('hurt', genericAssets.sounds.hurt)
    this.load.audio('hit', genericAssets.sounds.hit)
    this.load.audio('jump', genericAssets.sounds.jump)
    this.load.audio('double_jump', genericAssets.sounds.double_jump)
    this.load.audio('wall_cling', genericAssets.sounds.wall_cling)
    this.load.audio('wall_jump', genericAssets.sounds.wall_jump)
    this.load.audio('frog_attack', genericAssets.sounds.frog_attack)
    this.load.audio('heal_sound', genericAssets.sounds.heal_sound)
  }

  private loadSpikes(): void {
    this.load.image('spikes_jungle', jungleAssets.images.spikes_jungle)
    this.load.image('spikes_ice', iceAssets.images.spikes_ice)
    this.load.image('spikes_volcano', volcanoAssets.images.spikes_volcano)
  }

  private loadOther(): void {
    this.load.spritesheet(
      'cutscene_shuttle',
      genericAssets.images.cutscene_shuttle,
      {
        frameWidth: 960,
        frameHeight: 640
      }
    )
    this.load.spritesheet('item_heal', genericAssets.images.item_heal, {
      frameWidth: 64,
      frameHeight: 64
    })
  }
}
