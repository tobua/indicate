export interface Instance {
  wrapper: HTMLDivElement
  element: HTMLElement
  indicators: {
    left: HTMLSpanElement
    right: HTMLSpanElement
    leftObserver: HTMLSpanElement
    rightObserver: HTMLSpanElement
  }
  options: {}
}
