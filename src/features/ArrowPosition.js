import Feature from './Feature'

/**
 * Sets a special arrow position, default is center.
 **/
export default class ArrowPosition extends Feature {
  static check (options) {
    return options.arrowPosition !== 'center'
  }

  create (instance) {
    this.setArrowPosition(instance)
  }

  update (instance) {
    this.setArrowPosition(instance)
  }

  setArrowPosition (instance) {
    const arrowPosition = this.options.arrowPosition

    instance.directions.map(direction => {
      // This feature only applies horizontally
      if (direction === 'left' || direction === 'right') {
        instance.arrows[direction].style.display = 'flex'
        instance.arrows[direction].style.alignItems = `flex-${arrowPosition}`
      }
    })
  }
}
