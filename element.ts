import {
  addStyle,
  indicatorBase,
  indicatorHorizontal,
  indicatorVertical,
} from './style'
import {
  directions,
  Instance,
  isEnd,
  isHorizontal,
  isStart,
  isVertical,
  Options,
  CSSProperties,
} from './types'

export const wrap = (element: HTMLElement) => {
  if (
    element.style.overflow !== 'auto' &&
    element.style.overflow !== 'scroll'
  ) {
    element.style.overflow = 'auto'
  }

  const wrapper = document.createElement('div')

  addStyle(wrapper, {
    position: 'relative',
  })

  // Wrap element in wrapper.
  element.parentNode.insertBefore(wrapper, element)
  wrapper.append(element)

  return wrapper
}

export const createInstance = (
  element: HTMLElement,
  options: Options
): Instance => {
  const getSpansByDirection = () => {
    const result = {}
    directions.forEach(
      (direction) => (result[direction] = document.createElement('span'))
    )
    return result
  }

  return {
    wrapper: wrap(element),
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
      ...indicatorBase,
      ...indicatorHorizontal,
      [direction]: '0',
    }

    if (isHorizontal(direction)) {
      Object.assign(style, indicatorHorizontal)
    }

    if (isVertical(direction)) {
      Object.assign(style, indicatorVertical)
    }

    addStyle(indicator, style)
    instance.wrapper.append(indicator)
  })
}

export const addObservers = (instance: Instance) => {
  directions.forEach((direction) => {
    const observer = instance.observer[direction]
    const style: CSSProperties = {
      background: 'red',
    }

    if (isHorizontal(direction)) {
      style.width = '10px'
    }

    if (isVertical(direction)) {
      style.height = '10px'
    }

    addStyle(observer, style)

    if (isStart(direction)) {
      instance.element.prepend(observer)
    }

    if (isEnd(direction)) {
      instance.element.append(observer)
    }
  })
}
