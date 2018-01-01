import Common from './Common'
import getSize from './helpers/getSize'
import getScrollPosition from './helpers/get-iframe-scroll-position'
import getContentDocument from './helpers/get-iframe-content-document'
import './styles/iframe.scss'

export default class IFrame extends Common {
  constructor (element, options) {
    super(element, options)
    this.connectIframe()
  }

  connectIframe () {
    this.scrollableElement = this.element
    this.checkIfIframeContentsAvailable()
  }

  shouldInitHorizontal () {
    const scrollElementSize = getSize(this.scrollableElement)

    this.elementWidth = scrollElementSize.width
    this.elementFullWidth = this.contentDocument.body.scrollWidth

    if (this.options.horizontal) {
      return this.elementFullWidth > this.elementWidth
    }
  }

  shouldInitVertical () {
    const scrollElementSize = getSize(this.scrollableElement)

    this.elementWidth = scrollElementSize.height
    this.elementFullHeight = this.contentDocument.body.scrollHeight

    if (this.options.vertical) {
      return this.elementFullHeight > this.elementHeight
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
    this.elementFullWidth = this.contentDocument.body.scrollWidth
    this.elementFullHeight = this.contentDocument.body.scrollHeight

    super.resize()
  }

  scrollHorizontal () {
    const scrollLeft = getScrollPosition(this.contentDocument, 'scrollLeft')
    const atStart = scrollLeft < this.options.fadeOffset
    const atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth

    super.scrollHorizontal(atStart, atEnd)
  }

  scrollVertical () {
    const scrollTop = getScrollPosition(this.contentDocument, 'scrollTop')
    const atStart = scrollTop < this.options.fadeOffset
    const atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight

    super.scrollVertical(atStart, atEnd)
  }

  clickHorizontal () {
    //
  }

  clickVertical () {
    //
  }
}
