import addClass from './helpers/addClass'
import removeClass from './helpers/removeClass'
import getOffset from './helpers/getOffset'
import getSize from './helpers/getSize'
import ClassNames from './constants/classNames'
import './styles/fades.scss'
import './styles/arrows.scss'
import './styles/regular.scss'

export default class Regular {
  constructor (element, options) {
    this.element = element
    this.options = options
    this.resizeFunction = () => this.resize()
    this.scrollFunction = () => this.scroll()

    this.create()
    this.resize()
  }

  /**
   * Creates an instance.
   **/
  create () {
    this.makeElementResponsive()
    this.element.className += ` ${ClassNames.elementClass}`
    this.setDirections()
    this.insertFadeElements()
    this.insertArrows()
    this.registerListeners()
    this.hideInitial()

    this.hook('create')
  }

  /**
   * Updates an exising instance when new options are received.
   **/
  update (options) {
    this.options = options
    this.setDirections()

    this.hook('update')
  }

  /**
   * Cleans up the instance.
   **/
  destroy () {
    this.scrollableElement.removeEventListener('scroll', this.scrollFunction)
    window.removeEventListener('resize', this.resizeFunction)
  }

  /**
   * For regular elements no wrapper is needed.
   **/
  makeElementResponsive () {
    this.parent = this.element.parentElement
    this.scrollableElement = this.element
  }

  /**
   * Register the scorll, resize and arrow click listeners.
   **/
  registerListeners () {
    this.scrollableElement.addEventListener('scroll', this.scrollFunction)
    window.addEventListener('resize', this.resizeFunction)

    this.directions.map(direction => {
      const element = this.arrows ? this.arrows[direction] : this.fades[direction]
      // Note that listeners on hidden elements will not be working.
      element.addEventListener('click', (event) => this.handleClick(event))
    })
  }

