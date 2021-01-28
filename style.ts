import { CSSProperties, Direction, Options } from './types'

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

export const horizontal = {
  height: '100%',
  width: '20px',
  top: '0',
}

export const vertical = {
  height: '20px',
  width: '100%',
  left: '0',
}
