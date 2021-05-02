# indicate Theme

Create your own theme like this:

```ts
const theme = {
  indicate: (element, direction, options) => {
    element.style[direction] = '-5px'
  },
  hide: (element, options) => {
    element.display = 'none'
  },
  show: (element, options) => {
    setTimeout(() => {
      element.display = 'flex'
    }, 500)
  },
  arrow: (element, direction, options) => {
    element.style.display = 'block'
  },
  element: (element, options) => {
    element.classList.add('some-class-i-need')
  },
  outerWrapper: (element, options) => {
    element.style.background = 'blue'
  },
  innerWrapper: (element, options) => {
    const myElement = document.createElement('span')
    element.append(myAbsoluteElement)
  },
  observer: (element, direction, options) => {
    element.pointerEvents = 'none'
  },
}

indicate('.element', { theme })
```

Any theme element can be configured in the following three ways:

```ts
{
  // Method that directly modifies the element and doesn't return anything.
  outerWrapper: (element, options) => {
    element.style.background = 'blue'
  },
  // Method returning a CSSProperties object.
  outerWrapper: (element, options) => ({
    background: options.click ? 'blue' : 'red'
  }),
  // Directly return a CSSProperties object.
  outerWrapper: {
    background: 'green'
  }
}
```
