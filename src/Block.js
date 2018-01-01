import Common from './Common'
import getSize from './helpers/getSize'
import './styles/block.scss'

export default class Block extends Common {
  constructor (element, options) {
    super(element, options)
    this.init()
  }

  shouldInitHorizontal () {
    const scrollElementSize = getSize(this.scrollableElement)

    this.elementWidth = scrollElementSize.width

    this.elementFullWidth = this.element.scrollWidth

    if (this.options.horizontal) {
      return this.elementFullWidth > this.elementWidth
    }
  }

  shouldInitVertical () {
    const scrollElementSize = getSize(this.element)

    this.elementHeight = scrollElementSize.height

    this.elementFullHeight = this.element.scrollHeight

    if (this.options.vertical) {
      return this.elementFullHeight > this.elementHeight
    }
  }

  destroy () {
    this.scrollableElement.removeEventListener('scroll', this.scrollFunction)
    super.destroy()
  }

  makeElementResponsive () {
    this.scrollableElement = this.element
    super.makeElementResponsive()
  }

  registerListeners () {
    this.scrollableElement.addEventListener('scroll', this.scrollFunction)
    super.registerListeners()
  }

  /**
   * Scroll left of right after a click.
   **/
  clickHorizontal (direction) {
    const scrollLeft = this.scrollableElement.scrollLeft
    const containerLength = this.elementVisibleWidth

    const scrollLength = containerLength / this.options.scrollDenominator

    if (direction === 'right') {
      this.scrollableElement.scrollLeft = scrollLeft + scrollLength
    } else {
      this.scrollableElement.scrollLeft = scrollLeft - scrollLength
    }
  }

  /**
   * Scroll to top or bottom after a click.
   **/
  clickVertical (direction) {
    const scrollTop = this.element.scrollTop
    const containerLength = this.elementVisibleHeight

    const scrollLength = containerLength / this.options.scrollDenominator

    if (direction === 'bottom') {
      this.element.scrollTop = scrollTop + scrollLength
    } else {
      this.element.scrollTop = scrollTop - scrollLength
    }
  }

  /**
   * Adapts the visibility of the horizontal elements after a scroll.
   **/
  scrollHorizontal () {
    const scrollLeft = this.scrollableElement.scrollLeft
    const atStart = scrollLeft < this.options.fadeOffset
    const atEnd = this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth

    super.scrollHorizontal(atStart, atEnd)
  }

  /**
   * Adapts the visibility of the vertical elements after a scroll.
   **/
  scrollVertical () {
    const scrollTop = this.scrollableElement.scrollTop
    const atStart = scrollTop < this.options.fadeOffset
    const atEnd = this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight

    super.scrollVertical(atStart, atEnd)
  }

  /**
   * On page resize we need to adapt the container measurements.
   **/
  resize () {
    const scrollElementBounds = this.scrollableElement.getBoundingClientRect()

    this.elementFullWidth = Math.max(scrollElementBounds.width, this.scrollableElement.scrollWidth)
    this.elementFullHeight = Math.max(scrollElementBounds.height, this.scrollableElement.scrollHeight)

    super.resize()
  }
}
