export type Elements = string | HTMLElement | NodeListOf<HTMLElement>

export interface PluginOptions {
  horizontal?: boolean
  vertical?: boolean
}

export interface Options {
  horizontal: boolean
  vertical: boolean
}

export interface Instance {
  wrapper: HTMLDivElement
  element: HTMLElement
  indicators: {
    left: HTMLSpanElement
    right: HTMLSpanElement
    leftObserver: HTMLSpanElement
    rightObserver: HTMLSpanElement
  }
  options: Options
}
