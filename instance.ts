import { getDOMNodes } from './initialize'
import { createInstance, addIndicators, addObservers } from './element'
import { observe } from './observer'
import { Instance, Elements, Options, directions } from './types'
import { log, Message } from './helper'

export const instances = new Map<HTMLElement, Instance>()

export const initialize = (options: Options, element: HTMLElement) => {
  if (instances.get(element)) {
    log(Message.ExistingInstance, { element })
    return
  }

  const instance = createInstance(element, options)

  addIndicators(instance)
  addObservers(instance)

  instances.set(element, instance)

  observe(instance)
}

export const remove = (element: Elements) => {
  const elements = getDOMNodes(element)

  if (!elements) {
    return
  }

  elements.forEach((currentElement) => {
    const instance = instances.get(currentElement)

    if (!instance) {
      log(Message.RemoveNoInstance, { element: currentElement })
      return
    }

    directions.forEach((direction) => {
      instance.indicator[direction].remove()
      instance.observer[direction].remove()
    })

    instance.intersectionObserver.disconnect()

    // Remove outer wrapper.
    instance.outerWrapper.replaceWith(
      ...Array.from(instance.outerWrapper.childNodes)
    )

    // Remove inner wrapper.
    const contents = instance.innerWrapper.innerHTML
    instance.innerWrapper.remove()
    currentElement.innerHTML = contents

    instances.delete(currentElement)
  })
}
