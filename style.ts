import {
  CSSProperties,
  Direction,
  Options,
  isHorizontal,
  isVertical,
} from './types'

export const theme = {
  indicator: (direction: Direction, options: Options) => ({
    background: `linear-gradient(to ${direction}, transparent, ${options.color})`,
  }),
}

export const addStyle = (element: HTMLElement, properties: CSSProperties) => {
  Object.keys(properties).forEach((property) => {
    element.style[property] = properties[property]
  })
}

export const absolute = {
  position: 'absolute',
}

export const alignment = (direction: Direction, options: Options) => {
  const style: CSSProperties = {}
  const horizontal = isHorizontal(direction)
  const vertical = isVertical(direction)

  if (horizontal) {
    style.top = '0'
  }

  if (vertical) {
    style.left = '0'
  }

  style.width = horizontal ? options.width : '100%'
  style.height = vertical ? options.width : '100%'

  return style
}
