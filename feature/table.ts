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
  const outerWrapper = options.outerWrapper ?? document.createElement('div')

  theme(outerWrapper, 'outerWrapper', options, true, false)

  if (!options.outerWrapper) {
    wrapElementIn(element, outerWrapper)
  }

  const innerWrapper = options.innerWrapper ?? document.createElement('div')

  theme(innerWrapper, 'innerWrapper', options, true, false)

  innerWrapper.style.overflow = 'auto'
  // Table element itself is already inline.
  innerWrapper.style.display = ''

  if (!options.innerWrapper) {
    wrapElementIn(element, innerWrapper)
  }

  return { outerWrapper, innerWrapper }
}
