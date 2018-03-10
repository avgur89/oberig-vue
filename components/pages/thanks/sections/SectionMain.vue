<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    img.SectionMain__pattern-left(
      :src="`/img/thanks-pattern-1.${webp_png}`",
      alt=""
    )
    img.SectionMain__pattern-right(
      :src="`/img/thanks-pattern-2.${webp_png}`",
      alt=""
    )
    .SectionMain__cnt
      h2.SectionMain__title {{ p.title }}
      .SectionMain__desc {{ p.description }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import webpExtension from '../../../../mixins/webpExtension';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    mixins: [webpExtension],
    computed: mapGetters(['p'])
  })
  export default class SectionMain extends Vue {
    /**
     * Reveal main screen
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionMain__title', {
        type: 'lines'
      });

      new TimelineMax()
        .set('.SectionMain__title', { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.73,
          { opacity: 0, y: Resp.isMobile ? -30 : -50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.2,
          0
        )
        // description
        .to('.SectionMain__desc', 0.75,
          { opacity: 1 },
          0.8
        )
        // left image pattern
        .fromTo('.SectionMain__pattern-left', 1,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0 },
          0
        )
        // right image pattern
        .fromTo('.SectionMain__pattern-right', 1,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0 },
          0
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .SectionMain {
    position: relative;

    min-height: 407px;
    width: calc(100% + 80px);

    margin-bottom: 134px;
    margin-left: -40px;

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
      min-height: 299px;

      margin-left: -14px;
      margin-bottom: 39px;
    }

    &__cnt {
      position: absolute;

      bottom: 0;
      left: 50%;

      max-width: 390px;
      width: 100%;

      transform: translateX(-50%);
      text-align: center;

      @media (max-width: $minTablet) {
        top: 50%;
        bottom: auto;
        transform: translate(-50%, -50%);

        padding: 0 14px;
      }
    }

    &__title {
      margin-bottom: 33px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

      color: #736d7b;

      text-transform: uppercase;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 20px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      opacity: 0;
    }

    &__pattern-left {
      position: absolute;

      left: 0;

      opacity: 0;

      @media (max-width: $minDesktop) {
        left: -117px;
      }

      @media (max-width: $minTablet) {
        max-height: 172px;
        left: -67px;
      }
    }

    &__pattern-right {
      position: absolute;

      right: 0;

      opacity: 0;

      @media (max-width: $minDesktop) {
        right: -117px;
      }

      @media (max-width: $minTablet) {
        max-height: 172px;
        right: -67px;
      }
    }
  }
</style>
