import {
  CSSProperties,
  Direction,
  Options,
  isHorizontal,
  isVertical,
  Theme,
  Inline,
} from './types'

const directionToRotation = {
  [Direction.left]: 180,
  [Direction.right]: 0,
  [Direction.top]: 270,
  [Direction.bottom]: 90,
}

// Apply style object as inline-style to an element.
const add = (element: HTMLElement, properties: CSSProperties) => {
  Object.keys(properties).forEach((property) => {
    element.style[property] = properties[property]
  })
}

const alignment = (
  direction: Direction,
  options: Options,
  observer = false
) => {
  const style: CSSProperties = {}
  const horizontal = isHorizontal(direction)
  const vertical = isVertical(direction)

  if (horizontal) {
    style.top = '0'
  }

  if (vertical) {
    style.left = '0'
  }

  // Minimally possible observer width.
  const size = observer ? '1px' : options.width

  style.width = horizontal ? size : '100%'
  style.height = vertical ? size : '100%'

  return style
}

export const base = {
  indicator: (_: HTMLElement, options: Options, direction: Direction) => {
    const style: CSSProperties = {
      position: 'absolute',
      // Initially hidden.
      display: 'none',
      cursor: options.click ? 'pointer' : 'inherit',
      [direction]: '0',
    }

    if (isHorizontal(direction)) {
      style.alignItems =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.justifyContent = 'center'
    } else {
      style.justifyContent =
        options.arrow && options.arrow.position !== 'center'
          ? `flex-${options.arrow.position}`
          : 'center'
      style.alignItems = 'center'
    }

    return { ...style, ...alignment(direction, options) }
  },
  hide: (indicator: HTMLSpanElement) => {
    indicator.style.display = 'none'
  },
  show: (indicator: HTMLSpanElement) => {
    indicator.style.display = 'flex'
  },
  arrow: (_: HTMLElement, __: Options, direction: Direction) => ({
    width: '12px',
    height: '12px',
    display: 'block',
    transform: `rotate(${directionToRotation[direction]}deg)`,
  }),
  outerWrapper: (_: HTMLElement, __: Options, ___: boolean, inline: Inline) => {
    const styles: CSSProperties = { position: 'relative' }

    if (inline) {
      styles.display = inline === 'inline' ? 'inline-block' : inline
    }

    return styles
  },
  element: (
    element: HTMLElement,
    _: Options,
    table: boolean,
    inline: Inline
  ) => {
    const styles: CSSProperties = {}

    if (inline) {
      styles.display = inline === 'inline' ? 'inline-block' : inline
      styles.verticalAlign = 'top'
    }

    // Make element scrollable.
    if (!table && element.style.overflow !== 'scroll') {
      styles.overflow = 'auto'
    }

    if (table) {
      styles.position = 'relative'
      styles.display = 'inline-block'
      styles.verticalAlign = 'top'
    }

    return styles
  },
  innerWrapper: (element: HTMLElement, _: Options, table: boolean) => {
    const styles: CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      // Avoid small bottom space otherwise added by inline-.
      verticalAlign: 'top',
    }

    if (table && element && element.style.overflow !== 'scroll') {
      styles.overflow = 'auto'
    }

    return styles
  },
  observer: (_: HTMLElement, options: Options, direction: Direction) =>
    ({
      position: 'absolute',
      pointerEvents: 'none',
      [direction]: '0',
      ...alignment(direction, options, true),
    } as CSSProperties),
}

type ThemeKey = keyof Theme

const apply = (
  method: ((...args: any[]) => CSSProperties | void) | CSSProperties,
  ...args: any[]
) => {
  if (typeof method === 'object') {
    return method
  }

  const result = method(...args)

  if (typeof result === 'object') {
    return result
  }

  return undefined
}

// Base theme usually applied as required for plugin to work.
// show and hide will not be extended when overridden by theme.
const applyBaseTheme = (
  key: ThemeKey,
  element: HTMLElement,
  options: Options,
  args: any[]
) => {
  if (['show', 'hide'].includes(key) && options.theme[key]) {
    return {}
  }

  return apply(base[key], element, options, ...args)
}

export const theme = (
  element: HTMLElement,
  key: ThemeKey,
  options: Options,
  ...args: any[]
) => {
  let userProperties: CSSProperties | undefined

  if (options.theme && options.theme[key]) {
    userProperties = apply(options.theme[key], element, options, ...args)
  }

  let baseProperties = applyBaseTheme(key, element, options, args)

  // Add simple user styles from options.
  if (
    typeof options.inlineStyles === 'object' &&
    typeof options.inlineStyles[key] === 'object'
  ) {
    baseProperties = { ...baseProperties, ...options.inlineStyles[key] }
  }

  // Add default theme or user theme.
  const styles = userProperties
    ? { ...baseProperties, ...userProperties }
    : baseProperties

  if (styles) {
    add(element, styles)
  }
}

export const hideScrollbar = (element: HTMLElement) => {
  add(element, {
    // Hide scrollbar in IE and Edge.
    // @ts-ignore
    '-ms-overflow-style': 'none',
    // Hide scrollbar in Firefox.
    'scrollbar-width': 'none',
  })
}
