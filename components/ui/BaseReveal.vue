<template lang="pug">
  div
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import inViewport from 'vue-in-viewport-mixin';
  import bus from '../../plugins/event-bus';
  import { PRELOADER_FINISHED } from '../../modules/_events';

  @Component({
    mixins: [inViewport],
    props: {
      action: {
        type: Function,
        required: true
      },
      outAction: {
        type: Function,
        required: false
      }
    },
    computed: mapGetters(['preloaderIsFinished']),
    watch: {
      'inViewport.now': function detectReveal(visible) {
        if (visible) {
          this.preloaderIsFinished
            ? this.action()
            : bus.$on(PRELOADER_FINISHED, this.action);
          return;
        }

        typeof this.outAction === 'function' && this.outAction();
      }
    },
    destroyed() {
      bus.$off(PRELOADER_FINISHED, this.action);
    }
  })
  export default class BaseReveal extends Vue {}
</script>

<style scoped>
  div {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    visibility: hidden;
  }
</style>
