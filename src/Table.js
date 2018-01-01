import Block from './Block'
import addClass from './helpers/addClass'
import ClassNames from './constants/classNames'
import './styles/table.scss'

export default class Table extends Block {
  makeElementResponsive () {
    const parentElement = this.element.parentElement
    const tagName = parentElement.tagName

    if (tagName.toLowerCase() !== 'div') {
      this.addWrapper(parentElement)
    } else {
      addClass(parentElement, ClassNames.tableWrapper)
      this.scrollableElement = parentElement
      this.parent = parentElement.parentElement
    }
  }

  addWrapper (parentElement) {
    const wrapper = document.createElement('div')
    parentElement.replaceChild(wrapper, this.element)
    wrapper.className = ClassNames.tableWrapper
    wrapper.appendChild(this.element)
    this.scrollableElement = wrapper
    this.parent = wrapper.parentElement
  }
}
