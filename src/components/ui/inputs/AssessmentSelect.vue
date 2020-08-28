<template>
  <div class="element">
    <div class="element__caption" v-if="caption" v-text="caption"/>
    <div class="element__box">
      <div
        class="element__variant variant"
        v-for="(varible, index) in varibles"
        :key="index"
        @click="postValue = varible.value"
        :class="[{ 'variant__selected': postValue === varible.value }, `variant__selected_${varible.key.toLowerCase()}`]">
          <span v-text="varible.label"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Assessment } from '@/models/Operation'
import inputClass from '@/mixins/InputClass'
import inputVariblesClass from '@/mixins/InputVariblesClass'

export default Vue.extend({
  name: 'AssessmentSelect',
  mixins: [
    inputClass,
    inputVariblesClass
  ],
  props: {
    caption: {
      type: String,
      default: 'Качество выполнения операции'
    }
  },
  mounted () {
    this.$emit('setVaribles', Assessment)
  }
})
</script>

<style lang="scss" scoped>
@mixin shema ($color) {
  background-color: $color;

  &:hover {
    background-color: $color;
  }
}

.element {
  position: relative;
  width: 100%;

  &__caption {
    text-transform: uppercase;
    margin-bottom: 16px;
    font-size: 11px;
    font-weight: 500;
  }

  &__box {
    display: inline-flex;
    position: relative;
    justify-content: center;
    align-content: stretch;
    align-items: stretch;
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: 100%;
    border-radius: 20px;
    height: 40px;
    background-color: var(--color-puregray);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.125);
  }

  &__variant {
    display: inline-flex;
    box-sizing: border-box;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: calc(100% / 3);
    flex-grow: 1;
    padding: 8px 16px;
    cursor: pointer;

    span {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-transform: uppercase;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 11px;
      font-weight: 500;
    }

    &:hover {
      background-color: var(--color-lightgray);
    }

    &:not(:last-child) {
      border-right: 1px solid rgba(black, 0.1);
    }
  }
}

.variant__selected {
  &.variant__selected_badly, &.variant__selected_excellent {
    color: white;
  }

  &.variant__selected_excellent {
    @include shema(var(--color-green));
  }

  &.variant__selected_satisfactorily {
    @include shema(var(--color-lightorange));
  }

  &.variant__selected_badly {
    @include shema(var(--color-red));
  }
}
</style>
