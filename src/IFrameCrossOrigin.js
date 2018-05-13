import Common from './Common'

export default class IFrameCrossOrigin extends Common {
  constructor (element, options) {
    super(element, options)
    this.container = this.element
    this.registerPostMessageListener()
  }

  shouldInitHorizontal () {
    return this.contentWidth() > this.elementWidth()
  }

  shouldInitVertical () {
    return this.contentHeight() > this.elementHeight()
  }

  registerPostMessageListener () {
    window.addEventListener('message', (event) => {
      if (!event.data || !event.data.indicate) {
        return
      }
      this.getIframeMessage(event)
    }, false)
  }

  getIframeMessage (event) {
    const data = event.data

    this.contentWidth = data.width
    this.contentHeight = data.height
    this.scrollLeft = data.offsetLeft
    this.scrollTop = data.offsetTop

    if (!data.initialized) {
      this.init()
    } else {
      this.scroll()
    }
  }

  scrollHorizontal () {
    const atStart = this.scrollLeft < this.options.fadeOffset
    const atEnd = this.elementWidth() + this.scrollLeft + this.options.fadeOffset > this.contentWidth()

    super.scrollHorizontal(atStart, atEnd)
  }

  scrollVertical () {
    const atStart = this.scrollTop < this.options.fadeOffset
    const atEnd = this.elementHeight + this.scrollTop + this.options.fadeOffset > this.contentHeight

    super.scrollVertical(atStart, atEnd)
  }

  clickHorizontal () {
    //
  }

  clickVertial () {
    //
  }
}
