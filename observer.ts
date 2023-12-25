import { theme } from './style'
import { Instance, directions } from './types'

const handleObservation = (instance: Instance, entries: IntersectionObserverEntry[]) => {
  const visibilities = []

  entries.forEach((entry) =>
    directions.forEach((direction) => {
      const isMatch = entry.target === instance.observer[direction]

      if (isMatch) {
        visibilities.push({ direction, visible: entry.isIntersecting })
      }
    }),
  )

  visibilities.forEach((visibility) => {
    if (visibility.visible) {
      theme(instance.indicator[visibility.direction], 'hide', instance.options)
    } else {
      theme(instance.indicator[visibility.direction], 'show', instance.options)
    }
  })
}

export const observe = (instance: Instance) => {
  const observer = new IntersectionObserver(handleObservation.bind(null, instance), {
    root: instance.table ? instance.innerWrapper : instance.element,
    // Only parts of element inside the root element are counted.
    rootMargin: '0px',
    // Even if only 10% of the observer is visible, trigger handler.
    threshold: 0.1,
  })

  instance.intersectionObserver = observer

  // Observe all four observer elements absolutely positioned at the borders of the root element.
  directions.forEach((direction) => observer.observe(instance.observer[direction]))
}
