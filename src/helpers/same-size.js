import getSize from './get-size'

/**
 * Returns whether the two elements have the same size.
 **/
export default (first, second) => {
  first = getSize(first)
  second = getSize(second)

  return first.width === second.width && first.height === second.height
}
