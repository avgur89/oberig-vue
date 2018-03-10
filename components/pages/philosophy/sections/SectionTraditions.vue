<template lang="pug">
  section.SectionTraditions
    .SectionTraditions__list
      .SectionTraditions__item
        .SectionTraditions__title {{ p.traditionsTitle }}
        p.SectionTraditions__desc {{ p.traditionsDescription }}
      .SectionTraditions__item
        .SectionTraditions__title {{ p.qualityTitle }}
        p.SectionTraditions__desc {{ p.qualityDescription }}
      .SectionTraditions__item
        .SectionTraditions__title {{ p.uniquenessTitle }}
        p.SectionTraditions__desc {{ p.uniquenessDescription }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import { PHILOSOPHY_VIDEO_CLOSED } from '../../../../modules/_events';
  import { Resp } from '../../../../modules/_helpers';

  @Component({
    computed: mapGetters(['p', 'philosophyVideoWasShown'])
  })
  export default class SectionTraditions extends Vue {
    mounted() {
      if (this.philosophyVideoWasShown) return this.revealSection();

      bus.$on(PHILOSOPHY_VIDEO_CLOSED, this.revealSection);
    }

    destroyed() {
      bus.$off(PHILOSOPHY_VIDEO_CLOSED, this.revealSection);
    }

    /**
     * Reveal traditions section
     */
    revealSection() {
      const sectionTraditionsItemsQueue = Resp.isMobile || Resp.isTablet
        ? '.SectionTraditions__item'
        : [
          '.SectionTraditions__item:nth-child(2)',
          '.SectionTraditions__item:not(:nth-child(2))'
        ];

      TweenMax.staggerFromTo(
        sectionTraditionsItemsQueue,
        0.85,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.3
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionTraditions {
    position: relative;

    margin-bottom: 120px;

    @media (max-width: $minTablet) {
      margin-bottom: 96px;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      margin-bottom: 135px;
      padding-right: 8px;

      @media (max-width: $minDesktop) {
        flex-direction: column;
        justify-content: flex-start;

        padding-right: 0;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 96px;
      }
    }

    &__item {
      flex: 0 1 33%;
      margin-right: 50px;

      text-align: center;

      opacity: 0;

      &:last-child {
        margin-right: 0;
      }

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;
        width: 100%;

        margin-bottom: 83px;
        margin-right: 0;

        &:last-child {
          margin-bottom: 0;
        }
      }

      @media (max-width: $minTablet) {
        margin-bottom: 49px;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 21px;

      font-family: $MinionProDisp;
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 1.5px;

      color: #4d4d4d;

      text-transform: uppercase;

      @media (max-width: $minDesktop) {
        max-width: 356px;
        width: 100%;

        margin-left: auto;
        margin-right: auto;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 18px;

        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      @media (max-width: $minDesktop) {
        max-width: 356px;
        width: 100%;

        margin: 0 auto;
      }
    }
  }
</style>
