<template lang="pug">
  .SectionBanner(
    :style="{ 'background-image': `url(${p.staticBanner})` }",
    :class="$style.sectionBanner"
  )
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection",
      :in-viewport-offset-top="-100"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import { PHILOSOPHY_VIDEO_CLOSED } from '../../../../modules/_events';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['philosophyVideoWasShown', 'p'])
  })
  export default class SectionEmptyBanner extends Vue {
    destroyed() {
      bus.$off(PHILOSOPHY_VIDEO_CLOSED, this.revealSection);
    }

    /**
     * Show banner
     */
    revealSection() {
      this.philosophyVideoWasShown
        ? this.revealAnimation()
        : bus.$on(PHILOSOPHY_VIDEO_CLOSED, this.revealAnimation);
    }

    /**
     * Reveal banner animation
     */
    revealAnimation() {
      TweenMax.to(this.$el, 1, { opacity: 1, ease: Power1.easeOut });
    }
  }
</script>

<style lang="scss" module>
  @import '../../../../assets/scss/variables';

  .sectionBanner {
    opacity: 0;

    position: relative;

    width: calc(100% + 80px);
    height: 380px;

    margin-left: -40px;
    margin-bottom: 75px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);
      height: 380px;

      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      height: 200px;

      margin-left: -14px;
    }

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);
      margin-left: -98px;
    }
  }
</style>
