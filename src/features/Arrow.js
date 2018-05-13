import Feature from './Feature'
import addClass from './../helpers/add-class'

/**
 * Abstract class to provide arrow related functionality.
 **/
export default class Arrow extends Feature {
  setArrowRotation (arrow, direction) {
    if (direction === 'top') {
      arrow.style.transform = 'rotate(90deg)'
    }
    if (direction === 'right') {
      arrow.style.transform = 'rotate(180deg)'
    }
    if (direction === 'bottom') {
      arrow.style.transform = 'rotate(270deg)'
    }
  }

  setArrowPosition (instance) {
    const arrowPosition = this.options.arrowPosition

    instance.directions.map(direction => {
      // This feature only applies horizontally
      if (direction === 'left' || direction === 'right') {
        instance.arrows[direction].style.display = 'flex'
        instance.arrows[direction].style.alignItems = `flex-${arrowPosition}`
      }
    })
  }

  hideDefaultArrows (arrow) {
    // Removes the default before element.
    addClass(arrow, 'idc-no-before')
  }
}
