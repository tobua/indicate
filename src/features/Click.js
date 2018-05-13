import Feature from './Feature'

/**
 * Scroll happens when fade/arrows are clicked.
 **/
export default class Click extends Feature {
  static check (options) {
    return Boolean(options.click)
  }

  create (instance) {
    this.listener = event => this.handleClick.call(instance, event)
    this.updateClickListeners(instance)
  }

  update (instance) {
    this.updateClickListeners(instance)
  }

  destroy (instance) {
    Object.keys(instance.fades).forEach(key => instance.fades[key]
      .removeEventListener('click', this.listener))
    Object.keys(instance.arrows).forEach(key => instance.arrows[key]
      .removeEventListener('click', this.listener))
  }

  /**
   * Add or remove click listeners or fade or arrow elements.
   **/
  updateClickListeners (instance) {
    instance.directions.forEach(direction => {
      const element = instance.arrows[direction] ? instance.arrows[direction]
        : instance.fades[direction]
      // Note that listeners on hidden elements will not be working.
      element.addEventListener('click', this.listener)
    })
  }

  /**
   * Adapts the scroll position after a click on a direction (arrow/fade) has
   * happened.
   *
   * requires clickHorizontal and clickVertical to be implemented by descendant.
   **/
  handleClick (event) {
    let target = event.target

    // In case the SVG is clicked.
    if (typeof event.target.className !== 'string') {
      target = event.target.parentElement
    }

    const direction = target.className.match(/[\w]*($|\s)/)[0].trim()

    if (direction === 'left' || direction === 'right') {
      return this.clickHorizontal(direction)
    }

    if (direction === 'top' || direction === 'bottom') {
      return this.clickVertical(direction)
    }
  }
}
