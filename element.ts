import { theme, hideScrollbar } from './style'
import { directions, Instance, Options, Direction } from './types'
import { registerClickListener } from './feature/click'
import { wrapTable } from './feature/table'
import { move } from './feature/move-styles'
import {
  isTable,
  hideScrollbarWithWebkitPseudoClass,
  wrapElementIn,
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
}: {
  element: HTMLElement
  options: Options
}) => {
  if (isTable(element)) {
    return wrapTable({ element, options })
  }

  // Wrapper arount the element to position the indicators.
  const outerWrapper = options.outerWrapper ?? document.createElement('div')

  theme(outerWrapper, 'outerWrapper', options)

  if (!options.outerWrapper) {
    wrapElementIn(element, outerWrapper)
  }

  // Wrapper around the content of the element.
  // Allows to position observers absolutely inside (due to inline-block).
  const innerWrapper = options.innerWrapper ?? document.createElement('div')

  theme(innerWrapper, 'innerWrapper', options)

  if (!options.innerWrapper) {
    wrapContentsWith(element, innerWrapper)
  }

  return { outerWrapper, innerWrapper }
}

export const createInstance = (
  element: HTMLElement,
  options: Options
): Instance => {
  const getSpansByDirection = () => {
    const result = {}
    directions.forEach((direction) => {
      result[direction] = document.createElement('span')
    })
    return result
  }

  const { outerWrapper, innerWrapper } = wrap({ element, options })

  move(element, outerWrapper, options)

  theme(element, 'element', options)

  if (options.hideScrollbar) {
    const scrollableElement = isTable(element) ? innerWrapper : element

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
  } as Instance
}

const createSvgLine = (x1: string, y1: string, x2: string, y2: string) => {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  line.setAttribute('stroke-linecap', 'round')
  line.setAttribute('stroke-width', '20')
  line.setAttribute('stroke', 'black')
  line.setAttribute('x1', x1)
  line.setAttribute('y1', y1)
  line.setAttribute('x2', x2)
  line.setAttribute('y2', y2)

  return line
}

const createRightArrowIcon = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 120 120')

  svg.appendChild(createSvgLine('10', '60', '110', '60'))
  svg.appendChild(createSvgLine('108.213', '57.3553', '61.5442', '10.6863'))
  svg.appendChild(createSvgLine('61.5442', '109.213', '108.213', '62.5442'))

  return svg
}

const addArrow = (
  instance: Instance,
  indicator: HTMLSpanElement,
  direction: Direction
) => {
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
    arrow = createRightArrowIcon()
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
    if (isTable(instance.element)) {
      instance.element.append(observer)
    } else {
      instance.innerWrapper.append(observer)
    }
  })
}
