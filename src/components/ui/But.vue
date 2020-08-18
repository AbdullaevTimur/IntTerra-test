<template>
  <div class="container">
    <span class="icon" v-if="icon">
      <span class="plus" v-if="icon === 'plus'"></span>
    </span>
    <span class="label">
      <slot/>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'But',
  props: {
    icon: {
      type: String
    }
  }
})
</script>

<style lang="scss" scoped>
$height: 2.25em;
.container {
  display: inline-flex;
  align-content: center;
  align-items: center;
  height: $height;
  border-radius: $height / 2;
  padding: 0.25em 1em;
  // border: 1px solid var(--secondaryColor);
  box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.125);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0.125em 0.375em rgba(0, 0, 0, 0.25);
  }

  span:not(:last-child) {
    margin-right: 0.5em;
  }

  .label {
    font-size: 13px;
  }
}

.plus {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: #66CC66;
  text-align: center;
  line-height: 100%;
  border-radius: 50%;
  color: white;

  &:after {
    content: '+';
    font-size: 0.875em;
    position: relative;
    top: -0.0625em;
    font-weight: bold;
  }
}
</style>
