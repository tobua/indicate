import { theme, hideScrollbar } from './style'
import { directions, Instance, Options, Direction, Inline } from './types'
import { registerClickListener } from './feature/click'
import { wrapTable } from './feature/table'
import { move } from './feature/move-styles'
import {
  isTable,
  isInline,
  hideScrollbarWithWebkitPseudoClass,
  wrapElementIn,
  arrowIcon,
} from './helper'

// <element>{contents}</element> => <element><wrapper>{contents}<wrapper/></element>
const wrapContentsWith = (element: HTMLElement, wrapper: HTMLElement) => {
  wrapper.innerHTML = element.innerHTML
  element.innerHTML = ''
  element.appendChild(wrapper)
}

const wrap = ({
  element,
  options,
  table,
  inline,
}: {
  element: HTMLElement
  options: Options
  table: boolean
  inline: Inline
}) => {
  if (table) {
    return wrapTable({ element, options })
  }

  // Wrapper arount the element to position the indicators.
  const outerWrapper = options.outerWrapper ?? document.createElement('div')

  theme(outerWrapper, 'outerWrapper', options, table, inline)

  if (!options.outerWrapper) {
    wrapElementIn(element, outerWrapper)
  }

  // Wrapper around the content of the element.
  // Allows to position observers absolutely inside (due to inline-block).
  const innerWrapper = options.innerWrapper ?? document.createElement('div')

  theme(innerWrapper, 'innerWrapper', options, table, inline)

  if (!options.innerWrapper) {
    wrapContentsWith(element, innerWrapper)
  }

  return { outerWrapper, innerWrapper }
}

export const createInstance = (element: HTMLElement, options: Options): Instance => {
  const table = isTable(element)
  const inline = isInline(element)
  const getSpansByDirection = () => {
    const result = {}
    directions.forEach((direction) => {
      result[direction] = document.createElement('span')
    })
    return result
  }

  const { outerWrapper, innerWrapper } = wrap({
    element,
    options,
    table,
    inline,
  })

  move(element, outerWrapper, options)

  theme(element, 'element', options, table, inline)

  if (options.hideScrollbar) {
    const scrollableElement = table ? innerWrapper : element

    hideScrollbar(scrollableElement)
    hideScrollbarWithWebkitPseudoClass(scrollableElement)
  }

  return {
    outerWrapper,
    innerWrapper,
    element,
    indicator: getSpansByDirection(),
    observer: getSpansByDirection(),
    options,
    table,
    inline,
  } as Instance
}

const addArrow = (instance: Instance, indicator: HTMLSpanElement, direction: Direction) => {
  const options = instance.options.arrow

  if (!options) {
    return
  }

  let arrow = null

  if (options.image) {
    arrow = document.createElement('img')
    arrow.src = options.image
    arrow.alt = `indicate arrow ${direction}`
  } else if (options.markup && options.markup !== '') {
    if (typeof options.markup === 'string') {
      arrow = document.createElement('span')
      arrow.innerHTML = options.markup
    } else {
      arrow = options.markup
    }
  } else {
    arrow = arrowIcon(options.icon, options.color)
  }

  theme(arrow, 'arrow', instance.options, direction)

  indicator.append(arrow)
}

export const addIndicators = (instance: Instance) => {
  directions.forEach((direction) => {
    const indicator = instance.indicator[direction]
    theme(indicator, 'indicator', instance.options, direction)
    instance.outerWrapper.append(indicator)
    registerClickListener(direction, indicator, instance)
    addArrow(instance, indicator, direction)
  })
}

export const addObservers = (instance: Instance) => {
  directions.forEach((direction) => {
    const observer = instance.observer[direction]
    theme(observer, 'observer', instance.options, direction)
    if (instance.table) {
      instance.element.append(observer)
    } else {
      instance.innerWrapper.append(observer)
    }
  })
}
