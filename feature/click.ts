import { Direction, Instance, isHorizontal } from '../types'

const scrollHorizontal = (direction: Direction, element: HTMLElement, denominator: number) => {
  const position = element.scrollLeft
  // Scoll for 50% of currently visible part.
  let scrollOffset = element.offsetWidth / denominator

  if (direction === Direction.left) {
    scrollOffset = -scrollOffset
  }

  element.scrollTo({
    left: position + scrollOffset,
    behavior: 'smooth',
  })
}

const scrollVertical = (direction: Direction, element: HTMLElement, denominator: number) => {
  const position = element.scrollTop
  // Scoll for 50% of currently visible part.
  let scrollOffset = element.offsetHeight / denominator

  if (direction === Direction.top) {
    scrollOffset = -scrollOffset
  }

  element.scrollTo({
    top: position + scrollOffset,
    behavior: 'smooth',
  })
}

const handleIndicatorClick = (direction: Direction, element: HTMLElement, denominator: number) => {
  if (isHorizontal(direction)) {
    scrollHorizontal(direction, element, denominator)
  } else {
    scrollVertical(direction, element, denominator)
  }
}

export const registerClickListener = (
  direction: Direction,
  element: HTMLElement,
  instance: Instance,
) => {
  if (!instance.options.click) {
    return
  }

  // Access here, as inferred type check above is lost inside methods.
  const { denominator } = instance.options.click

  const scrollableElement = instance.table ? instance.innerWrapper : instance.element

  if (instance.options.click) {
    element.addEventListener(
      'click',
      handleIndicatorClick.bind(null, direction, scrollableElement, denominator),
    )
  }
}
