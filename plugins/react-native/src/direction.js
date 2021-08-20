// @flow
import type { Direction } from './types'

export const getDirectionFromBoolean = (
  horizontal: ?boolean,
  vertical: ?boolean
): Direction => {
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
