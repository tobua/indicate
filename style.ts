import {
  CSSProperties,
  Direction,
  Options,
  isHorizontal,
  isVertical,
} from './types'

const directionToRotation = {
  [Direction.left]: 225,
  [Direction.right]: 45,
  [Direction.top]: 315,
  [Direction.bottom]: 135,
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
        options.arrowPosition !== 'center'
          ? `flex-${options.arrowPosition}`
          : options.arrowPosition
      style.justifyContent = 'center'
    } else {
      style.justifyContent =
        options.arrowPosition !== 'center'
          ? `flex-${options.arrowPosition}`
          : options.arrowPosition
      style.alignItems = 'center'
    }

    return style
  },
  arrow: (direction: Direction) => ({
    borderTop: '3px solid black',
    borderRight: '3px solid black',
    width: '10px',
    height: '10px',
    borderRadius: '3px',
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
