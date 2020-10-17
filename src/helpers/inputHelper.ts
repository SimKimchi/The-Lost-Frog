import Player from '../gameObjects/player'
import { Direction, HotKeys } from '../util'

export default class InputHelper {
  private hotKeys: HotKeys

  constructor(keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
    this.hotKeys = keyboard.addKeys(
      'SPACE,A,S,D,E,W,UP,DOWN,LEFT,RIGHT'
    ) as HotKeys
  }

  public triggerKeyboardActions(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number,
    sound: Phaser.Sound.BaseSoundManager
  ): void {
    this.handleMovement(
      player,
      velocityXModifier,
      velocityYModifier,
      planetFrictionModifier,
      sound
    )
    this.handleAttack(player)
  }

  private handleMovement(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number,
    sound: Phaser.Sound.BaseSoundManager
  ): void {
    if (!this.hotKeys) return

    if (this.hotKeys.A.isDown) {
      player.run(-velocityXModifier)
    } else if (this.hotKeys.D.isDown) {
      player.run(velocityXModifier)
    } else {
      player.stop(planetFrictionModifier)
    }
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
      const jumpSound = sound.get('jump')
      const doubleJumpSound = sound.get('double_jump')

      player.jump(-velocityYModifier, jumpSound, doubleJumpSound)
    }
  }

  private handleAttack(player: Player): void {
    if (!this.hotKeys) return

    let direction
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.UP)) {
      direction = Direction.Up
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.DOWN)) {
      direction = Direction.Down
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.LEFT)) {
      direction = Direction.Left
    } else if (Phaser.Input.Keyboard.JustDown(this.hotKeys.RIGHT)) {
      direction = Direction.Right
    }

    if (direction !== undefined) {
      player.attack(direction)
    }
  }
}