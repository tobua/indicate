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
  const observer = new IntersectionObserver(
    () => {
      console.log('observer created')
    },
    {
      root: element,
      rootMargin: '0px',
      threshold: 1.0,
    }
  )

  console.log('observer', observer)
}

export const Indicate = ({ element }: Properties) => {
  const elements = getDOMNodes(element)

  if (!elements) {
    return
  }

  elements.forEach(initialize)
}
