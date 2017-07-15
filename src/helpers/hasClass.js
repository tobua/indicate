/**
 * Inspired by jQuery source code.
 */
export default (element, selector) => {
  const className = ' ' + selector + ' '
  if ((' ' + element.className + ' ').replace(/[\n\t\r]/g, ' ').indexOf(className) > -1) {
    return true
  }

  return false
}
