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

export type Elements = string | Element | HTMLElement | NodeListOf<Element>

export interface Theme {
  indicator: (direction: Direction, options: Options) => CSSProperties
  arrow: (direction: Direction) => CSSProperties
}

type ArrowPosition = 'start' | 'center' | 'end'

export const pluginOptionsProperties = [
  'arrow',
  'arrowPosition',
  'color',
  'width',
  'click',
]

// Unpublished, required for React plugin.
interface UnpublishedOptions {
  outerWrapper?: HTMLElement
  innerWrapper?: HTMLElement
}

// User facing options.
export type PluginOptions = {
  arrow?: boolean
  arrowPosition?: ArrowPosition
  color?: string
  width?: string
  click?: boolean
} & UnpublishedOptions

// Internal options extended with defaults.
export type Options = {
  arrow: boolean
  arrowPosition: ArrowPosition
  theme: Theme
  color: string
  width: string
  click: boolean
} & UnpublishedOptions

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
  intersectionObserver: IntersectionObserver
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
