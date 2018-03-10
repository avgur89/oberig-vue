<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    img.SectionMain__pattern-left(
      :src="`/img/order-pattern-1.${webp_png}`",
      alt=""
    )
    img.SectionMain__pattern-right(
      :src="`/img/order-pattern-2.${webp_png}`",
      alt=""
    )
    .SectionMain__cnt
      h1.SectionMain__title(v-html="mainTitle")
      .SectionMain__desc(v-html="p.description")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import animatedSectionTitle from '../../../../mixins/animatedSectionTitle';
  import webpExtension from '../../../../mixins/webpExtension';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p']),
    mixins: [animatedSectionTitle, webpExtension]
  })
  export default class SectionMain extends Vue {
    /**
     * Reveal main section
     */
    revealSection() {
      new TimelineMax()
        // title
        .add(this.revealMainTitle())
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
          { opacity: 1 },
          0.35
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

    margin-bottom: 92px;
    margin-left: -40px;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);

      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);

      margin-left: -34px;
      margin-bottom: 76px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);

      min-height: 257px;
      margin-left: -14px;
      margin-bottom: 44px;
    }

    &__cnt {
      position: absolute;

      top: 51%;
      left: 49%;

      max-width: 380px;
      width: 100%;

      transform: translate(-50%, -50%);
      text-align: center;

      @media (max-width: $minDesktop) {
        top: 50%;
        left: 50%;
      }
    }

    &__title {
      margin-bottom: 42px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

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
        left: -310px;
      }

      @media (max-width: $minTablet) {
        max-height: 257px;
        left: -267px;
      }
    }

    &__pattern-right {
      position: absolute;

      right: -42px;

      opacity: 0;

      @media (max-width: $minDesktop) {
        right: -310px;
      }

      @media (max-width: $minTablet) {
        max-height: 257px;
        right: -267px;
      }
    }
  }
</style>
