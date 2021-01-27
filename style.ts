import { CSSProperties } from './types'

export const addStyle = (element: HTMLElement, properties: CSSProperties) => {
  Object.keys(properties).forEach((property) => {
    element.style[property] = properties[property]
  })
}

export const indicatorBase = {
  position: 'absolute',
  background: 'gray',
  opacity: '0.6',
}

export const indicatorHorizontal = {
  height: '100%',
  width: '20px',
  top: '0',
}

export const indicatorVertical = {
  height: '20px',
  width: '100%',
  left: '0',
}

export const observerBase = {
  position: 'absolute',
  background: 'red',
  opacity: '0.4',
}
