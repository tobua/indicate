import { assign } from 'es6-object-assign'
import * as features from './features/index'

const defaultOptions = {
  // Clicking on the arrow will scroll (1 / value) of the currently visible width.
  scrollDenominator: 2,
  // The fade effect color.
  color: '#FFFFFF',
  // Should arrows be show.
  arrows: true,
  // Defines where the arrows should be positioned inside the fade effect.
  // Can be set to 'cetner', 'start' or 'end'.
  arrowPosition: 'center',
  // The face effec's width.
  fadeWidth: '20px',
  // This far away from the scroll end the effect will be removed.
  fadeOffset: 5,
  // By default horizontal scrollling is enabled.
  horizontal: true,
  // Additionally the effect can also be applied vertically.
  vertical: true,
  // Set the max-height of the wrapper.
  maxHeight: 'none'
}

export default class Options {
  constructor (options) {
    assign(this, assign({}, defaultOptions, options))
    this.checkFeatures()
    this.initializeFeatures()
  }

  update (newOptions) {
    assign(this, assign({}, this, newOptions))
    this.checkFeatures()
    this.initializeFeatures()
  }

  /**
   * Checks which features are applicable and returns only those.
   **/
  checkFeatures () {
    const featuresArray = Object.keys(features).map((key) => features[key])
    this.features = featuresArray.filter((feature) => {
      return feature.check(this)
    })
  }

  /**
   * Initializes the feature inststances.
   **/
  initializeFeatures () {
    this.features = this.features.map((Feature) => new Feature(this))
  }
}
