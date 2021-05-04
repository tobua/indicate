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
  indicator?:
    | ((
        element: HTMLElement,
        direction: Direction,
        options: Options
      ) => CSSProperties | void)
    | CSSProperties
  hide?: (indicator: HTMLSpanElement) => void | CSSProperties
  show?: (indicator: HTMLSpanElement) => void | CSSProperties
  arrow?: (arrow: HTMLElement, direction: Direction) => CSSProperties | void
  element?:
    | ((element: HTMLElement, options: Options) => CSSProperties | void)
    | CSSProperties
  innerWrapper?:
    | ((element: HTMLElement, options: Options) => CSSProperties | void)
    | CSSProperties
  outerWrapper?:
    | ((element: HTMLElement, options: Options) => CSSProperties | void)
    | CSSProperties
  observer?:
    | ((
        element: HTMLElement,
        direction: Direction,
        options: Options
      ) => CSSProperties | void)
    | CSSProperties
}

type ArrowPosition = 'start' | 'center' | 'end'

// Omit passing option-props to children in React component.
export const pluginOptionsProperties = [
  'arrow',
  'color',
  'width',
  'click',
  'hideScrollbar',
  'moveStylesToWrapper',
]

// Unpublished, required for React plugin.
interface UnpublishedOptions {
  outerWrapper?: HTMLElement
  innerWrapper?: HTMLElement
}

export interface ClickOptions {
  denominator?: number
}

export type ArrowIcon =
  | 'arrow-rounded'
  | 'pointer-rounded'
  | 'arrow'
  | 'pointer'

export interface PluginArrowOptions {
  position?: ArrowPosition
  icon?: ArrowIcon
  color?: string
  image?: string
  markup?: Node | string
}

export interface ArrowOptions {
  position: ArrowPosition
  icon: ArrowIcon
  color: string
  image?: string
  markup?: Node | string
}

// User facing options.
export type PluginOptions = {
  arrow?: boolean | PluginArrowOptions
  color?: string
  theme?: Theme
  width?: string
  click?: boolean | ClickOptions
  hideScrollbar?: boolean
  moveStylesToWrapper?: boolean
  style?: {
    outerWrapper?: CSSProperties
    innerWrapper?: CSSProperties
  }
} & UnpublishedOptions

// Internal options extended with defaults.
export type Options = {
  arrow: false | ArrowOptions
  theme?: Theme
  color: string
  width: string
  click: false | ClickOptions
  hideScrollbar: boolean
  moveStylesToWrapper: boolean
  style?: { [key in keyof Theme]: CSSProperties }
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
