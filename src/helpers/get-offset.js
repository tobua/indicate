import getBorders from './get-borders'

/**
 * Returns the left and top absolute position of the element, with borders
 * subtracted.
 **/
export default element => {
  const borders = getBorders(element)

  return {
    top: Math.floor(element.offsetTop + borders.top),
    left: Math.floor(element.offsetLeft + borders.left)
  }
}
