import { wrap, addIndicators } from './style'
import { observe } from './observer'
import { Instance } from './types'

const instances = new Map<HTMLElement, Instance>()

const getDOMNodes = (element: Elements) => {
  if (typeof element === 'string') {
    return document.querySelectorAll(element)
  }

  if (element instanceof NodeList) {
    console.log('is nodelist')
    return element
  }

  if (element instanceof HTMLElement) {
    return [element]
  }

  console.warn('indicate: Initialized with invalid element.')

  return false
}

const initialize = (element: HTMLElement) => {
  const wrapper = wrap(element)
  const indicators = addIndicators(wrapper, element)

  const instance = {
    wrapper,
    element,
    indicators,
    options: {},
  }

  instances.set(element, instance)

  observe(instance)

  return {
    instance,
    remove: () => remove(instance),
  }
}

const remove = (instance: Instance) => {
  // remove initialized instance from element
}

type Elements = string | HTMLElement | NodeListOf<HTMLElement>

interface Properties {
  element: Elements
}

export const Indicate = ({ element }: Properties) => {
  const elements = getDOMNodes(element)

  if (!elements) {
    return
  }

  elements.forEach(initialize)
}
