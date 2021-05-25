import { Direction, Options, Theme } from '../types'

export default {
  indicator: (_, options: Options, direction: Direction) => ({
    background: `linear-gradient(to ${direction}, rgba(255, 255, 255, 0), ${options.color} 25%)`,
    width: '100px',
  }),
  arrow: () => ({
    padding: '0 12px',
    width: '6px',
    height: '6px',
  }),
} as Theme
