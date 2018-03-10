<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    img.SectionMain__pattern-left(
      :src="`/img/boutique-pattern-1.${webp_png}`",
      alt=""
    )
    img.SectionMain__pattern-right(
      :src="`/img/boutique-pattern-2.${webp_png}`",
      alt=""
    )
    .SectionMain__cnt
      h1.SectionMain__title(v-html="mainTitle")
      .SectionMain__desc(v-html="p.description")
      ButtonRainbowGradient.SectionMain__btn(
        :url="buttonMailto",
        :text="p.buttonLabel",
        isHref
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import animatedSectionTitle from '../../../../mixins/animatedSectionTitle';
  import webpExtension from '../../../../mixins/webpExtension';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';

  @Component({
    components: { ButtonRainbowGradient, BaseReveal },
    computed: mapGetters(['p']),
    mixins: [animatedSectionTitle, webpExtension]
  })
  export default class SectionMain extends Vue {
    /**
     * @return {String}
     */
    get buttonMailto() {
      return `mailto:${this.p.email}`;
    }

    /**
     * Animate main screen.
     */
    revealSection() {
      const secondaryElementsDelay = Resp.isMobile ? 0.3 : 0.5;

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
        // desc
        .to('.SectionMain__desc', 0.8,
          { opacity: 1 },
          secondaryElementsDelay
        )
        // button
        .fromTo('.SectionMain__btn', 0.8,
          { opacity: 0 },
          { opacity: 1 },
          secondaryElementsDelay
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .SectionMain {
    position: relative;

    min-height: 412px;
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
      min-height: 346px;

      margin-left: -14px;
      margin-bottom: 80px;
    }

    &__cnt {
      position: absolute;

      bottom: 0;
      left: 50%;

      max-width: 390px;
      width: 100%;

      transform: translateX(-50%);
      text-align: center;
    }

    &__title {
      margin-bottom: 37px;

      font-family: $MinionProDisp;
      font-size: 50px;
      line-height: 65px;
      letter-spacing: 1.4px;

      text-transform: uppercase;

      opacity: 0;

      color: #736d7b;

      @media (max-width: $minTablet) {
        margin-bottom: 20px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 1px;
      }
    }

    &__desc {
      margin-bottom: 34px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      opacity: 0;
    }

    &__pattern-left {
      position: absolute;

      top: 37px;
      left: 0;

      opacity: 0;

      @media (max-width: $minDesktop) {
        left: -228px;
      }

      @media (max-width: $minTablet) {
        max-height: 259px;
        left: -210px;
      }
    }

    &__pattern-right {
      position: absolute;

      top: 37px;
      right: 0;

      opacity: 0;

      @media (max-width: $minDesktop) {
        right: -228px;
      }

      @media (max-width: $minTablet) {
        max-height: 259px;
        right: -210px;
      }
    }

    &__btn {
      opacity: 0;
    }
  }
</style>
