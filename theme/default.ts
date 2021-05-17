import { Options, Direction, Theme } from '../types'

export const defaultTheme: Theme = {
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
