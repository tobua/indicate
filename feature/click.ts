import { Direction, Instance, isHorizontal } from '../types'

const scrollHorizontal = (direction: Direction, element: HTMLElement) => {
  const position = element.scrollLeft
  // Scoll for 50% of currently visible part.
  let scrollOffset = element.offsetWidth / 2

  if (direction === Direction.left) {
    scrollOffset = -scrollOffset
  }

  element.scrollTo({
    left: position + scrollOffset,
    behavior: 'smooth',
  })
}

const scrollVertical = (direction: Direction, element: HTMLElement) => {
  const position = element.scrollTop
  // Scoll for 50% of currently visible part.
  let scrollOffset = element.offsetHeight / 2

  if (direction === Direction.top) {
    scrollOffset = -scrollOffset
  }

  element.scrollTo({
    top: position + scrollOffset,
    behavior: 'smooth',
  })
}

const handleIndicatorClick = (
  direction: Direction,
  element: HTMLElement,
  instance: Instance
) => {
  if (isHorizontal(direction)) {
    scrollHorizontal(direction, instance.element)
  } else {
    scrollVertical(direction, instance.element)
  }
}

export const registerClickListener = (
  direction: Direction,
  element: HTMLElement,
  instance: Instance
) => {
  if (!instance.options.click) {
    return
  }

  if (instance.options.click) {
    element.addEventListener(
      'click',
      handleIndicatorClick.bind(null, direction, element, instance)
    )
  }
}
