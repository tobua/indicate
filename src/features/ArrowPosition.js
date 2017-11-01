import Arrow from './Arrow'

/**
 * Sets a special arrow position, default is center.
 **/
export default class ArrowPosition extends Arrow {
  static check (options) {
    return options.arrowPosition !== 'center'
  }

  create (instance) {
    this.setArrowPosition(instance)
  }

  update (instance) {
    this.setArrowPosition(instance)
  }
}
