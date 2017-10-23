/**
 * Gets the absolute position of the element.
 * Margins will be subtracted.
 **/
export default (element) => {
  const oTop = element.offsetTop + parseInt(window.getComputedStyle(element).marginTop)
  const oLeft = element.offsetLeft + parseInt(window.getComputedStyle(element).marginLeft)

  var _x = 0
  var _y = 0
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft + parseInt(window.getComputedStyle(element).marginLeft)
    _y += element.offsetTop + parseInt(window.getComputedStyle(element).marginTop)
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
