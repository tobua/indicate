/**
 * Returns the scroll position. Both properties are available, but the first
 * one is correct on Chrome and Firefox, while the second one matches
 * Safari.
 **/
export default function getScrollPosition (contentDocument, property) {
  return Math.max(contentDocument.documentElement[property], contentDocument.body[property])
}
