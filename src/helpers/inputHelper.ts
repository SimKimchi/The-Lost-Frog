import Player from '../gameObjects/player'
import { Direction, HotKeys } from '../util'
import CollisionHelper, { IEdge } from './collisionHelper'

export default class InputHelper {
  private hotKeys: HotKeys
  private collisionHelper: CollisionHelper

  constructor(
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
    collisionHelper: CollisionHelper
  ) {
    this.hotKeys = keyboard.addKeys(
      'SPACE,A,S,D,E,W,UP,DOWN,LEFT,RIGHT'
    ) as HotKeys
    this.collisionHelper = collisionHelper
  }

  public triggerKeyboardActions(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number,
    platformGroup: Phaser.Physics.Arcade.StaticGroup | null
  ): void {
    if (!platformGroup) return
    this.handleMovement(
      player,
      velocityXModifier,
      velocityYModifier,
      planetFrictionModifier,
      platformGroup
    )
    this.handleAttack(player)
  }

  private handleMovement(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number,
    platformGroup: Phaser.Physics.Arcade.StaticGroup
  ): void {
    if (!this.hotKeys) return

    if (player.wallClingDirection !== null) {
      this.handleWallClingMovement(
        player,
        velocityXModifier,
        velocityYModifier,
        planetFrictionModifier,
        platformGroup
      )
    } else {
      this.handleRegularMovement(
        player,
        velocityXModifier,
        velocityYModifier,
        planetFrictionModifier
      )
    }
  }

  private handleRegularMovement(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number
  ): void {
    if (this.hotKeys.A.isDown) {
      player.run(-velocityXModifier)
    } else if (this.hotKeys.D.isDown) {
      player.run(velocityXModifier)
    } else {
      player.stop(planetFrictionModifier)
    }
    if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
      player.jump(-velocityYModifier)
    }
  }

  private handleWallClingMovement(
    player: Player,
    velocityXModifier: number,
    velocityYModifier: number,
    planetFrictionModifier: number,
    platformGroup: Phaser.Physics.Arcade.StaticGroup
  ): void {
    let direction = null
    if (this.hotKeys.W.isDown) {
      direction = Direction.Up
    } else if (this.hotKeys.D.isDown) {
      direction = Direction.Right
    } else if (this.hotKeys.S.isDown) {
      direction = Direction.Down
    } else if (this.hotKeys.A.isDown) {
      direction = Direction.Left
    }
    let checkEdge: IEdge = { isAtEdge: false, adjacentPlatform: undefined }
    if (player.clingPlatform) {
      checkEdge = this.collisionHelper.checkPlatformEdge(
        <Phaser.Physics.Arcade.Body>player.getContainer().body,
        player.clingPlatform,
        platformGroup,
        direction
      )
    }
    if (player.wallClingDirection === Direction.Up) {
      // TODO check in A.isDown and D.isDown for adjacent platforms
      if (this.hotKeys.S.isDown) {
        player.stopWallCling()
      } else if (this.hotKeys.A.isDown) {
        player.run(-velocityXModifier * 0.75)
      } else if (this.hotKeys.D.isDown) {
        player.run(velocityXModifier * 0.75)
      } else {
        player.stop(planetFrictionModifier)
      }
    } else {
      if (
        this.hotKeys.W.isDown &&
        (!checkEdge.isAtEdge || checkEdge.adjacentPlatform)
      ) {
        player.climb(-velocityYModifier / 2)
      } else if (
        this.hotKeys.S.isDown &&
        (!checkEdge.isAtEdge || checkEdge.adjacentPlatform)
      ) {
        player.climb(velocityYModifier / 2)
      } else {
        player.climb(0)
      }
      if (checkEdge.adjacentPlatform) {
        player.clingPlatform = checkEdge.adjacentPlatform
      }
      if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
        player.wallJump(-velocityYModifier)
      }
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
