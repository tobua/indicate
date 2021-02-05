import { getOptions } from './options'
import { Elements, PluginOptions } from './types'
import { initialize, getDOMNodes } from './instance'
import { log, Message } from './helper'

export { defaultOptions } from './options'
export { remove } from './instance'
export { Indicate } from './component'

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
