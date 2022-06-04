import GameObject from '@/gameObject'
import Map from '@/map'

type OwConfig = {
  element: HTMLElement | null
  map?: Map | null
}

type Animations<T> = {
  [key in keyof T]: [number, number][]
}

type SpriteConfig = {
  src: string
  shadow?: string
  animations?: { [key: string]: [number, number][] }
  currentAnimation?: string
  currentAnimationFrame?: number
  animationFrameLimit?: number
  gameObject: GameObject
}

type Direction = 'down' | 'up' | 'left' | 'right'

type DirectionUpdate = Record<string, ['x' | 'y', number]>

type GameObjectConfig = {
  x: number
  y: number
  direction?: Direction
  src?: string
  shadow?: string
  isPlayerControlled?: boolean
}

type MapConfig = {
  gameObjects: GameObject[]
  lowerSrc: string
  upperSrc: string
}

type KeyMap = Record<KeyboardEvent['key'], Direction>

export type {
  OwConfig,
  SpriteConfig,
  GameObjectConfig,
  MapConfig,
  Direction,
  DirectionUpdate,
  KeyMap,
  Animations
}
