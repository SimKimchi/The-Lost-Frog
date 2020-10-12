export default abstract class LoadingScene extends Phaser.Scene {
  constructor(sceneName: string) {
    super(sceneName)
  }

  public abstract preload(): void
  public abstract create(): void
  protected abstract goToScene(): void
}
