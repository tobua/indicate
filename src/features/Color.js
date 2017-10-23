import Feature from './Feature'

/**
 * Sets the fade color.
 **/
export default class Color extends Feature {
  static check (options) {
    return options.color !== '#FFFFFF'
  }

  create (instance) {
    this.setFadeColor(instance)
  }

  update (instance) {
    this.setFadeColor(instance)
  }

  setFadeColor (instance) {
    const color = this.options.color

    instance.directions.map(direction => {
      instance.fades[direction].style.background = `linear-gradient(to ${direction}, rgba(255,255,255,0) 0%, ${color} 100%)`
    })
  }
}
