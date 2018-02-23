/**
 * Gets the absolute position of the element.
 * Borders will be subtracted.
 **/
export default (element) => {
  const oTop = element.offsetTop + parseInt(window.getComputedStyle(element).borderTop)
  const oLeft = element.offsetLeft + parseInt(window.getComputedStyle(element).borderLeft)

  var _x = 0
  var _y = 0
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft + parseInt(window.getComputedStyle(element).borderLeft)
    _y += element.offsetTop + parseInt(window.getComputedStyle(element).borderTop)
    element = element.offsetParent
  }

  if (oTop !== _y || oLeft !== _x) {
    return {
      top: oTop,
      left: oLeft
    }
  }

  return { top: _y, left: _x }
}
