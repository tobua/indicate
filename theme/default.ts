import { Options, Direction, Theme } from '../types'

export const defaultTheme: Theme = {
  indicator: (_, options: Options, direction: Direction) => ({
    background: `linear-gradient(to ${direction}, rgba(255, 255, 255, 0), ${options.color})`,
    // Initially not visible.
    opacity: '0',
    display: 'flex',
  }),
  hide: (indicator: HTMLElement) => {
    indicator.style.opacity = '0'
    indicator.style.pointerEvents = 'none'

    // Avoid initial animation.
    if (!indicator.style.transition) {
      indicator.style.transition = 'opacity 300ms linear'
    }
  },
  show: (indicator: HTMLSpanElement) => {
    indicator.style.opacity = '1'
    indicator.style.pointerEvents = 'auto'
  },
}
