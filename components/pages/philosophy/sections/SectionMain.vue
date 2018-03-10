<template lang="pug">
  section.SectionMain
    img.SectionMain__pattern-left(
      :src="`/img/philosophy-pattern-1.${webp_png}`",
      alt=""
    )
    img.SectionMain__pattern-right(
      :src="`/img/philosophy-pattern-2.${webp_png}`",
      alt=""
    )
    .SectionMain__cnt
      h1.SectionMain__title {{ p.title }}
      .SectionMain__desc(v-html="p.description")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import webpExtension from '../../../../mixins/webpExtension';
  import bus from '../../../../plugins/event-bus';
  import { PHILOSOPHY_VIDEO_CLOSED } from '../../../../modules/_events';
  import { Resp } from '../../../../modules/_helpers';

  @Component({
    mixins: [webpExtension],
    computed: mapGetters(['p', 'philosophyVideoWasShown'])
  })
  export default class SectionMain extends Vue {
    mounted() {
      this.philosophyVideoWasShown
        ? this.revealSection()
        : bus.$on(PHILOSOPHY_VIDEO_CLOSED, this.revealSection);
    }

    destroyed() {
      bus.$off(PHILOSOPHY_VIDEO_CLOSED, this.revealSection);
    }

    /**
     * Reveal main section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionMain__title', {
        type: 'lines'
      });

      new TimelineMax()
        .set('.SectionMain__title', { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.65,
          { opacity: 0, y: Resp.isMobile ? -40 : 40 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
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
        )
        // description
        .fromTo('.SectionMain__desc', 1,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeOut },
          0.5
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    min-height: 348px;
    width: calc(100% + 80px);

    margin-bottom: 76px;
    margin-left: -40px;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);

      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);

      margin-left: -34px;
      margin-bottom: 78px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      min-height: 257px;

      margin-left: -14px;
      margin-bottom: 41px;
    }

    &__cnt {
      position: absolute;

      top: 50%;
      left: 50%;

      max-width: 380px;
      width: 100%;

      transform: translate(-50%, -50%);
      text-align: center;
    }

    &__title {
      margin-bottom: 33px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.251px;

      color: #736d7b;

      opacity: 0;

      text-transform: uppercase;

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

      left: -42px;

      opacity: 0;

      @media (max-width: $minDesktop) {
        left: -192px;
      }

      @media (max-width: $minTablet) {
        max-height: 257px;
        left: -178px;
      }
    }

    &__pattern-right {
      position: absolute;

      right: -42px;

      opacity: 0;

      @media (max-width: $minDesktop) {
        right: -192px;
      }

      @media (max-width: $minTablet) {
        max-height: 257px;
        right: -178px;
      }
    }
  }
</style>
