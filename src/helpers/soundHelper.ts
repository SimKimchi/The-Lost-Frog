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
  }

  public setPlanetTheme(theme: string): void {
    this.music = this.soundManager.add(theme, {
      volume: 0.6,
      loop: true
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
}
