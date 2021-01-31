import { getOptions } from './options'
import { getDOMNodes } from './initialize'
import { Elements, PluginOptions } from './types'
import { initialize } from './instance'
import { log, Message } from './helper'

export { defaultOptions } from './options'
export { remove } from './instance'

interface Properties {
  element: Elements
  options?: PluginOptions
}

export const indicate = ({ element, options = {} }: Properties) => {
  const elements = getDOMNodes(element)
  const instanceOptions = getOptions(options)

  if (!elements) {
    return
  }

  if (!IntersectionObserver) {
    log(Message.IntersectionObserver)
    return
  }

  elements.forEach(initialize.bind(null, instanceOptions))
}
