# indicate

<img align="right" src="https://github.com/tobua/indicate/raw/master/logo.png" width="20%" alt="Indicate Scroll Plugin" />

Indicates possible scroll using a fade effect in elements with overflow.

> Requires browser support for IntersectionObserver (no IE11) and the build tool to work with ES Modules.

- Check out the [Demo](https://tobua.github.io/indicate)

[![npm](https://img.shields.io/npm/v/indicate)](https://npmjs.com/indicate)

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

### Vue

See [indicate/plugins/vue](https://github.com/tobua/indicate/tree/master/plugins/vue) for instructions and an example of how to integrate with Vue.

### React Native

See [indicate/plugins/react-native](https://github.com/tobua/indicate/tree/master/plugins/react-native) note that this plugin is quite different and has some drawbacks compared to the web version.

## Options

Also refer to the [Demo](https://tobua.github.io/indicate) to interactively explore the different options.

```ts
indicate(document.getElementById('my-element'), {
  // Disable arrows, default true.
  arrow: false,
  // Configure arrow:
  arrow: {
    // Position of arrows, default 'center'.
    position: 'start',
    // Icon to show if not overriden by url or markup, default 'arrow-rounded'.
    icon: 'pointer',
    // The color of the icon, default black.
    color: '#FF00FF',
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
  hideScrollbar: false,
  // Move styles and classes from element over to wrapper added by plugin.
  moveStylesToWrapper: true,
  // Simple way to add inline styles to elements.
  inlineStyles: {
    innerWrapper: {
      gap: '10px',
    },
  },
  // The CSS styles can be customized with a theme, see below for full documentation.
  theme: {
    outerWrapper: {
      background: 'blue',
    },
  },
})
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

## Theme

Use themes to modify the styles of added elements. Use either one of the [published themes](https://github.com/tobua/indicate/tree/master/theme):

```ts
// Adds a classname to every element for styling with CSS.
import className from 'indicate/dist/theme/class-name.js'
// Fade effect similar to the one found on youtube.
import youtube from 'indicate/dist/theme/youtube.js'

indicate('.element', { theme: youtube, color: '#FF00FF' })
```

or create your **own theme** through the [dedicated documentation](https://github.com/tobua/indicate/tree/master/theme).

## Styling

Making sure the layout still looks fine after the plugin has added the necessary outer and inner wrapper can be tricky. Here is the structure of the relevant elements and how to target them:

```jsx
// Before
<div class="my-element">
  {contents}
</div>

indicate('.my-element', {
  style: {
    outerWrapper: {
      background: 'blue'
    },
    innerWrapper: {
      background: 'red'
    }
  }
})

// After
<div style="background: blue;"> → outerWrapper
  <div class="my-element">
    <div style="background: red;"> → innerWrapper
      {contents}
      {4 x <span />} → observer (invisible)
    </div>
  </div>
  {4 x <span />} → indicator
<div>
```

Note that with table or inline elements both wrappers will be wrapping the element and the overflow attribute will be added to the innerWrapper.
