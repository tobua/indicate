import Feature from './Feature'
import Table from './../Table'
import addClass from './../helpers/add-class'
import removeClass from './../helpers/remove-class'
import ClassNames from './../constants/class-names'
import responsiveElement from './../helpers/responsive-element'

/**
 * This will add a wrapper if the element itself is not scrollable (inline).
 *
 * Tables themselves cannot be responsive therefore the parent will be checked
 * and replaced by an eventual wrapper.
 **/
export default class Wrapper extends Feature {
  static check (options) {
    return true
  }

  setup (instance) {
    // Reference the Common instance
    this._ = instance

    // Wrapper forced by options
    if (instance.options.forceWrapper) {
      return this.add()
    }

    // Table, always needs a wrapper, check if parent can be used.
    if (instance instanceof Table) {
      return this.initTable(instance)
    }

    return this.initRegular(instance)
  }

  initTable (instance) {
    const parent = instance.element.parentElement
    const absolute = Boolean(instance.options.absolutePositioning)

    if (!absolute || !responsiveElement(parent)) {
      this.add()
    }

    if (absolute || responsiveElement(parent)) {
      return this.set(parent)
    }

    return this.add()
  }

  initRegular (instance) {
    // Don't add wrapper if absolute is set and element is responsive.
    if (
      instance.options.absolutePositioning &&
      responsiveElement(instance.element)
    ) {
      return this.set(instance.element)
    }

    this.add()
  }

  getParent () {
    return this._.container.parentElement
  }

  /**
   * Add or remove the wrapper on update.
   **/
  update (instance) {
    const forceWrapper = instance.options.forceWrapper

    if (forceWrapper && !this.wrapperAdded) {
      return this.add()
    }

    // Wrapper added even though parent could be used
    if (!forceWrapper && this.wrapperAdded && responsiveElement(this.getParent())) {
      this.remove()
    }
  }

  /**
  * Removes the table wrapper if one was added when initializing the plugin.
  **/
  destroy () {
    if (this.wrapperAdded) {
      this.remove()
    }
  }

  /**
   * Add a wrapper to the element.
   **/
  add () {
    const wrapper = document.createElement('div')
    // Add new wrapper in between parent and element
    this.getParent().replaceChild(wrapper, this._.container)
    wrapper.appendChild(this._.container)
    // Set as the current wrapper

    this.set(wrapper)

    this.wrapperAdded = true
  }

  /**
   * Sets the references to the wrapper and it's parent.
   **/
  set (element) {
    removeClass(this._.container, ClassNames.container)
    removeClass(this._.container, ClassNames.element)
    this._.element = this._.container
    addClass(this._.element, ClassNames.element)
    this._.container = element
    addClass(this._.container, ClassNames.container)
    removeClass(this.getParent(), ClassNames.container)
  }

  /**
   * This will remove the wrapper.
   **/
  remove () {
    if (this._.element === this._.container) {
      return console.warn('Trying to remove the wrapper when none there.')
    }

    const contentNodes = this._.container.childNodes
    // Attach element to the parent.
    for (let i = 0; i < contentNodes.length; i++) {
      this.getParent().appendChild(contentNodes[i])
    }
    // Remove wrapper references
    this._.container.remove()
    // Switch references to the parent
    this._.container = this._.element
    addClass(this._.element, ClassNames.container)

    this.wrapperAdded = false
  }
}
