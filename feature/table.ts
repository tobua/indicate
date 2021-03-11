import * as style from '../style'
import { PluginOptions } from '../types'
import { wrapElementIn } from '../element'

// For tables both wrappers are applied around the element
// to keep the DOM structure inside the table intact.
export const wrapTable = ({
  element,
  options,
}: {
  element: HTMLElement
  options: PluginOptions
}) => {
  // TODO provide way to  revert on remove.
  element.style.position = 'relative'

  const outerWrapper = options.outerWrapper ?? document.createElement('div')

  style.add(outerWrapper, {
    ...style.outerWrapper,
  })

  if (!options.outerWrapper) {
    wrapElementIn(element, outerWrapper)
  }

  const innerWrapper = options.innerWrapper ?? document.createElement('div')

  style.add(innerWrapper, {
    position: 'relative',
    overflow: 'auto',
  })

  if (!options.innerWrapper) {
    wrapElementIn(element, innerWrapper)
  }

  return { outerWrapper, innerWrapper }
}
