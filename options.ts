import { theme } from './style'
import { Options, PluginOptions } from './types'

export const defaultOptions: Options = {
  arrow: {
    position: 'center',
  },
  theme,
  color: '#FFFFFF',
  width: '20px',
  click: {
    denominator: 2,
  },
}

export const getOptions = (options: PluginOptions) => {
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

  return shallowMerge
}
