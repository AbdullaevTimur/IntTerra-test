<template>
  <div class="but">
    <div class="but__icon" v-if="icon">
      <span class="plus" v-if="icon === 'plus'"></span>
    </div>
    <div class="but__label">
      <slot/>
    </div>
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
.but {
  display: inline-flex;
  align-content: center;
  align-items: center;
  height: $height;
  border-radius: $height / 2;
  padding: 4px 16px;
  // border: 1px solid var(--secondaryColor);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  }

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  &__label {
    font-size: 13px;
  }
}

.plus {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #66CC66;
  text-align: center;
  line-height: 100%;
  border-radius: 50%;
  color: white;

  &:after {
    content: '+';
    font-size: 14px;
    position: relative;
    top: -1px;
    font-weight: bold;
  }
}
</style>
