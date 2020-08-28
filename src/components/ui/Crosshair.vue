<template>
  <div class="crosshair">
    <span class="crosshair__icon"/>
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
$iconWidth: 28px;
$iconBox: 24px;

.crosshair {
  display: inline-block;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &__icon {
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
