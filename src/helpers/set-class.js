import addClass from './add-class'
import hasClass from './has-class'
import removeClass from './remove-class'

/**
 * Add or remove class depending on condition.
 **/
export default (condition, element, className) => {
  if (condition) {
    if (!hasClass(element, className)) {
      addClass(element, className)
    }
  } else {
    if (hasClass(element, className)) {
      removeClass(element, className)
    }
  }
}
