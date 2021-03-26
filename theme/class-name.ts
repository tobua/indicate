export default {
  indicate: (element: HTMLElement, direction: string) => {
    element.classList.add(`i-indicate-${direction}`)
  },
  arrow: (element: HTMLElement, direction: string) => {
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
