# indicate

<img align="right" src="https://github.com/tobua/indicate/raw/master/logo.png" width="20%" alt="Indicate Scroll Plugin" />

Indicates possible scroll using a fade effect in elements with overflow.

> Requires browser support for IntersectionObserver (no IE11) and the build tool to work with ES Modules.

- [![indicate Demo](https://img.shields.io/static/v1?label=indicate&message=Demo&color=brightgreen)](https://tobua.github.io/indicate)
- [![npm](https://img.shields.io/npm/v/indicate)](https://npmjs.com/indicate)

## Installation & Usage

```
npm install indicate
```

```tsx
import { indicate } from 'indicate'

indicate('#my-element')
indicate(document.querySelectorAll('.nav-bar'))
```

### React

```tsx
import { Indicate } from 'indicate'

const Scrollable = () => <Indicate as="div" color="#00FF00">{`...`}</Indicate>
```

### React Native

See [indicate/plugins/react-native](https://github.com/tobua/indicate/tree/master/plugins/react-native) note that this plugin is quite different and has some drawbacks compared to the web version.

## Options

```ts
indicate(document.getElementById('my-element'), {
  // Disable arrows, default true.
  arrow: false,
  // Configure arrow:
  arrow: {
    // Position of arrows, default 'center'.
    position: 'start',
    // URL of an image pointing to an arrow to the right.
    url: 'arrow-rounded-right.svg',
    // String with HTML markup inserted as arrow.
    markup: '<span>→</span>',
    // DOM Node to be inserted as arrow.
    markup: svgElement,
  },
  // Change fade color, default white.
  color: '#0000FF',
  // Configure the width of the fade effect, default 20px.
  width: '3vw',
  // Click on indicator to scroll, default true.
  click: false,
  // Configure click behaviour:
  click: {
    // Denotes how much of the currently visible part should be scrolled by a click.
    // Default is 2 for 50% of the currently visible part, 4 would equal to 25%.
    scrollDenominator: 4,
  },
  // Disable hiding the native OS scrollbar inside the element.
  hideNativeScrollbar: false,
  // The CSS styles can be customized with a theme, see below for full documentation.
  theme: {
    outerWrapper: {
      background: 'blue',
    },
  },
})
```

## Theme

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

## Instance

```tsx
import { indicate, remove } from 'indicate'

indicate('#my-element')

// Remove the added listeners, wrappers and elements.
remove('#my-element')

// Reinitialize with different options.
indicate('#my-element', { arrow: false })
```
