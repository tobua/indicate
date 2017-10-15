import groupBy from 'lodash/groupBy'
import hasClass from './helpers/hasClass'
import addClass from './helpers/addClass'
import removeClass from './helpers/removeClass'
import getOffset from './helpers/getOffset'
import ClassNames from './constants/classNames'
import './styles/fades.scss'
import './styles/arrows.scss'
import './styles/regular.scss'

export default class Regular {
  constructor (element, options) {
    this.element = element
    this.options = options
    this.cssQueue = []

    if (hasClass(this.element, ClassNames.elementClass)) {
      this.update()
    } else {
      this.create()
    }

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
    this.setFadeColor()
    this.insertArrows()
    this.registerListeners()
    this.hideInitial()
    this.resize()
  }

  /**
   * Updates an exising instance when new options received.
   **/
  update () {
    this.setDirections()
    this.setFadeColor()
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
    this.scrollableElement.addEventListener('scroll', () => this.scroll())
    window.addEventListener('resize', () => this.resize())

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

    this.updateElementPositions()

    this.elementFullWidth = Math.max(scrollElementBounds.width, this.scrollableElement.scrollWidth)
    this.elementFullHeight = Math.max(scrollElementBounds.height, this.scrollableElement.scrollHeight)

    this.elementVisibleWidth = Math.max(this.scrollableElement.clientWidth, scrollElementBounds.width)
    this.elementVisibleHeight = Math.max(this.scrollableElement.clientHeight, scrollElementBounds.height)

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
    const scrollElementBounds = this.scrollableElement.getBoundingClientRect()

    if (this.options.horizontal) {
      this.setElementPositionHorizontal(this.fades.left, elementOffset, scrollElementBounds, false)
      this.setElementPositionHorizontal(this.fades.right, elementOffset, scrollElementBounds, true)

      if (this.arrows) {
        this.setElementPositionHorizontal(this.arrows.left, elementOffset, scrollElementBounds, false)
        this.setElementPositionHorizontal(this.arrows.right, elementOffset, scrollElementBounds, true)
      }
    }

    if (this.options.vertical) {
      this.setElementPositionVertical(this.fades.top, elementOffset, scrollElementBounds, false)
      this.setElementPositionVertical(this.fades.bottom, elementOffset, scrollElementBounds, true)

      if (this.arrows) {
        this.setElementPositionVertical(this.arrows.top, elementOffset, scrollElementBounds, false)
        this.setElementPositionVertical(this.arrows.bottom, elementOffset, scrollElementBounds, true)
      }
    }
  }

  setElementPositionHorizontal (element, elementOffset, scrollElementBounds, includeOffset) {
    const offset = includeOffset ? (scrollElementBounds.width - 20) : 0

    element.style.left = elementOffset.left + offset + 'px'
    element.style.top = elementOffset.top + 'px'
    element.style.height = scrollElementBounds.height + 'px'
  }

  setElementPositionVertical (element, elementOffset, scrollElementBounds, includeOffset) {
    const offset = includeOffset ? (scrollElementBounds.height - 20) : 0

    element.style.left = elementOffset.left + 'px'
    element.style.top = elementOffset.top + offset + 'px'
    element.style.width = scrollElementBounds.width + 'px'
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
   * Sets the fade color.
   **/
  setFadeColor () {
    const color = this.options.color

    if (color === '#FFFFFF') {
      return
    }

    this.directions.map(direction => {
      this.fades[direction].style.background = `linear-gradient(to ${direction}, rgba(255,255,255,0) 0%, ${color} 100%)`
    })
  }

  /**
   * Collects all CSS changes. All these will be applied one when the plugin
   * has finished initializing.
   **/
  setCSS (selector, attribute, value) {
    this.cssQueue.push({
      selector,
      attribute,
      value
    })
  }

  /**
   * Applies all the collected styles and clears the queue.
   **/
  applyCSS () {
    const bySelectors = groupBy(this.cssQueue, 'selector')
    const byAttributes = bySelectors.keys().map(key => groupBy(bySelectors[key], 'attribute'))

    byAttributes.keys().map(key => {
      const item = bySelectors[key]
      const node = this.element.querySelector(key)
      node.style[item.attribute] = item.value
    })

    this.cssQueue = []
  }
}
