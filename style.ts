import { CSSProperties } from './types'

export const addStyle = (element: HTMLElement, properties: CSSProperties) => {
  for (const property in properties)
    element.style[property] = properties[property]
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
