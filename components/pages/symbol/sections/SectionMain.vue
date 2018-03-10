<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    img.SectionMain__pattern-left(
      :src="`/img/philosophy-pattern-1.${webp_png}`",
      alt=""
    )
    img.SectionMain__pattern-right(
      :src="`/img/philosophy-pattern-2.${webp_png}`",
      alt=""
    )
    .SectionMain__cnt
      h1.SectionMain__title(v-html="mainTitle")
      .SectionMain__desc(v-html="p.description", :class="$style.paragraphMargin")
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
        .set(this.$el, { opacity: 1 })
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
        .staggerFromTo('.SectionMain__desc p', 0.85,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.25
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

    margin-bottom: 109px;
    margin-left: -40px;

    opacity: 0;

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
      min-height: 257px;

      margin-left: -14px;
      margin-bottom: 103px;
    }

    &__cnt {
      position: absolute;

      max-width: 380px;
      width: 100%;

      text-align: center;

      @media (min-width: $tablet) {
        top: 53%;
        left: 49.5%;
        transform: translate(-50%, -50%);
      }

      @media (max-width: $minTablet) {
        position: relative;
        max-width: 408px;
        padding: 0 14px;
      }
    }

    &__title {
      margin-bottom: 32px;

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
    }

    &__pattern-left {
      position: absolute;

      left: -42px;

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

<style lang="scss" module>
  .SectionMain {
    &__desc {
      p {
        margin-bottom: 25px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .paragraphMargin {
    p {
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
