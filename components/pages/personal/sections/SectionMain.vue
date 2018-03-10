<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    img.SectionMain__pattern-left(:src="`/img/managers-pattern-1.${webp_png}`", alt="")
    img.SectionMain__pattern-right(:src="`/img/managers-pattern-2.${webp_png}`", alt="")
    .SectionMain__cnt
      h1.SectionMain__title {{ p.title }}
      .SectionMain__desc(v-html="descriptionForClient")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import webpExtension from '../../../../mixins/webpExtension';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    mixins: [webpExtension],
    computed: mapGetters(['p', 'm'])
  })
  export default class SectionMain extends Vue {
    /**
     * @return {String}
     */
    get descriptionForClient() {
      return `${this.m.clientName}, ${this.p.textUnderTitle}`;
    }

    /**
     * Animate main screen
     */
    revealSection() {
      const { words: titleWords } = new SplitText('.SectionMain__title', {
        type: 'words'
      });

      new TimelineMax()
        .set('.SectionMain__title', { opacity: 1 })
        // title
        .staggerFromTo(titleWords, 0.6,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // description
        .fromTo('.SectionMain__desc', 1,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0 },
          0.35
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
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    min-height: 348px;
    width: calc(100% + 80px);

    margin-bottom: 68px;
    margin-left: -40px;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);

      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);

      margin-left: -34px;
      margin-bottom: 32px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      min-height: 172px;

      margin-left: -14px;
      margin-bottom: 16px;
    }

    &__cnt {
      position: absolute;

      top: 64%;
      left: 50%;

      max-width: 390px;
      width: 100%;

      transform: translate(-50%, -50%);
      text-align: center;

      @media (max-width: $minDesktop) {
        top: 60%;
      }

      @media (max-width: $minTablet) {
        top: 33%;
      }
    }

    &__title {
      margin-bottom: 33px;

      font-family: $MinionProDisp;
      font-size: 50px;
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

<style lang="scss">
  .SectionMain {
    &__desc {
      p {
        display: inline;
      }
    }
  }
</style>
