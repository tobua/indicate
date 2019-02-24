import Options from './Options'
import Block from './Block'
import Table from './Table'
import IFrame from './IFrame'
import IFrameCrossOrigin from './IFrameCrossOrigin'
import isCrossOriginIframe from './helpers/is-cross-origin-iframe'

/**
 * indicate - Scroll Indicator Plugin
 *
 * Adds horizontal fade effect to block elements, tables and iframes.
 * Intended to let the user know that there is more content so see than
 * currently fits into the visible part.
 *
 * @author Matthias Giger <matthias.giger@namics.com>
 */
export default class Indicate {
  constructor (targetElements, options) {
    if (typeof options !== 'object') {
      options = {}
    }

    this.targetElements = targetElements
    this.instances = []
    this.options = new Options(options)

    this.init()
  }

  /**
   * Initializes the instances depending on whether it's a single element or
   * an array of nodes.
   */
  init () {
    const elements = this.targetElements

    if (elements) {
      if (elements.length) {
        [].map.call(elements,
          (element) => this.createInstanceForElement(element)
        )
      } else {
        this.createInstanceForElement(elements)
      }
    }
  }

  /**
   * Updates an existing instance by combing the current options with the new
   * ones passed in here.
   **/
  update (newOptions) {
    this.options.update(newOptions)
    this.instances.forEach(instance => instance.update(this.options))
  }

  /**
   * Removes an instance including the nodes, listeners and wrapper classes.
   **/
  destroy () {
    this.instances.forEach(instance => instance.destroy())
  }

  /**
   * Creates an instance of the appropriate class depending on the elements tag.
   */
  createInstanceForElement (element) {
    const tagName = String(element.tagName).toLowerCase()

    switch (tagName) {
      case 'iframe':
        this.instances.push(this.getIframeInstance(element))
        break
      case 'table':
        this.instances.push(new Table(element, this.options))
        break
      default:
        this.instances.push(new Block(element, this.options))
    }
  }

  /**
   * Checks if the iframe is same or cross origin and returns the appropriate
   * instance.
   **/
  getIframeInstance (element) {
    if (isCrossOriginIframe(element)) {
      return new IFrameCrossOrigin(element, this.options)
    }

    return new IFrame(element, this.options)
  }
}
