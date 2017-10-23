import Feature from './Feature'
import Table from './../Table'

/**
 * Sets the max height for a table wrapper.
 **/
export default class MaxHeight extends Feature {
  static check (options) {
    return options.maxHeight !== 'none'
  }

  create (instance) {
    this.setMaxHeight(instance)
  }

  update (instance) {
    this.setMaxHeight(instance)
  }

  setMaxHeight (instance) {
    if (instance instanceof Table) {
      instance.scrollableElement.style.maxHeight = this.options.maxHeight
    }
  }
}
