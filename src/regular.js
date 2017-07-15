import hasClass from './helpers/hasClass'
import addClass from './helpers/addClass'
import removeClass from './helpers/removeClass'
import getOffset from './helpers/getOffset'
import ClassNames from './constants/classNames'
import './styles/regular.scss'

export default class Regular {
  constructor (element, options) {
    console.log('Regular constructor()')

    this.element = element
    this.options = options

    if (hasClass(this.element, ClassNames.elementClass)) {
      this.update()
    } else {
      this.create()
    }

    this.resize()
  }

  create () {
    console.log('create()')
    // Create nodes from string template and store them in config.

    this.element.className += ' ' + ClassNames.elementClass
    this.insertFadeElements()
    this.registerHandlers()
  }

  update () {
    console.log('update()')
  }

  registerHandlers () {
    this.element.addEventListener('scroll', this.scroll.bind(this))
    window.addEventListener('resize', this.resize.bind(this))
  }

  scroll () {
    console.log('scroll()')
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

  hide (direction) {
    console.log('hide(' + direction)
    const Direction = direction.charAt(0).toUpperCase() + direction.slice(1)

    if (!this['is' + Direction + 'Hidden']) {
      this['is' + Direction + 'Hidden'] = true
      addClass(this['fade' + Direction], 'hide')
    }
  }

  show (direction) {
    console.log('show(' + direction)
    const Direction = direction.charAt(0).toUpperCase() + direction.slice(1)

    if (this['is' + Direction + 'Hidden']) {
      this['is' + Direction + 'Hidden'] = false
      removeClass(this['fade' + Direction], 'hide')
    }
  }

  resize () {
    console.log('resize()')
    this.updateFadeElementPosition()
    // TODO check if scrollWidth necessary in any browsers
    this.elementFullWidth = Math.max(this.element.getBoundingClientRect().width, this.element.scrollWidth)
    this.elementFullHeight = Math.max(this.element.getBoundingClientRect().height, this.element.scrollHeight)

    this.elementVisibleWidth = this.element.clientWidth
    this.elementVisibleHeight = this.element.clientHeight
  }

  insertFadeElements () {
    const directions = this.getApplicableDirections()

    directions.map((direction, index) => {
      const Direction = direction.charAt(0).toUpperCase() + direction.slice(1)
      this['fade' + Direction] = document.createElement('div')
      this['fade' + Direction].className = ClassNames['fade' + Direction + 'Class']
      this.element.parentNode.appendChild(this['fade' + Direction])

      // Initially it's not possible to scroll to top or left.
      if (direction === 'left' || direction === 'top') {
        this.hide(direction)
      }
    })
  }

  updateFadeElementPosition () {
    const elementOffset = getOffset(this.element)

    if (this.options.horizontal) {
      this.fadeLeft.style.left = elementOffset.left + 'px'
      this.fadeLeft.style.top = elementOffset.top + 'px'
      this.fadeRight.style.left = elementOffset.left + (this.element.getBoundingClientRect().width - 20) + 'px'
      this.fadeRight.style.top = elementOffset.top + 'px'
    }

    if (this.options.vertical) {
      this.fadeTop.style.left = elementOffset.left + 'px'
      this.fadeTop.style.top = elementOffset.top + 'px'
      this.fadeTop.style.width = this.element.getBoundingClientRect().width + 'px'
      this.fadeBottom.style.top = elementOffset.top + (this.element.getBoundingClientRect().height - 20) + 'px'
      this.fadeBottom.style.left = elementOffset.left + 'px'
      this.fadeBottom.style.width = this.element.getBoundingClientRect().width + 'px'
    }
  }

  getApplicableDirections () {
    let out = []

    if (this.options.horizontal) {
      out.push('left', 'right')
    }

    if (this.options.vertical) {
      out.push('top', 'bottom')
    }

    return out
  }
}
