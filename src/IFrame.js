import Common from './Common'
import getSize from './helpers/get-size'
import getScrollPosition from './helpers/get-iframe-scroll-position'
import getContentDocument from './helpers/get-iframe-content-document'
import './styles/iframe.scss'

export default class IFrame extends Common {
  constructor (element, options) {
    super(element, options)
    this.connectIframe()
  }

  connectIframe () {
    this.container = this.element
    this.checkIfIframeContentsAvailable()
  }

  shouldInitHorizontal () {
    if (this.options.horizontal) {
      return this.contentWidth() > this.elementWidth()
    }
  }

  shouldInitVertical () {
    if (this.options.vertical) {
      return this.contentHeight() > this.elementHeight()
    }
  }

  /**
   * In order to get the actual parameters of the iframe contents we have to
   * check if it has already finished loading.
   **/
  checkIfIframeContentsAvailable () {
    this.contentDocument = getContentDocument(this)

    if (!this.contentDocument.readyState !== 'complete') {
      return this.delayUntilContentsAreLoaded()
    }

    this.setIframeReferences()
  }

  /**
   * Delays execution until the contentLoaded listener is called.
   **/
  delayUntilContentsAreLoaded (callback) {
    if (this.contentDocument.readyState !== 'complete') {
      return setTimeout(() => this.delayUntilContentsAreLoaded(), 300)
    }

    this.setIframeReferences()
  }

  /**
   * Sets a reference to the iframe content element, once it's loaded.
   **/
  setIframeReferences () {
    this.contentDocument = getContentDocument(this)
    this.init()
  }

  registerListeners () {
    this.contentDocument.addEventListener('scroll', this.scrollFunction)
    super.registerListeners()
  }

  resize () {
    this.contentWidth = this.contentDocument.body.scrollWidth
    this.contentHeight = this.contentDocument.body.scrollHeight

    super.resize()
  }

  scrollHorizontal () {
    const scrollLeft = getScrollPosition(this.contentDocument, 'scrollLeft')
    const atStart = scrollLeft < this.options.fadeOffset
    const atEnd = this.elementWidth() + scrollLeft + this.options.fadeOffset > this.contentWidth()

    super.scrollHorizontal(atStart, atEnd)
  }

  scrollVertical () {
    const scrollTop = getScrollPosition(this.contentDocument, 'scrollTop')
    const atStart = scrollTop < this.options.fadeOffset
    const atEnd = this.elementHeight() + scrollTop + this.options.fadeOffset > this.contentHeight()

    super.scrollVertical(atStart, atEnd)
  }

  clickHorizontal () {
    //
  }

  clickVertical () {
    //
  }

  /**
   * Returns the width of the scrollable element on screen (not the content).
   **/
  elementWidth () {
    return getSize(this.container).width
  }

  /**
   * Returns the full width of the scrollable element, including parts not
   * visible without scrolling.
   **/
  contentWidth () {
    return this.contentDocument.body.scrollWidth
  }

  /**
   * Returns the width of the scrollable element on screen (not the content).
   **/
  elementHeight () {
    return getSize(this.container).height
  }

  /**
   * Returns the full width of the scrollable element, including parts not
   * visible without scrolling.
   **/
  contentHeight () {
    return this.contentDocument.body.scrollHeight
  }
}
