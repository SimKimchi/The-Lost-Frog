export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export type CharacterConfig = {
  spawnX: number
  spawnY: number
  collideWorldBounds: boolean
  spriteKey: string
  animations: AnimationConfig[]
  containerSizeX: number
  containerSizeY: number
  spriteOffsetX: number
  spriteOffsetY: number
}

export type PlatformConfig = {
  width: number
  height: number
  spriteKey: string
  checkUpCollision: boolean
  checkDownCollision: boolean
  checkLeftCollision: boolean
  checkRightCollision: boolean
}

export type AnimationConfig = {
  key: string
  assetKey: string
  frame?: number
  frameStart?: number
  frameEnd?: number
  frameRate?: number
  repeat?: number
}

export type Platform = {
  x: number
  y: number
  xOffSet?: number
  yOffSet?: number
  config: PlatformConfig
  scale?: number
}

export type HotKeys = {
  SPACE: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
  E: Phaser.Input.Keyboard.Key
  W: Phaser.Input.Keyboard.Key
  UP: Phaser.Input.Keyboard.Key
  DOWN: Phaser.Input.Keyboard.Key
  LEFT: Phaser.Input.Keyboard.Key
  RIGHT: Phaser.Input.Keyboard.Key
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

export const gridWidth = 64
export const gridHeight = 64

export enum EnemyType {
  Lizard,
  Owl,
  Fox
}

export type EnemySpawn = {
  type: EnemyType
  spawnX: number
  spawnY: number
}
