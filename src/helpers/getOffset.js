/**
* Gets the absolute position of the element.
**/
export default (element) => {
  const oTop = element.offsetTop
  const oLeft = element.offsetLeft

  var _x = 0
  var _y = 0
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft// - element.scrollLeft
    _y += element.offsetTop// - element.scrollTop
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
