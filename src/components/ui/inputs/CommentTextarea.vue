<template>
  <div class="elementContainer">
    <textarea v-model="postValue" :placeholder="placeholder"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import inputClass from '@/mixins/InputClass'

export default Vue.extend({
  name: 'CommentTextarea',
  mixins: [
    inputClass
  ]
})
</script>

<style lang="scss" scoped>
.elementContainer {
  width: 100%;

  textarea {
    width: 100%;
    font-family: 'Ubuntu';
    padding: 0;
    font-size: 13px;
    background-color: transparent;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
