import Block from './Block'
import getSize from './helpers/get-size'

/**
 * The only thing special for Tables is that they always need a wrapper. This
 * case is handled in the Wrapper Feature.
 **/
export default class Table extends Block {
  constructor (element, options) {
    super(element, options)
    this.element = element.parentElement
    this.container = this.element.parentElement
  }

  elementWidth () {
    return getSize(this.container).width
  }

  /**
   * Returns the width of the scrollable element on screen (not the content).
   **/
  elementHeight () {
    return getSize(this.container).height
  }
}
