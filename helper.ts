export enum Message {
  IntersectionObserver = "Browser doesn't support IntersectionObserver.",
  ExistingInstance = 'An instance for this element already exists.',
  RemoveNoInstance = 'remove() no instance found for element.',
  InvalidElement = 'Initialized failed due to invalid element.',
}

/* eslint-disable no-console */
export const log = (message: Message, objects = null) => {
  if (process.env.NODE_ENV !== 'production') {
    const prefixedMessage = `indicate: ${message}`

    if (objects) {
      console.warn(prefixedMessage, objects)
    } else {
      console.warn(prefixedMessage)
    }
  }
}

export const isTable = (element: HTMLElement) =>
  element.tagName.toLowerCase() === 'table'
