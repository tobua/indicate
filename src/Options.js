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
  // Only applies horizontally
  // Can be set to 'center', 'start' or 'end'.
  arrowPosition: 'center',
  // The face effec's width. TODO rename to fadeSize, as it's horizontal and vertical
  fadeWidth: '20px',
  // This far away from the scroll end the effect will be removed.
  fadeOffset: 5,
  // By default horizontal scrollling is enabled.
  horizontal: true,
  // Additionally the effect can also be applied vertically.
  vertical: true,
  // Set the max-height of the table wrapper.
  maxHeight: undefined,
  // Always creates a wrapper around table elements.
  forceWrapper: false,
  // Scroll when fades / arrows are clicked
  click: true,
  // How should the fade nodes be positioned relative to the element
  // Default is relative where the nodes are placed inside the element
  // Absolute positioning is useful in cases when relative positioning
  // messes up the current styling.
  absolutePositioning: false
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
