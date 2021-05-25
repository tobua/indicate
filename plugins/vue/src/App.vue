<template>
  <div id="app">
    <div ref="element" class="element">
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
      <p class="tile" />
    </div>
  </div>
</template>

<script>
import { indicate } from 'indicate'

export default {
  name: 'App',
  mounted: function() {
    indicate(this.$refs.element)
  }
}
</script>

<style>
.element {
  display: flex;
  flex-direction: row;
}
.tile {
  display: flex;
  flex-shrink: 0;
  background: lightskyblue;
  width: 10vw;
  height: 10vw;
  border-radius: 2vw;
  margin: 0 2vw 0 0;
}
</style>
