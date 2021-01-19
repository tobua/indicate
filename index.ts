import { wrap, addIndicators } from './style'

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

type Elements = string | HTMLElement | NodeListOf<HTMLElement>

interface Properties {
  element: Elements
}

const initialize = (element: HTMLElement) => {
  const wrapper = wrap(element)
  const indicators = addIndicators(wrapper, element)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const isLeft = entry.target === indicators.leftObserver
        const isRight = entry.target === indicators.rightObserver
        console.log(entry.isIntersecting, isLeft, isRight)

        if (isLeft) {
          if (entry.isIntersecting) {
            indicators.left.style.display = 'none'
          } else {
            indicators.left.style.display = 'block'
          }
        }

        if (isRight) {
          if (entry.isIntersecting) {
            indicators.right.style.display = 'none'
          } else {
            indicators.right.style.display = 'block'
          }
        }
      })
    },
    {
      root: element,
      rootMargin: '0px',
      threshold: 1.0,
    }
  )

  observer.observe(indicators.leftObserver)
  observer.observe(indicators.rightObserver)

  return () => remove(element)
}

const remove = (element: HTMLElement) => {
  // remove initialized instance from element
}

export const Indicate = ({ element }: Properties) => {
  const elements = getDOMNodes(element)

  if (!elements) {
    return
  }

  elements.forEach(initialize)
}
