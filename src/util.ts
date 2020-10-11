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
}

export type AnimationConfig = {
  key: string
  frame?: number
  frameStart?: number
  frameEnd?: number
  frameRate?: number
  repeat?: number
}

export type HotKeys = {
  SPACE: Phaser.Input.Keyboard.Key
  A: Phaser.Input.Keyboard.Key
  S: Phaser.Input.Keyboard.Key
  D: Phaser.Input.Keyboard.Key
  E: Phaser.Input.Keyboard.Key
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}
