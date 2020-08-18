<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss">
html, body {
  --color-black: #333333;
  --color-darkblue: #091C28;
  --color-gray: #979797;
  --color-lightgray: #EDEEEE;
  --color-puregray: #F9F9F9;
  --color-blue: #3399FF;
  --color-green: #66CC66;
  --color-lightgreen: #73FF82;
  --color-lightorange: #FFE06D;
  --color-red: #FF7360;

  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

#app {
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--color-black);
  font-size: 16px;
}
</style>