  /**
   * Adapts the scroll position after a click on a direction (arrow/fade) has
   * happened.
   **/
  handleClick (event) {
    const direction = event.target.className.match(/[\w]*($|\s)/)[0].trim()

    if (direction === 'left' || direction === 'right') {
      return this.clickHorizontal(direction)
    }

    if (direction === 'top' || direction === 'bottom') {
      return this.clickVertical(direction)
    }
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
   * Adapt elements after a scroll.
   **/
  scroll () {
    if (this.options.horizontal) {
      this.scrollHorizontal()
    }

    if (this.options.vertical) {
      this.scrollVertical()
    }
  }

  /**
   * Adapts the visibility of the horizontal elements after a scroll.
   **/
  scrollHorizontal () {
    const scrollLeft = this.scrollableElement.scrollLeft

    if (this.elementVisibleWidth + scrollLeft + this.options.fadeOffset > this.elementFullWidth) {
      this.hide('right')
    } else {
      this.show('right')
    }

    if (scrollLeft > this.options.fadeOffset) {
      this.show('left')
    } else {
      this.hide('left')
    }
  }

  /**
   * Adapts the visibility of the vertical elements after a scroll.
   **/
  scrollVertical () {
    const scrollTop = this.scrollableElement.scrollTop

    if (this.elementVisibleHeight + scrollTop + this.options.fadeOffset > this.elementFullHeight) {
      this.hide('bottom')
    } else {
      this.show('bottom')
    }

    if (scrollTop > this.options.fadeOffset) {
      this.show('top')
    } else {
      this.hide('top')
    }
  }

  /**
   * On page resize we need to adapt the container measurements.
   **/
  resize () {
    const scrollElementBounds = this.scrollableElement.getBoundingClientRect()
    const scrollElementSize = getSize(this.scrollableElement)

    this.elementFullWidth = Math.max(scrollElementBounds.width, this.scrollableElement.scrollWidth)
    this.elementFullHeight = Math.max(scrollElementBounds.height, this.scrollableElement.scrollHeight)

    // Probably unneeded check if needed for browser compatibility
    this.elementVisibleWidth = Math.max(this.scrollableElement.clientWidth, scrollElementBounds.width)
    this.elementVisibleHeight = Math.max(this.scrollableElement.clientHeight, scrollElementBounds.height)

    this.elementWidth = scrollElementSize.width
    this.elementHeight = scrollElementSize.height

    window.requestAnimationFrame(() => this.updateElementPositions())

    this.scroll()
  }

  /**
   * Hides the fades and arrows if they're not yet hidden.
   **/
  hide (direction) {
    const hidePropertyName = `is${direction}Hidden`

    if (!this[hidePropertyName]) {
      this[hidePropertyName] = true
      addClass(this.fades[direction], 'hide')
      if (this.arrows) {
        addClass(this.arrows[direction], 'hide')
      }
    }
  }

  /**
   * Top and left should be hidden in every case. Since this is faster than
   * resize and scroll we hide them immediately.
   **/
  hideInitial () {
    this.hide('top')
    this.hide('left')
  }

  /**
   * Shows the fades and arrows if they're hidden.
   **/
  show (direction) {
    const hidePropertyName = `is${direction}Hidden`

    if (this[hidePropertyName]) {
      this[hidePropertyName] = false
      removeClass(this.fades[direction], 'hide')
      if (this.arrows) {
        removeClass(this.arrows[direction], 'hide')
      }
    }
  }

  /**
   * Inserts the fade elements for all the directions provided.
   **/
  insertFadeElements () {
    this.fades = {}

    this.directions.map((direction, index) => {
      this.fades[direction] = document.createElement('div')
      this.fades[direction].className = ClassNames[`fade-${direction}`]
      this.parent.appendChild(this.fades[direction])
    })
  }

  /**
   * Inserts the arrows for all the directions provided.
   **/
  insertArrows () {
    if (!this.options.arrows) {
      return
    }

    this.arrows = {}

    this.directions.map(direction => {
      this.arrows[direction] = document.createElement('div')
      this.arrows[direction].className = ClassNames[`arrow-${direction}`]
      this.parent.appendChild(this.arrows[direction])
    })
  }

  /**
   * Updates the fade and arrow element positions. This is only needed on
   * create and if the position or size of the container changes. Not on scroll.
   **/
  updateElementPositions () {
    const elementOffset = getOffset(this.scrollableElement)

    if (this.options.horizontal) {
      this.setElementPositionHorizontal(this.fades.left, elementOffset, false)
      this.setElementPositionHorizontal(this.fades.right, elementOffset, true)

      if (this.arrows) {
        this.setElementPositionHorizontal(this.arrows.left, elementOffset, false)
        this.setElementPositionHorizontal(this.arrows.right, elementOffset, true)
      }
    }

    if (this.options.vertical) {
      this.setElementPositionVertical(this.fades.top, elementOffset, false)
      this.setElementPositionVertical(this.fades.bottom, elementOffset, true)

      if (this.arrows) {
        this.setElementPositionVertical(this.arrows.top, elementOffset, false)
        this.setElementPositionVertical(this.arrows.bottom, elementOffset, true)
      }
    }
  }

  setElementPositionHorizontal (element, elementOffset, includeOffset) {
    const offset = includeOffset ? `${this.elementWidth}px - ${this.options.fadeWidth}` : '0px'

    element.style.left = `calc(${elementOffset.left}px + ${offset})`
    element.style.top = `${elementOffset.top}px`
    element.style.height = `${this.elementHeight}px`
  }

  setElementPositionVertical (element, elementOffset, includeOffset) {
    const offset = includeOffset ? `${this.elementHeight}px - ${this.options.fadeWidth}` : '0px'

    element.style.left = `${elementOffset.left}px`
    element.style.top = `calc(${elementOffset.top}px + ${offset})`
    element.style.width = `${this.elementWidth}px`
  }

  /**
   * Add the directions (top, right, bottom, left) which match the options.
   **/
  setDirections () {
    this.directions = []

    if (this.options.horizontal) {
      this.directions.push('left', 'right')
    }

    if (this.options.vertical) {
      this.directions.push('top', 'bottom')
    }
  }

  /**
   * Calls the feature hooks for the supplied lifecycle method.
   **/
  hook (method) {
    this.options.features.forEach((feature) => feature[method] ? feature[method](this) : 0)
  }
}
