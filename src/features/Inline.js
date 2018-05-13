import Feature from './Feature'

/**
 * Inline elements aren't supported, because it's not possible to get the
 * content width for scrolling. This feature will add display block.
 **/
export default class AbsolutePositioning extends Feature {
  static check (options) {
    // Dynamic check happens inside init()
    return true
  }

  setup (instance) {
    // Convert inline elements to block
    if (window.getComputedStyle(instance.element).width === 'auto') {
      instance.element.style.display = 'block'
    }
  }
}
