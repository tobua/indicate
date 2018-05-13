import Feature from './Feature'
import addClass from './../helpers/add-class'
import ClassNames from './../constants/class-names'
import getOffset from './../helpers/get-offset'
import Positioning from './../constants/positioning'
import sameSize from './../helpers/same-size'
import responsiveElement from './../helpers/responsive-element'

/**
 * Places nodes outside the element and positiones them absolutely on the page.
 **/
export default class AbsolutePositioning extends Feature {
  static check (options) {
    // Dynamic check happens inside init()
    return true
  }

  setup (instance) {
    this._ = instance

    if (instance.options.absolutePositioning) {
      return this.setActive(instance)
    }

    if (
      sameSize(instance.element, instance.container.parentElement) &&
      instance.element === instance.container &&
      responsiveElement(instance.element)
    ) {
      return this.setActive(instance)
    }
  }

  setActive (instance) {
    this.active = true
    addClass(instance.element, ClassNames.absolute)
  }

  /**
   * Updates the fade and arrow element positions. This is only needed on
   * create and if the position or size of the container changes. Not on scroll.
   **/
  updateElementPositions (instance) {
    if (!this.active) {
      return
    }

    const offset = getOffset(instance.container)

    instance.directions.forEach(direction => this.setElementPosition(
      instance.fades[direction], direction, offset
    ))
    instance.directions.forEach(direction => this.setElementPosition(
      instance.arrows[direction], direction, offset
    ))
  }

  /**
   * Position the arrow and fade nodes.
   **/
  setElementPosition (element, direction, outer) {
    // TODO only fails in ie11
    if (!element) {
      return
    }

    const position = Positioning[direction]

    element.style.top = position.top(outer, this._)
    element.style.left = position.left(outer, this._)
    position.stretch(element.style, this._)
  }
}
