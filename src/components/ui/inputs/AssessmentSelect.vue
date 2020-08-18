<template>
  <div class="elementContainer">
    <div class="caption" v-if="caption" v-text="caption"/>
    <div class="box">
      <div
        v-for="(varible, index) in varibles"
        :key="index"
        @click="postValue = varible.value"
        :class="[{ selected: postValue === varible.value }, varible.key.toLowerCase()]">
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

.elementContainer {
  position: relative;
  width: 100%;

  .caption {
    text-transform: uppercase;
    margin-bottom: 1em;
    font-size: 11px;
    font-weight: 500;
  }

  .box {
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
    box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.125);

    & > * {
      display: inline-flex;
      box-sizing: border-box;
      justify-content: center;
      align-content: center;
      align-items: center;
      width: calc(100% / 3);
      flex-grow: 1;
      padding: 0.5em 1em;
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

      &.selected {
        &.badly, &.excellent {
          color: white;
        }

        &.excellent {
          @include shema(var(--color-green));
        }

        &.satisfactorily {
          @include shema(var(--color-lightorange));
        }

        &.badly {
          @include shema(var(--color-red));
        }
      }
    }
  }
}
</style>
