import { wrap, createInstance, addIndicators, addObservers } from './element'
import { observe } from './observer'
import { Instance, Elements, PluginOptions, Options, directions } from './types'

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
  const instance = createInstance(element, options)

  addIndicators(instance)
  addObservers(instance)

  instances.set(element, instance)

  observe(instance)

  return {
    instance,
    remove: () => remove(instance),
  }
}

const remove = (instance: Instance) => {
  directions.forEach((direction) => {
    instance.indicator[direction].remove()
    instance.observer[direction].remove()
  })
}

const defaultOptions = {
  arrow: true,
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
