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

const hideScrollbarClass = 'hide-indicate-scrollbar'

let hideScrollbarStyleSheet: HTMLStyleElement

export const hideScrollbarWithWebkitPseudoClass = (element: HTMLElement) => {
  element.classList.add(hideScrollbarClass)

  // Class already added to the head in a previous instance.
  if (hideScrollbarStyleSheet) {
    return
  }

  hideScrollbarStyleSheet = document.createElement('style')
  const sheet = document.head.appendChild(hideScrollbarStyleSheet).sheet

  sheet.insertRule(
    `.${hideScrollbarClass}::-webkit-scrollbar { display: none; }`
  )
}

export const removeHideScrollbarStyle = (
  element: HTMLElement,
  innerWrapper: HTMLElement
) => {
  element.classList.remove(hideScrollbarClass)
  innerWrapper.classList.remove(hideScrollbarClass)

  if (
    !hideScrollbarStyleSheet ||
    document.querySelector(`.${hideScrollbarClass}`)
  ) {
    return
  }

  hideScrollbarStyleSheet.remove()
  hideScrollbarStyleSheet = undefined
}
