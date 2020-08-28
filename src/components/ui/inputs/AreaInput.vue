<template>
  <div class="element">
    <div class="element__box">
      <div class="element__caption" v-if="caption" v-text="caption"/>
      <input class="element__input" v-model="postValue" :placeholder="placeholder"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import inputClass from '@/mixins/InputClass'

export default Vue.extend({
  name: 'AreaInput',
  props: {
    caption: {
      type: String,
      default: 'Кол-во Га к обработке'
    }
  },
  mixins: [
    inputClass
  ]
})
</script>

<style lang="scss" scoped>
.element {
  display: inline-flex;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;

  &__box {
    position: relative;
    max-width: 100%;

    & > *:not(:last-child) {
      position: relative;
    }

    .element__input {
      max-width: 100% !important;
      font-size: 18px;
      padding: 0;
      border: none;
      background-color: transparent;

      &:focus {
        outline: none;
      }

      // &::-webkit-outer-spin-button,
      // &::-webkit-inner-spin-button {
      //   -webkit-appearance: none;
      //   margin: 0;
      // }

      // &[type=number] {
      //   -moz-appearance: textfield;
      // }
    }
  }

  &__caption {
    text-transform: uppercase;
    margin-bottom: 16px;
    font-size: 8px;
    font-weight: 500;
    opacity: 0.7;
  }
}
</style>
