export default (element, selector) => {
  element.className = element.className.replace(
    new RegExp('(?:^|\\s)' + selector + '(?:\\s|$)'), ' '
  )
}
