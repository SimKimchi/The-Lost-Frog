import Player from '../gameObjects/player'
import { Direction, HotKeys } from '../util'
import CollisionHelper, { IEdge } from './collisionHelper'

export default class InputHelper {
  public hotKeys: HotKeys
  private collisionHelper: CollisionHelper

  constructor(
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
    collisionHelper: CollisionHelper
  ) {
    this.hotKeys = keyboard.addKeys(
      'SPACE,A,S,D,E,W,UP,DOWN,LEFT,RIGHT,ENTER,SHIFT'
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

  public enterIsDown(): boolean {
    return this.hotKeys.ENTER.isDown
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
        platformGroup,
        planetFrictionModifier
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
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    planetFrictionModifier: number
  ): void {
    let checkEdge: IEdge = { isAtEdge: false, adjacentPlatform: undefined }
    if (player.wallClingDirection === Direction.Up) {
      if (this.hotKeys.S.isDown) {
        player.stopWallCling()
      } else if (this.hotKeys.A.isDown) {
        checkEdge = this.checkEdge(player, platformGroup, Direction.Left)
        if (!checkEdge.isAtEdge || checkEdge.adjacentPlatform) {
          player.run(-velocityXModifier * 0.75)
        } else {
          player.stop(planetFrictionModifier)
        }
      } else if (this.hotKeys.D.isDown) {
        checkEdge = this.checkEdge(player, platformGroup, Direction.Right)
        if (!checkEdge.isAtEdge || checkEdge.adjacentPlatform) {
          player.run(velocityXModifier * 0.75)
        } else {
          player.stop(planetFrictionModifier)
        }
      } else {
        player.stop(planetFrictionModifier)
      }
      if (checkEdge.adjacentPlatform) {
        player.clingPlatform = checkEdge.adjacentPlatform
      }
    } else {
      if (this.hotKeys.W.isDown) {
        checkEdge = this.checkEdge(player, platformGroup, Direction.Up)
        if (!checkEdge.isAtEdge || checkEdge.adjacentPlatform) {
          player.climb(-velocityYModifier * 0.75)
        } else {
          player.stopClimb(planetFrictionModifier)
        }
      } else if (this.hotKeys.S.isDown) {
        checkEdge = this.checkEdge(player, platformGroup, Direction.Down)
        if (!checkEdge.isAtEdge || checkEdge.adjacentPlatform) {
          player.climb(velocityYModifier * 0.75)
        } else {
          player.stopClimb(planetFrictionModifier)
        }
      } else {
        player.stopClimb(planetFrictionModifier)
      }
      if (checkEdge.adjacentPlatform) {
        player.clingPlatform = checkEdge.adjacentPlatform
      }
      if (Phaser.Input.Keyboard.JustDown(this.hotKeys.SPACE)) {
        player.wallJump(-velocityYModifier)
      }
    }
  }

  private checkEdge(
    player: Player,
    platformGroup: Phaser.Physics.Arcade.StaticGroup,
    direction: Direction
  ): IEdge {
    let checkEdge: IEdge = { isAtEdge: false, adjacentPlatform: undefined }
    if (player.clingPlatform) {
      checkEdge = this.collisionHelper.checkPlatformEdge(
        player.body,
        player.clingPlatform,
        platformGroup,
        direction
      )
    }
    return checkEdge
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
