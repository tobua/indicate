import { isTable } from '../helper'
import { Options } from '../types'

export const move = (
  element: HTMLElement,
  wrapper: HTMLElement,
  options: Options
) => {
  if (!options.moveStyles) {
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
  options: Options
) => {
  if (!options.moveStyles) {
    return
  }

  if (isTable(element) && wrapper.style.position === 'relative') {
    wrapper.style.position = ''
  }

  element.className += ` ${wrapper.className}`
  element.style.cssText += wrapper.style.cssText
}
