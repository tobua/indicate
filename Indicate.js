class Regular {
  constructor() {
    console.log('Regular constructor')
  }
}

class IFrame extends Regular {
  constructor() {
    super()
    console.log('Iframe constructor')
  }
}

class Table extends Regular {
  constructor() {
    super()
    console.log('Table constructor')
  }
}

export class Indicate {
  constructor(targetElements, options) {
    if (typeof options !== 'object') {
      options = {}
    }

    console.log('element', targetElements, typeof targetElements)

    this.targetElements = targetElements
    this.instances = []
    this.options = options

    // TODO create several instances in case element is an array

    this.init()
    console.log('instances', this.instances)
  }

  /**
   * Initializes the instances depending on whether it's a single element or
   * an array of nodes.
   */
  init() {
    const elements = this.targetElements

    if (elements) {
      if (elements.length) {
        [].map.call(elements,
          (element) => this.createInstanceForElement(element)
        )
      } else {
        this.createInstanceForElement(elements)
      }
    }
  }

  /**
   * Creates an instance of the appropriate class depending on the elements tag.
   */
  createInstanceForElement(element) {
    const tagName = String(element.tagName).toLowerCase()

    switch (tagName) {
      case 'iframe':
        this.instances.push(new IFrame())
        break
      case 'table':
        this.instances.push(new Table())
      default:
        this.instances.push(new Regular())
    }
  }
}
