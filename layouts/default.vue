<template lang="pug">
  #app(:class="cssClassesObject")
    ThePreloader(v-if="!preloaderIsFinished", :ieFix="needsIEFix")
    TheBackground
    TheHeader
    nuxt
    TheFooter
</template>

<script>
  /**
   * GLOBAL TODO's
   * @TODO: refactor services, formalization, contact form, constructor
   * @TODO: move 'section banner', 'main section' etc to separate components
   * @TODO: refactor catalog/collection into single abstraction
   */

  // plugins to initialize
  import objectFitImages from '../assets/js/object-fit-images';
  import MorphSVGPlugin from '../assets/js/gsap/plugins/MorphSVGPlugin.js';
  import DrawSVGPlugin from '../assets/js/gsap/plugins/DrawSVGPlugin.js';
  import SplitText from '../assets/js/gsap/plugins/SplitText';
  import ScrollToPlugin from '../assets/js/gsap/plugins/ScrollToPlugin';
  import AttrPlugin from '../assets/js/gsap/plugins/AttrPlugin';
  import ColorPropsPlugin from '../assets/js/gsap/plugins/ColorPropsPlugin';
  // main layout components
  import TheHeader from '../components/layout/TheHeader.vue';
  import TheFooter from '../components/layout/TheFooter.vue';
  import ThePreloader from '../components/layout/ThePreloader.vue';
  import TheBackground from '../components/layout/TheBackground.vue';
  // helpers
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../plugins/event-bus';
  import { SET_LOCK } from '../modules/_events';
  import { css, Resp } from '../modules/_helpers';

  export default {
    name: 'DefaultLayout',
    components: { TheHeader, ThePreloader, TheBackground, TheFooter },

    data() {
      return {
        needsIEFix: false,
        locked: false
      };
    },

    computed: {
      cssClassesObject() {
        return {
          [css.blocked]: !this.preloaderIsFinished || this.locked,
          [css.iefix]: this.needsIEFix
        };
      },
      philisophyVideo() {
        return this.$route.fullPath.includes('philosophy') && !this.philosophyVideoWasShown;
      },
      ...mapGetters(['preloaderIsFinished', 'philosophyVideoWasShown', 'globalDataBuffer'])
    },

    watch: {
      // route was changes, get data from the buffer and commit it to the store
      $route() {
        this.updateGlobalData(this.globalDataBuffer);
      },

      // video on philosophy page should be shown only once
      philisophyVideo: {
        handler(next) {
          if (next) {
            setTimeout(() => bus.$emit(SET_LOCK, true), 500);
          }
        },
        immediate: true
      }
    },

    mounted() {
      this
        .preventScrollRestoration()
        .initPlugins()
        .checkForIEFix()
        .getInitialProducts();

      bus.$on(SET_LOCK, (value) => { this.locked = value; });
    },

    methods: {
      /**
       * Prevent scroll restoration when navigating 'back'
       * https://github.com/vuejs/vue-router/issues/1373
       *
       * @return {Vue}
       */
      preventScrollRestoration() {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }

        return this;
      },

      /**
       * Initialize plugins (GSAP etc.)
       *
       * @return {Vue}
       */
      initPlugins() {
        objectFitImages();

        [
          MorphSVGPlugin,
          DrawSVGPlugin,
          SplitText,
          ScrollToPlugin,
          AttrPlugin,
          ColorPropsPlugin
        ].forEach(plugin => plugin(window));

        return this;
      },

      /**
       * Check and add class (js-iefix) to main application node
       *
       * @return {Vue}
       */
      checkForIEFix() {
        if (Resp.isIE) this.needsIEFix = true;

        return this;
      },
      ...mapActions(['updateGlobalData', 'getInitialProducts'])
    }
  };
</script>

<style lang="scss">
  @import '../assets/scss/variables';

  #app {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    max-width: 1920px;
    overflow: hidden;

    @media (min-width: $largeDesktop) {
      padding: 0 98px;
    }

    @media (max-width: $minDesktop) {
      padding: 0 34px;
    }

    @media (max-width: $minTablet) {
      padding: 0 14px;
    }
  }

  .js-blocked {
    height: 100vh;
    overflow: hidden;
  }
</style>
