export default class SoundHelper {
  private soundManager: Phaser.Sound.BaseSoundManager
  private music: Phaser.Sound.BaseSound | null

  constructor(soundManager: Phaser.Sound.BaseSoundManager) {
    this.soundManager = soundManager
    this.music = null
  }

  public addGenericSounds(): void {
    this.soundManager.add('hit', { volume: 0.1 })
    this.soundManager.add('hurt', { volume: 0.1 })
    this.soundManager.add('jump', { volume: 0.1 })
    this.soundManager.add('double_jump', { volume: 0.1 })
    this.soundManager.add('wall_cling', { volume: 0.1 })
    this.soundManager.add('wall_jump', { volume: 0.1 })
  }

  public setMusic(theme: string, loop = true): void {
    this.music = this.soundManager.add(theme, {
      volume: 0.75,
      loop: loop
    })

    this.playMusic()
  }

  public playMusic(): void {
    if (!this.music) return

    this.music.play()
  }

  public pauseMusic(): void {
    if (!this.music) return

    this.music.pause()
  }

  public stopAllSounds(): void {
    if (!this.music) return

    this.soundManager.removeAll()
  }

  public mute(): void {
    this.soundManager.mute = true
  }

  public unmute(): void {
    this.soundManager.mute = false
  }

  public playEnemyHitSound(): void {
    this.soundManager.get('hit').play()
  }

  public playEnemyHurtSound(): void {
    this.soundManager.get('hurt').play()
  }

  public playPlayerJumpSound(): void {
    this.soundManager.get('jump').play()
  }

  public playPlayerDoubleJumpSound(): void {
    this.soundManager.get('double_jump').play()
  }

  public playPlayerWallClingSound(): void {
    this.soundManager.get('wall_cling').play()
  }

  public playPlayerWallJumpSound(): void {
    this.soundManager.get('wall_jump').play()
  }
}
