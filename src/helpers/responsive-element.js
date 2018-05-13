/**
 * Returns whether the element can be used as a responsive table wrapper.
 *
 * display: inline elements <span> will not work as a responsive wrapper.
 * TODO also check if overflow property set to scroll or auto
 **/
export default element => {
  if (!element || element === document.body) {
    return
  }

  return window.getComputedStyle(element).display !== 'inline'
}
