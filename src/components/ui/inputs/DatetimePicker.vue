<template>
  <div class="element" ref="datetimeppicker">
    <div class="element__box">
      <div class="element__caption" v-if="caption" v-text="caption"/>
      <input
        class="element__input"
        :type="type"
        :value="postValue"
        @input="convertInputValueToDateAndEmit($event.target.valueAsDate)"/>
    </div>
    <img class="element__img" src="img/calendar.png"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import inputClass from '@/mixins/InputClass'

export default Vue.extend({
  name: 'DatetimePicker',
  mixins: [
    inputClass
  ],
  props: {
    type: {
      type: String,
      default: 'date'
    },
    caption: {
      type: String,
      default: 'Дата проведения'
    }
  }
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
      margin-right: 8px;
    }
  }

  &__input {
    max-width: 100% !important;
    font-family: 'Ubuntu';
    font-size: 18px;
    border: none;
    background-color: transparent;
    padding: 0;
    width: 100%;
    // width: 7em;
    position: relative;

    &:focus {
      outline: none;
    }

    &::-webkit-inner-spin-button, &::-webkit-clear-button {
      -webkit-appearance: none;
      display: none;
    }
  }

  &__img {
    display: inline-block;
    font-size: 16px;
    min-width: 16px;
    width: 16px;
    height: 16px;
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
