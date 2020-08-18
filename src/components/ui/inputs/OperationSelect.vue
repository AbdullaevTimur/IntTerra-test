<template>
  <div class="elementContainer" :class="[{ selected: options }]">
    <div class="box" @click="options = !options">
      <div class="caption" v-if="caption" v-text="caption"/>
      <div class="input">{{ valueLabel }}</div>
    </div>
    <img src="img/DropdownIcon.png"/>
    <div class="options" v-if="options">
      <div class="option"
        v-for="(varible, index) in filterVaribles"
        :key="index"
        @click="setValue(varible.value)"
        :class="[{ selected: postValue === varible.value }]"
        v-text="varible.label"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import inputClass from '@/mixins/InputClass'
import inputVariblesClass from '@/mixins/InputVariblesClass'
import { OperationType } from '@/models/Operation'

interface ModelInterface {
  key: string;
  label: string;
  value?: number | string | null;
};

export default Vue.extend({
  name: 'OperationSelect',
  props: {
    caption: {
      type: String,
      default: 'Операция'
    }
  },
  mixins: [
    inputClass,
    inputVariblesClass
  ],
  computed: {
    valueLabel (): string {
      const index = (this.$data.varibles as Array<ModelInterface>).findIndex(x => (x as ModelInterface).value === this.$data.postValue)
      return index > -1 ? (this.$data.varibles as Array<ModelInterface>)[index].label : this.labels.select
    },
    filterVaribles (): Array<ModelInterface> {
      return (this.$data.varibles as Array<ModelInterface>).filter(x => (x as ModelInterface).value !== this.$data.postValue)
    }
  },
  data () {
    return {
      options: false,
      labels: {
        select: 'Выберите'
      }
    }
  },
  methods: {
    setValue (val: string | number | void): void {
      this.$data.postValue = val // Определяю значение переменой
      this.options = false // Скрываю всплывающие окно "select"
    }
  },
  mounted () {
    this.$emit('setVaribles', OperationType) // Выполняю функцию для "получения возможныех значений" после монирования компонента.
  }
})
</script>

<style lang="scss" scoped>
.elementContainer {
  display: inline-flex;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1em;
  width: 100%;
  position: relative;
  cursor: pointer;

  &.selected {
    background-color: var(--color-puregray);
    border-bottom: 1px solid rgba(black, 0.03)
  }

  .box {
    width: 100%;

    & > *:not(:last-child) {
      margin-right: 0.5em;
    }

    input, .input {
      font-size: 13px;
      border: none;
      background-color: transparent;
      padding: 0;

      &:focus {
        outline: none;
      }
    }
  }
}

.caption {
  text-transform: uppercase;
  margin-bottom: 1em;
  font-size: 8px;
  font-weight: 500;
  opacity: 0.7;
}

.options {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.25);
  z-index: 10;

  .option {
    display: block;
    padding: 0.75em 1em;
    font-size: 13px;
    background-color: var(--color-puregray);
    cursor: pointer;
    color: var(--color-gray);

    &:hover {
      background-color: var(--color-lightgray);
      color: var(--color-black);
    }
  }
}
</style>
