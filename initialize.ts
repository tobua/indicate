import { Elements } from './types'
import { log, Message } from './helper'

export const getDOMNodes = (element: Elements) => {
  if (typeof element === 'string') {
    const elements = document.querySelectorAll(element)
    if (elements.length) {
      return elements
    }
  }

  if (element instanceof NodeList && element.length) {
    return element
  }

  // Second check to make sure element if attached to DOM.
  if (element instanceof HTMLElement && element.isConnected) {
    return [element]
  }

  log(Message.InvalidElement, { element })

  return false
}
