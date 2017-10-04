const defaultOptions = {
    // Clicking on the arrow will scroll (1 / value) of the currently visible width.
  scrollDenominator: 2,
  // What is the max length that should be scrolled independently of the container and scrollDenominator.
  maxScrollLength: 50,
    // If color is not specified it will either be the surrounding color or white.
  color: '#FFFFFF',
    // Arrows are shown by default.
  arrows: true,
    // Defines how the arrows should be positioned inside the fade effect.
    // Can be set to 'cetner', 'start' or 'end'.
  arrowPosition: 'start',
    // The face effec's width.
  fadeWidth: '20px',
    // This far away from the scroll end the effect will be removed.
  fadeOffset: 5,
    // If the element is an iframe the height will be changed to the iframe content height. For tables this is TODO.
  adaptToContentHeight: true,
    // By default horizontal scrollling is enabled.
  horizontal: true,
    // Additionally the effect can also be applied vertically.
  vertical: true,
    // Set the max-height of the wrapper.
  maxHeight: 'none'
}

export default class Options {
  constructor (options) {
    Object.assign(this, Object.assign(defaultOptions, options))
  }
}
