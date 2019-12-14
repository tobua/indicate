// @flow
export default (horizontal: ?boolean, vertical: ?boolean) => {
  if (typeof horizontal === 'undefined' && typeof vertical === 'undefined') {
    return 'both'
  }

  if (horizontal && vertical) {
    return 'both'
  }

  if (vertical) {
    return 'vertical'
  }

  return 'horizontal'
}
