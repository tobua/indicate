import { Instance, directions } from './types'

const handleObservation = (
  instance: Instance,
  entries: IntersectionObserverEntry[]
) => {
  const visibilities = []

  entries.forEach((entry) =>
    directions.forEach((direction) => {
      const isMatch = entry.target === instance.observer[direction]

      if (isMatch) {
        visibilities.push({ direction, visible: entry.isIntersecting })
      }
    })
  )

  visibilities.forEach((visibility) => {
    if (visibility.visible) {
      instance.indicator[visibility.direction].style.display = 'none'
    } else {
      instance.indicator[visibility.direction].style.display = 'flex'
    }
  })
}

export const observe = (instance: Instance) => {
  const observer = new IntersectionObserver(
    handleObservation.bind(null, instance),
    {
      root: instance.element,
      // Only parts of element inside the root element are counted.
      rootMargin: '0px',
      // Even if only 10% of the observer is visible, trigger handler.
      threshold: 0.1,
    }
  )

  // Observe all four observer elements absolutely positioned at the borders of the root element.
  directions.forEach((direction) =>
    observer.observe(instance.observer[direction])
  )
}
