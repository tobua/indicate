import Feature from './Feature'

/**
 * Adapts the fade width.
 **/
export default class FadeWidth extends Feature {
  static check (options) {
    return options.fadeWidth !== '20px'
  }

  create (instance) {
    this.setFadeWidth(instance)
  }

  update (instance) {
    this.setFadeWidth(instance)
  }

  setFadeWidth (instance) {
    instance.directions.map(direction => {
      if (direction === 'left' || direction === 'right') {
        instance.fades[direction].style.width = this.options.fadeWidth
        if (instance.arrows) {
          instance.arrows[direction].style.width = this.options.fadeWidth
        }
      }
      if (direction === 'top' || direction === 'bottom') {
        instance.fades[direction].style.height = this.options.fadeWidth
        if (instance.arrows) {
          instance.arrows[direction].style.height = this.options.fadeWidth
        }
      }
    })
  }
}
