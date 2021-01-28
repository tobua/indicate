export enum Direction {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export const directions: Direction[] = [
  Direction.left,
  Direction.right,
  Direction.top,
  Direction.bottom,
]

export const isHorizontal = (direction: Direction) =>
  direction === Direction.left || direction === Direction.right

export const isVertical = (direction: Direction) =>
  direction === Direction.top || direction === Direction.bottom

export const isStart = (direction: Direction) =>
  direction === Direction.top || direction === Direction.left

export const isEnd = (direction: Direction) =>
  direction === Direction.right || direction === Direction.bottom

export type Elements = string | HTMLElement | NodeListOf<HTMLElement>

export interface Theme {
  indicator: (direction: Direction, options: Options) => CSSProperties
  arrow: (direction: Direction) => CSSProperties
}

// User facing options.
export interface PluginOptions {
  arrow?: boolean
  color?: string
  width?: string
}

// Internal options extended with defaults.
export interface Options {
  arrow: boolean
  theme: Theme
  color: string
  width: string
}

export interface Instance {
  outerWrapper: HTMLDivElement
  innerWrapper: HTMLDivElement
  element: HTMLElement
  indicator: {
    left: HTMLSpanElement
    right: HTMLSpanElement
    top: HTMLSpanElement
    bottom: HTMLSpanElement
  }
  observer: {
    left: HTMLSpanElement
    right: HTMLSpanElement
    top: HTMLSpanElement
    bottom: HTMLSpanElement
  }
  options: Options
}

export interface Visibility {
  left: boolean
  right: boolean
  top: boolean
  bottom: boolean
}

// See https://stackoverflow.com/a/52876098/3185545 if nesting required.
export type CSSProperties = {
  [P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P]
}
