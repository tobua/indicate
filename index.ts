import { wrap, addIndicators } from './style'
import { observe } from './observer'
import { Instance, Elements, PluginOptions, Options } from './types'

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

const initialize = (options: Options, element: HTMLElement) => {
  const wrapper = wrap(element)
  const indicators = addIndicators(wrapper, element)

  const instance = {
    wrapper,
    element,
    indicators,
    options,
  }

  instances.set(element, instance)

  observe(instance)

  return {
    instance,
    remove: () => remove(instance),
  }
}

const remove = (instance: Instance) => {
  instance.indicators.left.remove()
  instance.indicators.right.remove()
  instance.indicators.leftObserver.remove()
  instance.indicators.rightObserver.remove()
}

const defaultOptions = {
  horizontal: true,
  vertical: true,
}

interface Properties {
  element: Elements
  options?: PluginOptions
}

export const Indicate = ({ element, options = {} }: Properties) => {
  const elements = getDOMNodes(element)
  const instanceOptions = Object.assign(options, defaultOptions)

  if (!elements) {
    return
  }

  if (!IntersectionObserver) {
    return console.warn(
      "indicate: Browser doesn't support IntersectionObserver."
    )
  }

  elements.forEach(initialize.bind(null, instanceOptions))
}
