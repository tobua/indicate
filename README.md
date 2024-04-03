# indicate

<img align="right" src="https://github.com/tobua/indicate/raw/main/logo.png" width="20%" alt="Indicate Scroll Plugin" />

Indicates possible scroll using a fade effect in elements with overflow.

> Requires browser support for IntersectionObserver (no IE11) and the build tool to work with ES Modules.

- Check out the [Demo](https://tobua.github.io/indicate)

[![npm](https://img.shields.io/npm/v/indicate)](https://npmjs.com/indicate)

> [!TIP]
> A modern React version of this library, called [overflow-scroll-fade](https://github.com/tobua/overflow-scroll-fade), is currently under development. It is much smaller and more performant; however, it does have some limitations, as it requires support for [`scroll-timeline`](https://caniuse.com/mdn-css_properties_scroll-timeline).

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

See [indicate/plugins/vue](https://github.com/tobua/indicate/tree/main/plugins/vue) for instructions and an example of how to integrate with Vue.

### React Native

See [react-native-indicate](https://github.com/tobua/react-native-indicate) but note that this plugin is quite different and has some drawbacks compared to the web version.

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

### React options

In the React version you can use all regular options plus a few specific ones.

```tsx
const Regular = (
  <Indicate
    // Specify what kind of tag the element should be, default 'div'.
    as="div"
    // Use any regular option.
    color="#00FF00"
    inlineStyles={{
      element: { background: 'black' },
    }}
  >
    {`...`}
  </Indicate>
)

// If you already have an element with overflow, just wrap that element with <Indicate>
// and the first child will be used as the element. Make sure to pass a ref.
const elementRef = useRef()
const Existing = (
  <Indicate childAsElement ref={elementRef} style={{ display: 'inline-flex' }}>
    <div ref={elementRef}>
      <p>Whatever</p>
    </div>
  </Indicate>
)
```

The `childAsElement` option is useful if you're adding `Indicate` to existing markup that
already has an element with overflow. Without the option another unnecessary element is
added and one overflow has no effect.

The React version mostly wraps the vanilla JS version of the plugin. During Server-Side
Rendering the plugin will not be initialized. This can cause layout issues between the
first render and the second one after hydration. To fix these issues the React plugin will
add the `outerWrapper`, the `element` and the `innerWrapper` during the server-side render
already. With the `inlineStyles` option you can add custom styles to these elements to
keep the layout intact. With the `childAsElement` option the 'reffed' element's style will
be overriden, use the style prop on `Indicate` instead.

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

Use themes to modify the styles of added elements. Use either one of the [published themes](https://github.com/tobua/indicate/tree/main/theme):

```ts
// Adds a classname to every element for styling with CSS.
import className from 'indicate/theme/class-name'
// Fade effect similar to the one found on youtube.
import youtube from 'indicate/theme/youtube'

indicate('.element', { theme: youtube, color: '#FF00FF' })
```

or create your **own theme** through the [dedicated documentation](https://github.com/tobua/indicate/tree/main/theme).

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
