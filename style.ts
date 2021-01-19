const addStyle = (element: HTMLElement, properties: object) => {
  for (const property in properties)
    element.style[property] = properties[property]
}

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

const indicator = {
  position: 'absolute',
  background: 'gray',
  opacity: 0.6,
}

const indicatorHorizontal = {
  height: '100%',
  width: '20px',
  top: '0',
}

export const addIndicators = (wrapper: HTMLElement, element: HTMLElement) => {
  const left = document.createElement('span')
  const right = document.createElement('span')

  addStyle(left, {
    ...indicator,
    ...indicatorHorizontal,
    left: '0',
  })

  addStyle(right, {
    ...indicator,
    ...indicatorHorizontal,
    right: '0',
  })

  const leftObserver = document.createElement('span')
  const rightObserver = document.createElement('span')

  addStyle(leftObserver, {
    width: '10px',
    background: 'red',
  })

  addStyle(rightObserver, {
    width: '10px',
    background: 'red',
  })

  wrapper.append(left)
  wrapper.append(right)

  element.prepend(leftObserver)
  element.append(rightObserver)

  return {
    left,
    right,
    leftObserver,
    rightObserver,
  }
}
