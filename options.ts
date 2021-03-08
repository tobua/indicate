import { theme } from './style'
import { Options, PluginOptions } from './types'

export const defaultOptions: Options = {
  arrow: {
    position: 'center',
  },
  theme,
  color: '#FFFFFF',
  width: '20px',
  click: true,
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

  if (shallowMerge.arrow === true) {
    shallowMerge.arrow = defaultOptions.arrow
  }

  return shallowMerge
}
