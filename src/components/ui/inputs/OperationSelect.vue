<template>
  <div class="element element-block" :class="[{ 'element_selected': options }]">
    <div class="element__box" @click="options = !options">
      <div class="element__caption" v-if="caption" v-text="caption"/>
      <div class="element__input">{{ valueLabel }}</div>
    </div>
    <img class="element__img" src="img/DropdownIcon.png"/>
    <div class="element__options options" v-if="options">
      <div class="options__item"
        v-for="(varible, index) in filterVaribles"
        :key="index"
        @click="setValue(varible.value)"
        :class="[{ 'options__item_selected': postValue === varible.value }]"
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
.element {
  display: inline-flex;
  align-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  &-block {
    padding: 16px;
    width: 100%;
  }

  &-selected {
    background-color: var(--color-puregray);
    border-bottom: 1px solid rgba(black, 0.03)
  }

  &__box {
    width: 100%;

    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }

  &__input {
    font-size: 13px;
    border: none;
    background-color: transparent;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  &__caption {
    text-transform: uppercase;
    margin-bottom: 16px;
    font-size: 8px;
    font-weight: 500;
    opacity: 0.7;
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
  }
}

.options {
  display: block;

  &__item {
    display: block;
    padding: 12px 16px;
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
