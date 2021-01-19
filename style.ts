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
  element.parentNode.appendChild(wrapper)
  wrapper.appendChild(element)

  return wrapper
}

const indicator = {
  position: 'absolute',
  background: 'gray',
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

  wrapper.appendChild(left)
  wrapper.appendChild(right)
  element.appendChild(leftObserver)
  element.appendChild(rightObserver)

  return {
    left,
    right,
    leftObserver,
    rightObserver,
  }
}
