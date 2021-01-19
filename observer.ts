import { Instance } from './types'

const handler = (instance: Instance, entries: IntersectionObserverEntry[]) => {
  const visible = { left: false, right: false }

  entries.forEach((entry) => {
    const isLeft = entry.target === instance.indicators.leftObserver
    const isRight = entry.target === instance.indicators.rightObserver

    if (isLeft) {
      visible.left = entry.isIntersecting
    }

    if (isRight) {
      visible.right = entry.isIntersecting
    }
  })

  if (visible.left) {
    instance.indicators.left.style.display = 'none'
  } else {
    instance.indicators.left.style.display = 'block'
  }

  if (visible.right) {
    instance.indicators.right.style.display = 'none'
  } else {
    instance.indicators.right.style.display = 'block'
  }
}

export const observe = (instance: Instance) => {
  const observer = new IntersectionObserver(handler.bind(null, instance), {
    root: instance.element,
    rootMargin: '0px',
    threshold: 1.0,
  })

  observer.observe(instance.indicators.leftObserver)
  observer.observe(instance.indicators.rightObserver)
}
