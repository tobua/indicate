import { groupBy } from 'lodash'
import hasClass from './helpers/hasClass'
import addClass from './helpers/addClass'
import removeClass from './helpers/removeClass'
import getOffset from './helpers/getOffset'
import ClassNames from './constants/classNames'
import './styles/fades.scss'
import './styles/arrows.scss'

export default class Regular {
  constructor (element, options) {
    console.log('Regular constructor()')

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

  create () {
    console.log('create()')

    this.element.className += ` ${ClassNames.elementClass}`
    this.setDirections()
    this.insertFadeElements()
    this.insertArrows()
    this.hideInitial()
    this.registerListeners()
  }

  update () {
    console.log('update()')

    this.setDirections()
  }

  registerListeners () {
    this.element.addEventListener('scroll', () => this.scroll())
    window.addEventListener('resize', () => this.resize())

    this.directions.map(direction => {
      const element = this.arrows[direction] || this.fades[direction]
      element.addEventListener('click', this.handleClick)
    })
  }

  handleClick (event) {
    const direction = event.target.className.match(/[\w]*($|\s)/)[0];

    console.log('TODO scroll');
  }

  scroll () {
    if (this.options.horizontal) {
      this.scrollHorizontal()
    }

    if (this.options.vertical) {
      this.scrollVertical()
    }
  }

  scrollHorizontal () {
    console.log('scrollHorizontal()')
    const scrollLeft = this.element.scrollLeft

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

  scrollVertical () {
    console.log('scrollVertical()')
    const scrollTop = this.element.scrollTop

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

  resize () {
    console.log('resize()')
    this.updateElementPositions()
    // TODO check if scrollWidth necessary in any browsers
    // TODO BUGGY
    this.elementFullWidth = Math.max(this.element.getBoundingClientRect().width, this.element.scrollWidth)
    this.elementFullHeight = Math.max(this.element.getBoundingClientRect().height, this.element.scrollHeight)

    this.elementVisibleWidth = this.element.clientWidth
    this.elementVisibleHeight = this.element.clientHeight
  }

  hide (direction) {
    console.log(`hide(${direction})`)
    const hidePropertyName = `is${direction}Hidden`

    if (!this[hidePropertyName]) {
      this[hidePropertyName] = true
      addClass(this.fades[direction], 'hide')
      addClass(this.arrows[direction], 'hide')
    }
  }

  hideInitial () {
    this.hide('top')
    this.hide('left')
  }

  show (direction) {
    console.log(`show(${direction})`)
    const hidePropertyName = `is${direction}Hidden`

    if (this[hidePropertyName]) {
      this[hidePropertyName] = false
      removeClass(this.fades[direction], 'hide')
      removeClass(this.arrows[direction], 'hide')
    }
  }

  insertFadeElements () {
    this.fades = {}

    this.directions.map((direction, index) => {
      this.fades[direction] = document.createElement('div')
      this.fades[direction].className = ClassNames[`fade-${direction}`]
      this.element.parentNode.appendChild(this.fades[direction])
    })
  }

  insertArrows () {
    if (!this.options.arrows) {
      return;
    }

    this.arrows = {}

    this.directions.map(direction => {
      this.arrows[direction] = document.createElement('div')
      this.arrows[direction].className = ClassNames[`arrow-${direction}`]
      this.element.parentNode.appendChild(this.arrows[direction])
    })
  }

  updateElementPositions () {
    const elementOffset = getOffset(this.element)

    if (this.options.horizontal) {
      this.fades.left.style.left = elementOffset.left + 'px'
      this.fades.left.style.top = elementOffset.top + 'px'
      this.fades.right.style.left = elementOffset.left + (this.element.getBoundingClientRect().width - 20) + 'px'
      this.fades.right.style.top = elementOffset.top + 'px'

      this.arrows.left.style.left = elementOffset.left + 'px'
      this.arrows.left.style.top = elementOffset.top + 'px'
      this.arrows.right.style.left = elementOffset.left + (this.element.getBoundingClientRect().width - 20) + 'px'
      this.arrows.right.style.top = elementOffset.top + 'px'
    }

    if (this.options.vertical) {
      this.fades.top.style.left = elementOffset.left + 'px'
      this.fades.top.style.top = elementOffset.top + 'px'
      this.fades.top.style.width = this.element.getBoundingClientRect().width + 'px'
      this.fades.bottom.style.top = elementOffset.top + (this.element.getBoundingClientRect().height - 20) + 'px'
      this.fades.bottom.style.left = elementOffset.left + 'px'
      this.fades.bottom.style.width = this.element.getBoundingClientRect().width + 'px'

      this.arrows.top.style.left = elementOffset.left + 'px'
      this.arrows.top.style.top = elementOffset.top + 'px'
      this.arrows.top.style.width = this.element.getBoundingClientRect().width + 'px'
      this.arrows.bottom.style.top = elementOffset.top + (this.element.getBoundingClientRect().height - 20) + 'px'
      this.arrows.bottom.style.left = elementOffset.left + 'px'
      this.arrows.bottom.style.width = this.element.getBoundingClientRect().width + 'px'
    }
  }

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
   * Collects all CSS changes. All these will be applied one when the plugin
   * has finished initializing.
   **/
  setCSS(selector, attribute, value) {
    this.cssQueue.push({
      selector,
      attribute,
      value,
    })
  }

  /**
   * Applies all the collected styles and clears the queue.
   **/
  applyCSS() {
    const bySelectors = groupBy(this.cssQueue, 'selector')
    const byAttributes = bySelectors.keys().map(key => groupBy(bySelectors[key], 'attribute'))

    // TODO log and test

    byAttributes.keys().map(key => {
      const item = bySelectors[key]
      const node = this.element.querySelector(key)
      node.style[item.attribute] = item.value
    })

    this.cssQueue = []
  }
}
