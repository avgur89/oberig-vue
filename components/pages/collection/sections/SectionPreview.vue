<template lang="pug">
  section.SectionPreview
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionPreview__image(:style="{ 'background-image': `url(${m.titleImage})` }")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import imagesLoaded from 'imagesloaded';
  import bus from '../../../../plugins/event-bus';
  import {
    SET_LOCK,
    COLLECTION_PREVIEW_CLOSED
  } from '../../../../modules/_events';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['m'])
  })
  export default class SectionPreview extends Vue {
    mounted() {
      setTimeout(() => bus.$emit(SET_LOCK, true), 0);
    }

    /**
     * Reveal main section
     *
     * @async
     */
    async revealSection() {
      const onComplete = () => setTimeout(this.hidePreview, 300);

      await new Promise(resolve => imagesLoaded(this.$el, { background: '.SectionPreview__image' }, resolve));

      new TimelineMax()
        // background image
        .fromTo('.SectionPreview__image', 1.2,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, ease: Power0.easeNone, onComplete },
          0
        );
    }

    /**
     * Hide section and show page content
     */
    hidePreview() {
      const visiblePartHeight = Resp.isMobile ? 175 : 280;
      const onAnimationComplete = () => {
        TweenMax.set(this.$el, {
          zIndex: 2
        });
        this.$el.style.transform = `translateZ(0) translateY(-100vh) translateY(${visiblePartHeight}px)`;
        bus.$emit(COLLECTION_PREVIEW_CLOSED);
      };

      new TimelineMax({ onComplete: onAnimationComplete })
        .to(this.$el, 1, {
          y: -(window.innerHeight - visiblePartHeight),
          ease: Power1.easeOut
        }, 0)
        .to('.SectionPreview__image', 1, {
          y: '25%',
          ease: Power1.easeOut
        }, 0);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionPreview {
    position: absolute;

    top: 0;
    left: 0;

    height: 100vh;
    width: calc(100% + 80px);

    margin-left: -40px;

    transform: translate3d(0, 0, 0);

    overflow: hidden;

    z-index: 4;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);

      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);

      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);

      margin-left: -14px;
    }

    &__image {
      height: 100vh;

      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      opacity: 0;
    }
  }
</style>
