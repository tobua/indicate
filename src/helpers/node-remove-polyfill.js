// Polyfills Node.remove() for IE11
if (!('remove' in window.Element.prototype)) {
  window.Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this)
    }
  }
}
