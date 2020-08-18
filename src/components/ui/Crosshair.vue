<template>
  <div class="crosshair">
    <span class="icon"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Crosshair'
})
</script>

<style lang="scss" scoped>
@mixin rotate ($deg) {
  -webkit-transform: rotate($deg);
  -moz-transform: rotate($deg);
  -ms-transform: rotate($deg);
  -o-transform: rotate($deg);
}

$lineWidth: 4px;
$iconWidth: 1.75em;
$iconBox: 1.5em;

.crosshair {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;

  .icon {
    display: inline-block;
    position: relative;
    width: $iconBox;
    height: $iconBox;
    top: $lineWidth;
    left: $lineWidth;

    &::before, &::after {
      position: absolute;
      left: $iconWidth / 2;
      margin-left: -($lineWidth * 2);
      top: -($lineWidth * 2);
      content: ' ';
      height: $iconWidth;
      width: $lineWidth;
      background-color: white;
    }

    &::before {
      @include rotate(45deg);
    }

    &::after {
      @include rotate(-45deg);
    }
  }
}
</style>
