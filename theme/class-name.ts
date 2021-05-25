export default {
  indicator: (element: HTMLElement, options: any, direction: string) => {
    element.classList.add(`i-indicator-${direction}`)
  },
  observer: (element: HTMLElement, options: any, direction: string) => {
    element.classList.add(`i-observer-${direction}`)
  },
  arrow: (element: HTMLElement, options: any, direction: string) => {
    element.classList.add(`i-arrow-${direction}`)
  },
  element: (element: HTMLElement) => {
    element.classList.add(`i-element`)
  },
  outerWrapper: (element: HTMLElement) => {
    element.classList.add(`i-outer-wrapper`)
  },
  innerWrapper: (element: HTMLElement) => {
    element.classList.add(`i-inner-wrapper`)
  },
}
