/**
 * Adds a class to an element.
 * If there is already a space at the end, none will be added.
 **/
export default (element, selector) => {
  const lastClassCharacter = element.className[element.className.length - 1]

  if (lastClassCharacter && lastClassCharacter !== ' ') {
    element.className += ' ' + selector
  } else {
    element.className += selector
  }
}
