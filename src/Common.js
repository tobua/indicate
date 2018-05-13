import addClass from './helpers/add-class'
import hasClass from './helpers/has-class'
import removeClass from './helpers/remove-class'
import getSize from './helpers/get-size'
import ClassNames from './constants/class-names'

import './helpers/node-remove-polyfill'
import assign from 'object-assign'

import './styles/common.scss'
import './styles/fades.scss'
import './styles/arrows.scss'

export default class Common {
  constructor (element, options) {
    this.element = element
    this.container = element
    this.options = options
    this.directions = []
    this.fades = {}
    this.arrows = {}
    this.id = Math.random() * (999 - 1) + 1
    addClass(this.element, ClassNames.element)

    this.initFunction = () => this.init()
    this.resizeFunction = () => this.resize()
    this.scrollFunction = () => this.scroll()

    this.hook('setup')
  }

  /**
   * To be called from descendants, once ready.
   **/
  init () {
    this.hook('init')

    const shouldInitHorizontal = this.shouldInitHorizontal()
    const shouldInitVertical = this.shouldInitVertical()

    // Listen again to this function, removed in create if possible
    window.addEventListener('resize', this.initFunction)

    if (shouldInitHorizontal || shouldInitVertical) {
      // Initialize the plugin, as at least one direction missing.
      this.create()
      this.resize()
    }
  }

  /**
   * Adds all the things necessary for the effect.
   **/
  create () {
    this.setDirections()
    this.updateFadeElements()
    this.updateArrows()
    this.addListeners()
    this.hideInitial()

    this.hook('create')

    if (
      (this.isHorizontal() || !this.options.horizontal) &&
      (this.isVertical() || !this.options.vertical)
    ) {
      // No more listening to the init event necessary
      window.removeEventListener('resize', this.initFunction)
    }
  }

  /**
   * Updates an exising instance when new options are received.
   **/
  update (options) {
    this.options = assign(this.options, options)
    this.setDirections()
    this.updateFadeElements()
    this.updateArrows()

    this.hook('update')

    this.resize() // Resize after hook (max-height change)
  }

  /**
   * Cleans up the instance.
   **/
  destroy () {
    window.removeEventListener('resize', this.resizeFunction)
    window.removeEventListener('resize', this.initFunction)
    this.container.removeEventListener('scroll', this.scrollFunction)
    this.removeFadeElements(this.directions)
    this.removeArrows(true)
    removeClass(this.element, ClassNames.element)
  }

  /**
   * Adapts element states (shown/hidden) after the scroll position has changed.
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
   *
   * NOTE to be called by descendant via super.scrollHorizontal
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
   *
   * NOTE to be called by descendant via super.scrollVertical
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
   * Adapt container measurements on resize.
   **/
  resize () {
    window.requestAnimationFrame(() => this.updateElementPositions())

    this.scroll()
  }

  /**
   * Hides the fades and arrows if they're not yet hidden.
   **/
  hide (direction) {
    if (!hasClass(this.fades[direction], ClassNames.hide)) {
      addClass(this.fades[direction], ClassNames.hide)
    }

    const arrow = this.arrows[direction]

    if (arrow && !hasClass(arrow, ClassNames.hide)) {
      addClass(arrow, ClassNames.hide)
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
    if (hasClass(this.fades[direction], ClassNames.hide)) {
      removeClass(this.fades[direction], ClassNames.hide)
    }

    const arrow = this.arrows[direction]

    if (arrow && hasClass(arrow, ClassNames.hide)) {
      removeClass(arrow, ClassNames.hide)
    }
  }

  /**
   * Inserts the fade elements for all the directions provided.
   **/
  updateFadeElements () {
    this.removeUnnecessaryFadeElements()

    this.directions.forEach((direction, index) => {
      if (this.fades[direction]) {
        return
      }
      this.fades[direction] = document.createElement('div')
      this.fades[direction].className = ClassNames[`fade-${direction}`]
      this.container.appendChild(this.fades[direction])
    })
  }

  /**
   * Removes fade elements that are not needed anymore.
   **/
  removeUnnecessaryFadeElements () {
    if (!this.options.horizontal && this.isHorizontal()) {
      this.removeFadeElements(['left', 'right'])
    }

    if (!this.options.vertical && this.isVertical()) {
      this.removeFadeElements(['top', 'bottom'])
    }
  }

  /**
   * Removes the fade elements for the given directions.
   **/
  removeFadeElements (directions) {
    directions.forEach(direction => {
      this.fades[direction].remove()
      delete this.fades[direction]
    })
  }

  /**
   * Inserts the arrows for all the directions provided.
   **/
  updateArrows () {
    this.directions.forEach(direction => {
      if (this.arrows[direction]) {
        return
      }
      this.arrows[direction] = document.createElement('div')
      this.arrows[direction].className = ClassNames[`arrow-${direction}`]
      this.container.appendChild(this.arrows[direction])
    })

    this.removeArrows(false)
  }

  /**
   * Removes arrow nodes. Node removed if either removeAll, direction does not
   * apply or arrows are deactivated.
   **/
  removeArrows (removeAll) {
    Object.keys(this.arrows).forEach(key => {
      const directionMissing = this.directions.indexOf(key) === -1
      if (removeAll || directionMissing || !this.options.arrows) {
        this.arrows[key].remove()
        delete this.arrows[key]
      }
    })
  }

  /**
   * Adds the listeners for resize and scroll.
   **/
  addListeners () {
    window.addEventListener('resize', this.resizeFunction)
    this.element.addEventListener('scroll', this.scrollFunction)
  }

  /**
   * Update the position of the fade elements.
   **/
  updateElementPositions () {
    this.hook('updateElementPositions')
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
   * Is the instance currently initialized horizontally.
   **/
  isHorizontal () {
    return Boolean(this.fades['left'])
  }

  /**
   * Is the instance currently initialized vertically.
   **/
  isVertical () {
    return Boolean(this.fades['top'])
  }

  /**
   * Calls the feature hooks for the supplied lifecycle method.
   **/
  hook (method) {
    this.options.features.forEach((feature) => feature[method] ? feature[method](this) : 0)
  }

  /**
   * Returns the width of the scrollable element on screen (not the content).
   **/
  elementWidth () {
    return getSize(this.element).width
  }

  /**
   * Returns the full width of the scrollable element, including parts not
   * visible without scrolling.
   **/
  contentWidth () {
    return this.element.scrollWidth
  }

  /**
   * Returns the width of the scrollable element on screen (not the content).
   **/
  elementHeight () {
    return getSize(this.element).height
  }

  /**
   * Returns the full width of the scrollable element, including parts not
   * visible without scrolling.
   **/
  contentHeight () {
    return this.element.scrollHeight
  }
}
