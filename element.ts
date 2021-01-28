import { addStyle, absolute, horizontal, vertical } from './style'
import {
  directions,
  Instance,
  isHorizontal,
  isVertical,
  Options,
  CSSProperties,
} from './types'

const wrapElementIn = (element: HTMLElement, wrapper: HTMLElement) => {
  element.parentNode.insertBefore(wrapper, element)
  wrapper.append(element)
}

// <element>{contents}</element> => <element><wrapper>{contents}<wrapper/></element>
const wrapContentsWith = (element: HTMLElement, wrapper: HTMLElement) => {
  wrapper.innerHTML = element.innerHTML
  element.innerHTML = ''
  element.appendChild(wrapper)
}

export const wrap = (element: HTMLElement) => {
  if (
    element.style.overflow !== 'auto' &&
    element.style.overflow !== 'scroll'
  ) {
    element.style.overflow = 'auto'
  }

  // Wrapper arount the element to position the indicators.
  const outerWrapper = document.createElement('div')

  addStyle(outerWrapper, {
    position: 'relative',
    display: 'block',
  })

  wrapElementIn(element, outerWrapper)

  // Wrapper around the content of the element.
  // Allows to position observers absolutely inside (due to inline-block).
  const innerWrapper = document.createElement('div')

  addStyle(innerWrapper, {
    position: 'relative',
    // TODO check if possible without inner wrapper if element is inline-block.
    display: 'inline-block',
  })

  wrapContentsWith(element, innerWrapper)

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

  const { outerWrapper, innerWrapper } = wrap(element)

  return {
    outerWrapper,
    innerWrapper,
    element,
    indicator: getSpansByDirection(),
    observer: getSpansByDirection(),
    options,
  } as Instance
}

export const addIndicators = (instance: Instance) => {
  directions.forEach((direction) => {
    const indicator = instance.indicator[direction]
    const style: CSSProperties = {
      ...absolute,
      ...instance.options.theme.indicator(direction, instance.options),
      [direction]: '0',
    }

    if (isHorizontal(direction)) {
      Object.assign(style, horizontal)
    }

    if (isVertical(direction)) {
      Object.assign(style, vertical)
    }

    addStyle(indicator, style)
    instance.outerWrapper.append(indicator)
  })
}

export const addObservers = (instance: Instance) => {
  directions.forEach((direction) => {
    const observer = instance.observer[direction]
    const style: CSSProperties = {
      ...absolute,
      background: 'red',
      [direction]: '0',
    }

    if (isHorizontal(direction)) {
      Object.assign(style, horizontal)
    }

    if (isVertical(direction)) {
      Object.assign(style, vertical)
    }

    addStyle(observer, style)

    instance.innerWrapper.append(observer)
  })
}
