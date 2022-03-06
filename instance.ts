import { getOptions } from './options'
import { createInstance, addIndicators, addObservers } from './element'
import { observe } from './observer'
import { Instance, Elements, Options, directions, PluginOptions } from './types'
import { log, removeHideScrollbarStyle } from './helper'
import { undoMove } from './feature/move-styles'

export const instances = new Map<HTMLElement, Instance>()
const wrappers = new Map<HTMLElement, Instance>()

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

  log('InvalidElement', { element })

  return false
}

const hasExistingInstance = (options: Options, element: HTMLElement) => {
  let found = false

  if (instances.get(element)) {
    found = true
  }

  // Check child in case selector class moved to wrapper.
  if (
    options.moveStylesToWrapper &&
    !found &&
    element.childNodes.length > 0 &&
    instances.get(element.childNodes[0] as HTMLElement)
  ) {
    found = true
  }

  if (found) {
    log('ExistingInstance', { element })
  }

  return found
}

export const initialize = (options: Options, element: HTMLElement) => {
  if (hasExistingInstance(options, element)) {
    return
  }

  const instance = createInstance(element, options)

  addIndicators(instance)
  addObservers(instance)

  instances.set(element, instance)
  wrappers.set(instance.outerWrapper, instance)

  observe(instance)
}

export const indicate = (element: Elements, options?: PluginOptions) => {
  const elements = getDOMNodes(element)
  const instanceOptions = getOptions(options)

  if (!elements) {
    return
  }

  if (!IntersectionObserver) {
    log('IntersectionObserver')
    return
  }

  elements.forEach(initialize.bind(null, instanceOptions))
}

export const remove = (element: Elements) => {
  const elements = getDOMNodes(element)

  if (!elements) {
    return
  }

  elements.forEach((currentElement: HTMLElement) => {
    const instance = instances.get(currentElement) || wrappers.get(currentElement)

    if (!instance) {
      log('RemoveNoInstance', { element: currentElement })
      return
    }

    directions.forEach((direction) => {
      instance.indicator[direction].remove()
      instance.observer[direction].remove()
    })

    instance.intersectionObserver.disconnect()

    removeHideScrollbarStyle(instance.element, instance.innerWrapper)

    undoMove(instance.element, instance.outerWrapper, instance)

    if (!instance.options.outerWrapper) {
      // Remove outer wrapper.
      instance.outerWrapper.replaceWith(...Array.from(instance.outerWrapper.childNodes))
    }

    if (!instance.options.innerWrapper) {
      // Remove inner wrapper.
      if (instance.table) {
        instance.innerWrapper.replaceWith(...Array.from(instance.innerWrapper.childNodes))
      } else {
        const contents = instance.innerWrapper.innerHTML
        instance.innerWrapper.remove()
        currentElement.innerHTML = contents
      }
    }

    instances.delete(currentElement)
    wrappers.delete(currentElement)
  })
}
