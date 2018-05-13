import getBorders from './get-borders'

/**
 * Returns the width and height of a DOM element using getBoundingClientRect
 * and subtracting the margins.
 **/
export default (element) => {
  const borders = getBorders(element)
  const result = {}
  const bounds = element.getBoundingClientRect()

  // Subtract Borders
  result.width = bounds.width - borders.left - borders.right
  result.height = bounds.height - borders.top - borders.bottom

  // Round, since other browser functions will round too.
  result.width = Math.ceil(result.width)
  result.height = Math.ceil(result.height)

  return result
}
