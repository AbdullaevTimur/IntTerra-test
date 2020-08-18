<template>
  <div class="page">
    <div class="header" v-if="hasHeaderData || enableHeader">
      <slot name="header"/>
    </div>
    <div class="main">
      <div class="sidebar" v-if="hasSidebarData || enableSidebar">
        <slot name="sidebar"/>
      </div>
      <div class="content">
        <slot/>
      </div>
    </div>
    <div class="subpage" v-if="hasChildData">
      <div class="overlay"/>
      <div class="exit">
        <Crosshair class="exit" @click.native="goBack"/>
      </div>
      <div class="modal">
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

<style lang="scss">
.subpage {
  .modal {
    .scroll-container {
      overflow: hidden !important;
      overflow-y: hidden !important !important;
    }
  }
}
</style>

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

  .header {
    order: 1;
    flex-grow: 0;
    flex-shrink: 0;
    background-color: var(--color-darkblue);
    min-height: 5em;
  }

  .main {
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
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);

    .sidebar {
      order: 1;
      min-width: 5em;
      width: 5em;
      background-color: var(--color-lightgray);
    }
    .content {
      order: 2;
      width: 100%;
      padding: 1.5em;
      background-color: white;
    }
  }
}

.subpage {
  display: flex;
  align-items: center;
  align-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(black, 0.7);
    pointer-events: none !important;
  }

  .exit {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    padding: 2rem;
  }

  .modal {
    display: inline-block;
    background-color: white;
    width: 20em;
    min-height: 100%;
    max-height: 100%;
    position: relative;
    overflow-y: auto;
  }
}
</style>
