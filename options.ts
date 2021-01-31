import { theme } from './style'
import { Options, PluginOptions } from './types'

export const defaultOptions: Options = {
  arrow: true,
  arrowPosition: 'center',
  theme,
  color: '#FFFFFF',
  width: '20px',
  click: true,
}

export const getOptions = (options: PluginOptions) => ({
  ...defaultOptions,
  ...options,
})
