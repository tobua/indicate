import Common from './Common'

export default class IFrameCrossOrigin extends Common {
  constructor (element, options) {
    super(element, options)
    this.scrollableElement = this.element
    this.registerPostMessageListener()
  }

  shouldInitHorizontal () {
    return this.elementFullWidth > this.elementVisibleWidth
  }

  shouldInitVertical () {
    return this.elementFullHeight > this.elementVisibleHeight
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

    this.elementFullWidth = data.width
    this.elementFullHeight = data.height
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
    const atEnd = this.elementVisibleWidth + this.scrollLeft + this.options.fadeOffset > this.elementFullWidth

    super.scrollHorizontal(atStart, atEnd)
  }

  scrollVertical () {
    const atStart = this.scrollTop < this.options.fadeOffset
    const atEnd = this.elementVisibleHeight + this.scrollTop + this.options.fadeOffset > this.elementFullHeight

    super.scrollVertical(atStart, atEnd)
  }

  clickHorizontal () {
    //
  }

  clickVertial () {
    //
  }
}
