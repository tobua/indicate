import { ArrowIcon } from './types'

// Logs messages only in development mode.
export const log = (messageKey: string, objects = null) => {
  if (process.env.NODE_ENV !== 'production') {
    const Messages = {
      IntersectionObserver: "Browser doesn't support IntersectionObserver",
      ExistingInstance: 'An instance for this element already exists',
      RemoveNoInstance: 'remove() no instance found for element',
      InvalidElement: 'Initialized failed due to invalid element',
      InvalidTheme: 'Invalid value provided to theme option',
      ReactMultipleChildren:
        'When using React with childAsElement option there can only be a single child node at the top, falling back to adding a wrapper element',
      ReactMissingRef:
        'When using React with childAsElement option a ref to the child node is required, falling back to adding a wrapper element',
    }

    const prefixedMessage = `indicate: ${Messages[messageKey]}.`

    if (objects) {
      // eslint-disable-next-line no-console
      console.warn(prefixedMessage, objects)
    } else {
      // eslint-disable-next-line no-console
      console.warn(prefixedMessage)
    }
  }
}

// Is it an inline element? false or display property ()
export const isInline = (element: HTMLElement) => {
  const computedStyleDisplay = window.getComputedStyle(element).getPropertyValue('display')

  if (computedStyleDisplay.startsWith('inline')) {
    return computedStyleDisplay
  }

  return false
}

export const isTable = (element: HTMLElement) => element.tagName.toLowerCase() === 'table'

const hideScrollbarClass = 'hide-indicate-scrollbar'

let hideScrollbarStyleSheet: HTMLStyleElement

export const hideScrollbarWithWebkitPseudoClass = (element: HTMLElement) => {
  element.classList.add(hideScrollbarClass)

  // Class already added to the head in a previous instance.
  if (hideScrollbarStyleSheet) {
    return
  }

  hideScrollbarStyleSheet = document.createElement('style')
  const { sheet } = document.head.appendChild(hideScrollbarStyleSheet)

  sheet.insertRule(`.${hideScrollbarClass}::-webkit-scrollbar { display: none; }`)
}

export const removeHideScrollbarStyle = (element: HTMLElement, innerWrapper: HTMLElement) => {
  element.classList.remove(hideScrollbarClass)
  innerWrapper.classList.remove(hideScrollbarClass)

  if (!hideScrollbarStyleSheet || document.querySelector(`.${hideScrollbarClass}`)) {
    return
  }

  hideScrollbarStyleSheet.remove()
  hideScrollbarStyleSheet = undefined
}

// Wraps the second element around the first.
export const wrapElementIn = (element: HTMLElement, wrapper: HTMLElement) => {
  element.parentNode.insertBefore(wrapper, element)
  wrapper.append(element)
}

const createSvgLine = (x1: string, y1: string, x2: string, y2: string, rounded?: boolean) => {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  if (rounded) {
    line.setAttribute('stroke-linecap', 'round')
  }
  line.setAttribute('stroke-width', '20')
  line.setAttribute('x1', x1)
  line.setAttribute('y1', y1)
  line.setAttribute('x2', x2)
  line.setAttribute('y2', y2)

  return line
}

export const arrowIcon = (icon: ArrowIcon, color: string) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 120 120')
  svg.setAttribute('stroke', color)

  if (icon === 'arrow-rounded') {
    svg.appendChild(createSvgLine('10', '60', '110', '60', true))
    svg.appendChild(createSvgLine('108.213', '57.3553', '61.5442', '10.6863', true))
    svg.appendChild(createSvgLine('61.5442', '109.213', '108.213', '62.5442', true))
  } else if (icon === 'pointer-rounded') {
    svg.appendChild(createSvgLine('43.1421', '11', '91.2254', '59.0833', true))
    svg.appendChild(createSvgLine('91.2254', '60.1421', '43.1421', '108.225', true))
  } else if (icon === 'arrow') {
    svg.appendChild(createSvgLine('0', '60', '120', '60'))
    svg.appendChild(createSvgLine('62.9289', '112.929', '113.284', '62.5736'))
    svg.appendChild(createSvgLine('113.284', '57.4264', '62.929', '7.07109'))
  } else {
    svg.appendChild(createSvgLine('37.0711', '6.92893', '96.8923', '66.7502'))
    svg.appendChild(createSvgLine('96.468', '53.0711', '37.0711', '112.468'))
  }

  return svg
}
