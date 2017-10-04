import Regular from './regular'

/**
 * Otherwise table will ignore width assigned.
 * https://stackoverflow.com/questions/17770257/scrolling-tables-horizontally-without-wrapping-them-in-div
 **/
const makeTableElementResponsive = (element) => {
  if (!element.style.display || element.style.display === 'table') {
    element.style.display = 'block'
  }

  if (element.style.position !== 'relative') {
    element.style.position = 'relative'
  }
}

export default class Table extends Regular {
  constructor (element, options) {
    // Needs to be called before super()
    makeTableElementResponsive(element);
    super(element, options)
  }
}
