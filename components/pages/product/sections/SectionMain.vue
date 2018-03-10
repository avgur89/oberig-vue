<template lang="pug">
  section.SectionMain(v-if="!closed")
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__inner
      BaseSvgIcon.SectionMain__decorIcon(
        icon="catalog",
        width="800",
        height="800",
        :fill="false"
      )
      img.SectionMain__image(
        :src="m.titleImageSrc",
        alt=""
      )
</template>

<script>
  import '../../../../assets/svg/dist/catalog';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import {
    SET_LOCK,
    PRODUCT_PREVIEW_CLOSED
  } from '../../../../modules/_events';
  import indicator from '../../../../mixins/indicator';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal, BaseSvgIcon },
    mixins: [indicator],
    computed: mapGetters(['m', 'preloaderIsFinished'])
  })
  export default class SectionMain extends Vue {
    /**
     * Closed state indicator
     *
     * @type {Boolean}
     */
    closed = false;

    /**
     * Close animation was started
     *
     * @type {Boolean}
     */
    closingStarted = false;

    /**
     * Autohide timer keeper.
     *
     * @type {Number|Null}
     */
    autoHideTimer = undefined;

    mounted() {
      setTimeout(() => bus.$emit(SET_LOCK, true), 0);
    }

    destroyed() {
      bus.$emit(SET_LOCK, false);

      clearTimeout(this.autoHideTimer);
    }

    /**
     * Reveal main section
     */
    revealSection() {
      this.autoHideTimer = setTimeout(this.$_indicator_action, 3200);

      const [a, b, c] = [...this.$el.querySelectorAll('path')];

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        .fromTo('.SectionMain__image', 1.6,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, ease: Power1.easeOut },
          0
        )
        .staggerFromTo([a, c], 2, { drawSVG: '0%' }, {
          ease: Power1.easeOut,
          drawSVG: '100%'
        }, 0.2, 0)
        .staggerFromTo([b], 2, { drawSVG: '100% 100%' }, {
          ease: Power1.easeOut,
          drawSVG: '0% 100%'
        }, 0.3, 0);
    }

    /**
     * Hide section and show page content
     */
    indicatorEvent() {
      if (this.closingStarted) return;

      this.closingStarted = true;

      clearTimeout(this.autoHideTimer);

      const [a, b, c] = [...this.$el.querySelectorAll('path')];
      const onAnimationComplete = () => {
        bus.$emit(PRODUCT_PREVIEW_CLOSED);
        this.closed = true;
      };

      new TimelineMax({ onComplete: onAnimationComplete })
        .to('.SectionMain__image', 1.1,
          { scale: 0.9, ease: Power1.easeOut },
          0
        )
        .staggerTo([a, c], 1.4, {
          ease: Power1.easeOut,
          drawSVG: '0%'
        }, 0.2, 0)
        .staggerTo([b], 1.4, {
          ease: Power1.easeOut,
          drawSVG: '100% 100%'
        }, 0.3, 0)
        .to('.SectionMain__image', 0.4, {
          opacity: 0
        }, 0.8)
        .to([a, b, c], 0.3, {
          opacity: 0
        }, 1.1);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: absolute;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(100vh - 80px);

    z-index: 3;

    @media (max-width: $minDesktop) {
      height: calc(100vh - 92px);
    }

    @media (max-width: $minTablet) {
      height: calc(100vh - 48px);
    }

    &__decorIcon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      margin-top: -40px;

      z-index: 4;

      @media (min-width: $largeDesktop) {
        width: 1000px !important;
        height: 1000px !important;
      }

      @media (max-width: $minTablet) {
        margin-top: -15px;
      }
    }

    &__image {
      position: relative;
      margin-top: -40px;
      max-width: 95%;
      max-height: 95%;

      z-index: 3;

      @media (max-width: $minTablet) {
        max-width: 70%;
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";

  .SectionMain {
    &__decorIcon {
      .st0{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#e1e0e4;stroke-width:0.6;stroke-miterlimit:10;}
      .st1{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#e1e0e4;stroke-width:0.4;stroke-miterlimit:10;}
      .st2{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#e1e0e4;stroke-width:0.2;stroke-miterlimit:10;}

      @media (max-width: $minTablet) {
        width: 570px !important;
        height: 570px !important;
      }
    }
  }
</style>
