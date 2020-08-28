<template>
  <div class="page">
    <div class="page__header" v-if="hasHeaderData || enableHeader">
      <slot name="header"/>
    </div>
    <div class="page__main main">
      <div class="main__sidebar" v-if="hasSidebarData || enableSidebar">
        <slot name="sidebar"/>
      </div>
      <div class="main__content">
        <slot/>
      </div>
    </div>
    <div class="page__subpage subpage" v-if="hasChildData">
      <div class="subpage__overlay"/>
      <div class="subpage__exit">
        <Crosshair @click.native="goBack"/>
      </div>
      <div class="subpage__modal">
        <slot name="child"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Slots {
  header?: string | boolean | undefined;
  sidebar?: string | boolean | undefined;
  default?: string | boolean | undefined;
  child?: string | boolean | undefined;
};

interface DataInterface {
  hasChildData?: string | boolean | undefined;
};

export default Vue.extend({
  name: 'Page',
  components: {
    Crosshair: () => import('@/components/ui/Crosshair.vue')
  },
  props: {
    enableHeader: {
      type: Boolean,
      default: true
    },
    enableSidebar: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasHeaderData () {
      return (this.$slots as Slots).header
    },
    hasSidebarData () {
      return (this.$slots as Slots).sidebar
    }
  },
  data () {
    return {
      hasChildData: (this.$slots as Slots).child || false
    } as DataInterface
  },
  watch: {
    '$route' () {
      (this.hasChildData as string | boolean | undefined) = (this.$slots as Slots).child
    }
  },
  methods: {
    goBack (): void {
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  position: relative;
  width: 100%;
  max-width: 100%;
  position: relative;
  min-height: 100vh !important;
  max-height: 100%;
  overflow: hidden;
  flex-direction: column;

  &__header {
    order: 1;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--color-darkblue);
    min-height: 80px;
  }

  &__main {
    order: 2;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    max-height: 100%;
    width: 950px;
    background-color: #F9F9F9;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  }

  &__subpage {
    display: flex;
    align-items: center;
    align-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
}

.main {
  &__sidebar {
    order: 1;
    min-width: 80px;
    width: 80px;
    background-color: var(--color-lightgray);
  }

  &__content {
    order: 2;
    width: 100%;
    padding: 24px;
    background-color: white;
  }
}

.subpage {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(black, 0.7);
    pointer-events: none;
    z-index: -1;
  }

  &__modal {
    display: inline-block;
    background-color: white;
    width: 320px;
    min-height: 100%;
    max-height: 100%;
  }

  &__exit {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 32px;
  }
}
</style>
