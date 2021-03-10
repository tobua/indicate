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
      opacity: '0',
      display: 'flex',
      cursor: options.click ? 'pointer' : 'inherit',
      transition: 'opacity 300ms linear',
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
    width: '12px',
    height: '12px',
    display: 'block',
    transform: `rotate(${directionToRotation[direction]}deg)`,
  }),
  hide: (indicator: HTMLSpanElement) => {
    indicator.style.opacity = '0'
  },
  show: (indicator: HTMLSpanElement) => {
    indicator.style.opacity = '1'
  },
}

// Apply style object as inline-style to an element.
export const add = (element: HTMLElement, properties: CSSProperties) => {
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

export const outerWrapper = {
  position: 'relative',
}

export const innerWrapper = {
  position: 'relative',
  // TODO check if possible without inner wrapper if element is inline-block.
  display: 'inline-block',
}

// TODO scrollbars
// overflow: -moz-scrollbars-none;
// Hide Scrollbar in IE
// -ms-overflow-style: none;

// Hide Scrollbar in Chrome
// .idc-container::-webkit-scrollbar,
// .idc-element::-webkit-scrollbar {
//   width: 0;
//   height: 0;
//   background: transparent;
// }

// content: '›' for arrow
