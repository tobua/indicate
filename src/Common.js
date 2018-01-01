import addClass from './helpers/addClass'
import removeClass from './helpers/removeClass'
import getOffset from './helpers/getOffset'
import getSize from './helpers/getSize'
import ClassNames from './constants/classNames'
import './styles/common.scss'
import './styles/fades.scss'
import './styles/arrows.scss'

export default class Common {
  constructor (element, options) {
    this.element = element
    this.options = options
    this.initFunction = () => this.init()
    this.resizeFunction = () => this.resize()
    this.scrollFunction = () => this.scroll()
  }

  /**
   * To be called from descendants, once ready.
   **/
  init () {
    this.makeElementResponsive()

    const shouldInitHorizontal = this.shouldInitHorizontal()
    const shouldInitVertical = this.shouldInitVertical()

    if (
      (this.options.horizontal && !shouldInitHorizontal) ||
      (this.options.vertical && !shouldInitVertical)
    ) {
      if (!this.initEventAdded) {
        this.initEventAdded = true
        window.addEventListener('resize', this.initFunction)
      }
    }

    if (
      (this.options.horizontal && this.initHorizontal) ||
      (this.options.vertical && this.initVertical)
    ) {
      window.removeEventListener('resize', this.initFunction)
    }

    if (
      (this.options.horizontal && shouldInitHorizontal && !this.initHorizontal) ||
      (this.options.vertical && shouldInitVertical && !this.initVertical)
    ) {
      this.create()
      this.resize()
    }
  }

  /**
   * Creates an instance.
   **/
  create () {
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

    this.resize()
  }

  /**
   * Cleans up the instance.
   **/
  destroy () {
    window.removeEventListener('resize', this.resizeFunction)
    window.removeEventListener('resize', this.initFunction)
  }

  /**
   * For regular elements no wrapper is needed.
   **/
  makeElementResponsive () {
    this.parent = this.element.parentElement
  }

  /**
   * Register the scorll, resize and arrow click listeners.
   **/
  registerListeners () {
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
   * Adapt elements after a scroll.
   **/
  scroll () {
    if (this.options.horizontal && this.fades.left) {
      this.scrollHorizontal()
    }

    if (this.options.vertical && this.fades.top) {
      this.scrollVertical()
    }
  }

  /**
   * Adapts the visibility of the horizontal elements after a scroll.
   **/
  scrollHorizontal (atStart, atEnd) {
    if (atStart) {
      this.hide('left')
    } else {
      this.show('left')
    }

    if (atEnd) {
      this.hide('right')
    } else {
      this.show('right')
    }
  }

  /**
   * Adapts the visibility of the vertical elements after a scroll.
   **/
  scrollVertical (atStart, atEnd) {
    if (atEnd) {
      this.hide('bottom')
    } else {
      this.show('bottom')
    }

    if (atStart) {
      this.hide('top')
    } else {
      this.show('top')
    }
  }

  /**
   * On page resize we need to adapt the container measurements.
   **/
  resize () {
    const scrollElementBounds = this.scrollableElement.getBoundingClientRect()
    const scrollElementSize = getSize(this.scrollableElement)

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
    if (this.fades.top) {
      this.hide('top')
    }
    if (this.fades.left) {
      this.hide('left')
    }
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

    if (this.options.horizontal && this.fades.left) {
      this.setElementPositionHorizontal(this.fades.left, elementOffset, false)
      this.setElementPositionHorizontal(this.fades.right, elementOffset, true)

      if (this.arrows) {
        this.setElementPositionHorizontal(this.arrows.left, elementOffset, false)
        this.setElementPositionHorizontal(this.arrows.right, elementOffset, true)
      }
    }

    if (this.options.vertical && this.fades.top) {
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

    if (this.options.horizontal && this.shouldInitHorizontal()) {
      this.initHorizontal = true
      this.directions.push('left', 'right')
    }

    if (this.options.vertical && this.shouldInitVertical()) {
      this.initVertical = true
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
