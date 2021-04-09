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
  element.classList.forEach((className) => {
    wrapper.classList.add(className)
    element.classList.remove(className)
  })
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

  wrapper.classList.forEach((className) => {
    element.classList.add(className)
    wrapper.classList.remove(className)
  })
  element.style.cssText += wrapper.style.cssText
}
