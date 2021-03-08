import {
  CSSProperties,
  Direction,
  Options,
  isHorizontal,
  isVertical,
} from './types'

const directionToRotation = {
  [Direction.left]: 180,
  [Direction.right]: 0,
  [Direction.top]: 270,
  [Direction.bottom]: 90,
}

export const theme = {
  indicator: (direction: Direction, options: Options) => {
    const style: CSSProperties = {
      background: `linear-gradient(to ${direction}, rgba(255, 255, 255, 0), ${options.color})`,
      // Initially not visible.
      display: 'none',
      cursor: options.click ? 'pointer' : 'inherit',
    }

    if (isHorizontal(direction)) {
      style.alignItems =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.justifyContent = 'center'
    } else {
      style.justifyContent =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.alignItems = 'center'
    }

    return style
  },
  arrow: (direction: Direction) => ({
    width: '10px',
    height: '10px',
    display: 'block',
    transform: `rotate(${directionToRotation[direction]}deg)`,
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
