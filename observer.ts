import { Instance, Visibility, directions } from './types'

const isVisible = (
  instance: Instance,
  visible: Visibility,
  entry: IntersectionObserverEntry,
  direction: string
) => {
  const isMatch = entry.target === instance.observer[direction]

  if (isMatch) {
    visible[direction] = entry.isIntersecting
  }
}

const handler = (instance: Instance, entries: IntersectionObserverEntry[]) => {
  const visible = { left: false, right: false, top: false, bottom: false }

  entries.forEach((entry) =>
    directions.forEach((direction) =>
      isVisible(instance, visible, entry, direction)
    )
  )

  directions.forEach((direction) => {
    if (visible[direction]) {
      instance.indicator[direction].style.display = 'none'
    } else {
      instance.indicator[direction].style.display = 'block'
    }
  })
}

export const observe = (instance: Instance) => {
  const observer = new IntersectionObserver(handler.bind(null, instance), {
    root: instance.element,
    rootMargin: '0px',
    threshold: 1.0,
  })

  directions.forEach((direction) =>
    observer.observe(instance.observer[direction])
  )
}
