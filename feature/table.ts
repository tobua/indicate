import { theme } from '../style'
import { Options } from '../types'
import { wrapElementIn } from '../helper'

// For tables both wrappers are applied around the element
// to keep the DOM structure inside the table intact.
export const wrapTable = ({
  element,
  options,
}: {
  element: HTMLElement
  options: Options
}) => {
  // TODO provide way to  revert on remove.
  element.style.position = 'relative'

  const outerWrapper = options.outerWrapper ?? document.createElement('div')

  theme(outerWrapper, 'outerWrapper', options)

  if (!options.outerWrapper) {
    wrapElementIn(element, outerWrapper)
  }

  const innerWrapper = options.innerWrapper ?? document.createElement('div')

  theme(innerWrapper, 'innerWrapper', options)

  innerWrapper.style.position = 'relative'
  innerWrapper.style.overflow = 'auto'

  if (!options.innerWrapper) {
    wrapElementIn(element, innerWrapper)
  }

  return { outerWrapper, innerWrapper }
}
