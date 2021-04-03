import { Options, PluginOptions, Direction, Theme } from './types'
import { log } from './helper'

const defaultTheme: Theme = {
  indicator: (_, direction: Direction, options: Options) => ({
    background: `linear-gradient(to ${direction}, rgba(255, 255, 255, 0), ${options.color})`,
    // Initially not visible.
    opacity: '0',
    display: 'flex',
  }),
  hide: (indicator: HTMLElement) => {
    indicator.style.opacity = '0'

    // Avoid initial animation.
    if (!indicator.style.transition) {
      indicator.style.transition = 'opacity 300ms linear'
    }
  },
  show: (indicator: HTMLSpanElement) => {
    indicator.style.opacity = '1'
  },
}

export const defaultOptions: Options = {
  arrow: {
    position: 'center',
  },
  color: '#FFFFFF',
  width: '20px',
  click: {
    denominator: 2,
  },
  hideScrollbar: true,
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
