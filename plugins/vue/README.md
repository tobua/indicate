# indicate for Vue

The vanilla JS version of indicate can be used with Vue without much effort. The effect will be added after the initial render (currently also the case with the dedicated React plugin) but it's hardly noticable.

## Installation

Add the regular plugin to your project.

```
npm install indicate
```

## Integration

The key is adding a ref to the element and then initializing indicate on that element with your desired options.

```vue
<template>
  <div id="app">
    <div ref="element" class="element">{...}</div>
  </div>
</template>

<script>
import { indicate } from 'indicate'

export default {
  name: 'App',
  mounted: function () {
    // Initialize indicate.
    indicate(this.$refs.element)
    // With options.
    indicate(this.$refs.element, { color: '#FF00FF' })
  },
}
</script>
```

## Try the example

The example bootstrapped with @vue/cli and Vue version 2 can be run by cloning the repository and continuing with the following

```sh
npm install
cd plugins/vue
npm install
# Will first build and install the plugin from root.
npm start
```
