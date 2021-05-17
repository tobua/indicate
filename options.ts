import { Options, PluginOptions } from './types'
import { defaultTheme } from './theme/default'
import { log } from './helper'

export const defaultOptions: Options = {
  arrow: {
    position: 'center',
    icon: 'arrow-rounded',
    color: '#000000',
  },
  color: '#FFFFFF',
  width: '20px',
  click: {
    denominator: 2,
  },
  hideScrollbar: true,
  moveStylesToWrapper: false,
}

export const getOptions = (options: PluginOptions = {}) => {
  const shallowMerge = {
    ...defaultOptions,
    ...options,
  }

  // Manually deep merge where necessary, to avoid adding dependency for this.
  if (typeof shallowMerge.arrow === 'object') {
    shallowMerge.arrow = {
      ...defaultOptions.arrow,
      ...shallowMerge.arrow,
    }
  }

  if (typeof shallowMerge.click === 'object') {
    shallowMerge.click = {
      ...defaultOptions.click,
      ...shallowMerge.click,
    }
  }

  if (shallowMerge.arrow === true) {
    shallowMerge.arrow = defaultOptions.arrow
  }

  if (shallowMerge.click === true) {
    shallowMerge.click = defaultOptions.click
  }

  if (shallowMerge.theme && typeof shallowMerge.theme !== 'object') {
    log('InvalidTheme', { theme: shallowMerge.theme })
    delete shallowMerge.theme
  } else if (!shallowMerge.theme) {
    shallowMerge.theme = defaultTheme
  }

  return shallowMerge
}
