import Common from './Common'
import './styles/block.scss'

export default class Block extends Common {
  constructor (element, options) {
    super(element, options)
    this.init()
  }

  /**
   * Only if there is overflow the fades need to be initialized.
   **/
  shouldInitHorizontal () {
    // Should only init if option given and not yet initialized
    if (this.options.horizontal && !this.isHorizontal()) {
      return this.contentWidth() > this.elementWidth()
    }
  }

  shouldInitVertical () {
    if (this.options.vertical && !this.isVertical()) {
      return this.contentHeight() > this.elementHeight()
    }
  }

  destroy () {
    this.container.removeEventListener('scroll', this.scrollFunction)
    super.destroy()
  }

  /**
   * Scroll left of right after a click.
   **/
  clickHorizontal (direction) {
    const scrollLeft = this.container.scrollLeft
    const containerLength = this.elementWidth()

    const scrollLength = containerLength / this.options.scrollDenominator

    if (direction === 'right') {
      this.container.scrollLeft = scrollLeft + scrollLength
    } else {
      this.container.scrollLeft = scrollLeft - scrollLength
    }
  }

  /**
   * Scroll to top or bottom after a click.
   **/
  clickVertical (direction) {
    const scrollTop = this.element.scrollTop
    const containerLength = this.elementHeight

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
    const scrollLeft = this.element.scrollLeft
    const atStart = scrollLeft < this.options.fadeOffset
    let atEnd = this.elementWidth() + scrollLeft + this.options.fadeOffset > this.contentWidth()

    // If no scrolling has happend and there is some space inside the fade
    // offset, still show the fade indicator, so the user knows that scrolling
    // is possible
    if (scrollLeft === 0 && atEnd && this.contentWidth() > this.elementWidth()) {
      atEnd = false
    }

    super.scrollHorizontal(atStart, atEnd)
  }

  /**
   * Adapts the visibility of the vertical elements after a scroll.
   **/
  scrollVertical () {
    const scrollTop = this.element.scrollTop
    const atStart = scrollTop < this.options.fadeOffset
    const atEnd = this.elementHeight() + scrollTop + this.options.fadeOffset > this.contentHeight()

    super.scrollVertical(atStart, atEnd)
  }

  /**
   * On page resize we need to adapt the container measurements.
   **/
  resize () {
    super.resize()
  }
}
