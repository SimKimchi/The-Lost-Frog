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
  hitAreaWidth: number
  hitAreaHeight: number
  spriteOffsetX: number
  spriteOffsetY: number
}

export type PlatformConfig = {
  width: number
  height: number
  spriteKey: string
  checkUpCollision?: boolean
  checkDownCollision?: boolean
  checkLeftCollision?: boolean
  checkRightCollision?: boolean
  damageUp?: boolean
  damageDown?: boolean
  damageLeft?: boolean
  damageRight?: boolean
  clingSides?: boolean
  clingUnder?: boolean
  letEnemiesFall?: boolean
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
  posOffsetX?: number
  posOffsetY?: number
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
  ENTER: Phaser.Input.Keyboard.Key
  BACKSPACE: Phaser.Input.Keyboard.Key
  SHIFT: Phaser.Input.Keyboard.Key
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

export enum ItemType {
  Heal
}

export type EnemySpawn = {
  type: EnemyType
  spawnTileX: number
  spawnTileY: number
}

export type PlayerSpawn = {
  spawnTileX: number
  spawnTileY: number
  spawnOffsetX?: number
  spawnOffsetY?: number
}

export type ItemSpawn = {
  type: ItemType
  spawnTileX: number
  spawnTileY: number
}

export type LevelAppreciation =
  | 'Gaming Warlord'
  | 'Epic'
  | 'Great'
  | 'Good'
  | 'Okay'
  | 'Oof'
  | 'LMAO'

export type LevelResultClockMillisecondsMapping = {
  S: TimeAppreciation
  A: TimeAppreciation
  B: TimeAppreciation
  C: TimeAppreciation
  D: TimeAppreciation
  E: TimeAppreciation
}

export type TimeAppreciation = {
  maxMs: number
  appreciation: LevelAppreciation
}

export type LevelResult = {
  levelAppreciation: LevelAppreciation
  levelScore: number
}

export function getLevelResult(
  elapsedTimeMs: number,
  mapping: LevelResultClockMillisecondsMapping
): LevelResult {
  const levelAppreciation: LevelAppreciation = getLevelAppreciation(
    elapsedTimeMs,
    mapping
  )
  const levelScore: number = getLevelScore(
    elapsedTimeMs,
    mapping,
    levelAppreciation
  )

  return {
    levelAppreciation,
    levelScore
  }
}

function getLevelAppreciation(
  elapsedTimeMs: number,
  mapping: LevelResultClockMillisecondsMapping
): LevelAppreciation {
  if (elapsedTimeMs <= mapping.S.maxMs) return mapping.S.appreciation!
  if (elapsedTimeMs <= mapping.A.maxMs) return mapping.A.appreciation!
  if (elapsedTimeMs <= mapping.B.maxMs) return mapping.B.appreciation!
  if (elapsedTimeMs <= mapping.C.maxMs) return mapping.C.appreciation!
  if (elapsedTimeMs <= mapping.D.maxMs) return mapping.D.appreciation!
  if (elapsedTimeMs <= mapping.E.maxMs) return mapping.E.appreciation!

  return 'LMAO'
}

function getLevelScore(
  elapsedTimeMs: number,
  mapping: LevelResultClockMillisecondsMapping,
  levelAppreciation: LevelAppreciation
): number {
  return (
    getLevelBaseScore(levelAppreciation) +
    getClockExtraScore(elapsedTimeMs, mapping, levelAppreciation)
  )
}

function getLevelBaseScore(levelResult: LevelAppreciation): number {
  switch (levelResult) {
    case 'Gaming Warlord':
      return 1000
    case 'Epic':
      return 800
    case 'Great':
      return 600
    case 'Good':
      return 400
    case 'Okay':
      return 200
    case 'Oof':
      return 100
    case 'LMAO':
      return 0
  }
}

function getClockExtraScore(
  elapsedTimeMs: number,
  mapping: LevelResultClockMillisecondsMapping,
  levelAppreciation: LevelAppreciation
) {
  const maxPoints: number = 50
  let bracketMs: number
  let elapsedTimeMsInBracket: number

  switch (levelAppreciation) {
    case 'Gaming Warlord':
      bracketMs = mapping.S.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs
      break
    case 'Epic':
      bracketMs = mapping.A.maxMs - mapping.S.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs - mapping.S.maxMs
      break
    case 'Great':
      bracketMs = mapping.B.maxMs - mapping.A.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs - mapping.A.maxMs
      break
    case 'Good':
      bracketMs = mapping.C.maxMs - mapping.B.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs - mapping.B.maxMs
      break
    case 'Okay':
      bracketMs = mapping.D.maxMs - mapping.C.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs - mapping.C.maxMs
      break
    case 'Oof':
      bracketMs = mapping.E.maxMs - mapping.D.maxMs
      elapsedTimeMsInBracket = elapsedTimeMs - mapping.D.maxMs
      break
    default:
      return 0
  }

  return Math.round(maxPoints * (1 - elapsedTimeMsInBracket / bracketMs))
}

export function msToTime(ms: number) {
  let milliseconds = Math.floor((ms % 1000) / 100),
    seconds: string | number = Math.floor((ms / 1000) % 60),
    minutes: string | number = Math.floor((ms / (1000 * 60)) % 60)

  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return minutes + ':' + seconds + '.' + milliseconds
}
