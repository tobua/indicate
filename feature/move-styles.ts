import { Instance, Options } from '../types'

export const move = (
  element: HTMLElement,
  wrapper: HTMLElement,
  options: Options
) => {
  if (!options.moveStylesToWrapper) {
    return
  }

  // Move class.
  wrapper.className += ` ${element.className}`
  element.className = ''
  // Move inline-styles.
  wrapper.style.cssText += element.style.cssText
  element.style.cssText = null
}

export const undoMove = (
  element: HTMLElement,
  wrapper: HTMLElement,
  instance: Instance
) => {
  if (!instance.options.moveStylesToWrapper) {
    return
  }

  if (instance.table && wrapper.style.position === 'relative') {
    wrapper.style.position = ''
  }

  element.className += ` ${wrapper.className}`
  element.style.cssText += wrapper.style.cssText
}
