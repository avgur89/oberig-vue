<template lang="pug">
  .ThePreloader
    IconOberig.ThePreloa__icon(
      ref="ThePreloaderIconRef",
      width="85",
      height="86"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import IconOberig from '../ui/IconOberig.vue';
  import bus from '../../plugins/event-bus';
  import { mapActions } from 'vuex';
  import { PRELOADER_FINISHED } from '../../modules/_events';
  import { animation } from '../../modules/_helpers';

  @Component({
    props: {
      ieFix: {
        type: Boolean,
        default: false
      }
    },
    components: { IconOberig },
    methods: mapActions(['setPreloaderFinishedState']),
    watch: {
      ieFix(val) {
        if (!val) return;

        window.onload = () => {};

        setTimeout(this.finishPreloader, 5500);
      }
    }
  })
  export default class Preloader extends Vue {
    mounted() {
      this.startPreloader();
    }

    /**
     * Start animation, finish on window load
     */
    startPreloader() {
      this.$refs.ThePreloaderIconRef.startAnimation();

      window.onload = this.finishPreloader;
    }

    /**
     * Stop preloader animation, reveal main content.
     *
     * @return {Promise}
     */
    async finishPreloader() {
      const { $el } = this;

      // finish icon animation
      await this.$refs.ThePreloaderIconRef.finishAnimation();

      // hide preloader
      await animation($el, 0.3, {
        css: { opacity: 0 },
        onComplete: () => { $el.style.display = 'none'; }
      });

      // set preloader phase
      this.setPreloaderFinishedState();

      // show app content
      bus.$emit(PRELOADER_FINISHED);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';

  .ThePreloader {
    position: fixed;

    left: 0;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    overflow: hidden;

    background-color: transparent;

    z-index: 100;

    &__icon {
      @media (max-width: $minTablet) {
        margin-top: -10px;
      }
    }
  }
</style>
