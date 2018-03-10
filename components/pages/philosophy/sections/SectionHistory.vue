<template lang="pug">
  section.SectionHistory
    section.SectionHistory__inner
      BaseReveal(
        :in-viewport-once="true",
        :in-viewport-offset-top="-150",
        :action="revealSection"
      )
      PortraitImage.SectionHistory__image(:imgUrl="p.historyPhoto")
        .SectionHistory__image-cnt
          .SectionHistory__image-title {{ p.historyName }}
          p.SectionHistory__image-desc {{ p.historySignature }}
    .SectionHistory__cnt
      h2.SectionHistory__title {{ p.historyTitle }}
      .SectionHistory__desc
        span.SectionHistory__desc-lines
          span
          span
          span
        .SectionHistory__desc-text(v-html="p.historyDescription")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import PortraitImage from '../../../ui/PortraitImage.vue';

  @Component({
    components: { BaseReveal, PortraitImage },
    computed: mapGetters(['p'])
  })
  export default class SectionHistory extends Vue {
    /**
     * Reveal history section
     */
    revealSection() {
      const ease = Power1.easeOut;
      const { lines: titleLines } = new SplitText('.SectionHistory__title', {
        type: 'lines'
      });
      const { lines: descLines } = new SplitText('.SectionHistory__desc p', {
        type: 'lines'
      });

      new TimelineMax()
        .set('.SectionHistory__title, .SectionHistory__desc', { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.7,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease },
          0.2,
          0
        )
        // description
        .staggerFromTo(descLines, 0.5,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease },
          0.081,
          0.5
        )
        // lines
        .staggerFromTo('.SectionHistory__desc-lines span', 0.5,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0 },
          0.5,
          0.6
        )
        // text under photo
        .fromTo('.SectionHistory__image-title, .SectionHistory__image-desc', 1,
          { opacity: 0 },
          { opacity: 1 },
          0.8
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionHistory {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    min-height: 720px;

    margin-bottom: 105px;

    @media (max-width: $minDesktop) {
      min-height: 500px;
      margin-bottom: 90px;
    }

    @media (max-width: $minTablet) {
      flex-direction: column;
      align-items: center;

      min-height: 410px;

      margin-bottom: 94px;
    }

    &__cnt {
      position: relative;
      flex: 1 1 auto;

      max-width: 420px;
      width: 100%;

      margin-top: 133px;

      @media (max-width: $minDesktop) {
        margin-top: 75px;
      }

      @media (max-width: $minTablet) {
        margin-top: 155px;
        text-align: center;
      }
    }

    &__title {
      margin-bottom: 40px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;

      color: #3c3131;

      opacity: 0;

      @media (max-width: $minTablet) {
        position: absolute;

        top: -575px;
        left: 50%;

        max-width: 335px;
        width: 100%;

        margin: 0 auto;
        text-align: center;

        font-size: 35px;
        line-height: 50px;
        letter-spacing: 0.88px;

        transform: translateX(-50%);
      }
    }

    &__desc {
      position: relative;

      margin-left: 55px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-left: 0;
      }

      &-lines {
        position: absolute;

        left: -54px;
        top: 9px;

        @media (max-width: $minTablet) {
          display: none;
        }
      }
    }

    &__inner {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: flex-start;

      flex: 0 0 435px;

      margin-right: 158px;
      margin-left: 37px;
      margin-top: 70px;

      @media (max-width: $minDesktop) {
        flex: 0 0 340px;
        justify-content: flex-start;

        margin-top: 35px;
        margin-left: 0;
        margin-right: 11px;
      }

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;

        margin-right: 0;
        margin-top: 141px;
      }
    }

    &__image {
      position: relative;

      left: 66px;
      top: 0;

      width: 431px;
      height: 440px;

      z-index: 2;

      @media (min-width: $largeDesktop) {
        left: 40px;
      }

      @media (max-width: $minDesktop) {
        left: 0;
      }

      @media (max-width: $minTablet) {
        margin: 0 auto;
      }

      &-cnt {
        max-width: 300px;
        width: 100%;

        margin: 44px auto 0 auto;
        text-align: center;

        @media (max-width: $minDesktop) {
          margin-top: 33px;
        }

        @media (max-width: $minTablet) {
          margin-top: 37px;
        }
      }

      &-title {
        @include gradient-text(false);

        margin-bottom: 20px;

        font-family: $MinionProDisp;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
        text-transform: uppercase;
        letter-spacing: 1.5px;

        color: #4d4d4d;

        opacity: 0;

        @media (max-width: $minTablet) {
          font-size: 25px;
          line-height: 40px;
          letter-spacing: 1.25px;
        }
      }

      &-desc {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;

        opacity: 0;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/mixins";

  .SectionHistory {
    &__title {
      > div {
        @include gradient-text(false);
      }
    }
    &__desc {
      &-text {
        p {
          margin-bottom: 27px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      &-lines {
        span {
          opacity: 0;

          &:first-child {
            position: absolute;

            left: 0;
            top: 0;

            display: block;

            width: 2px;
            height: 86px;

            background-color: #d6d5d7;
          }

          &:nth-child(2) {
            position: absolute;

            left: 6px;
            top: 0;

            display: block;

            width: 1px;
            height: 60px;

            background-color: #ebe7ee;
          }

          &:last-child {
            position: absolute;

            left: 3px;
            top: 0;

            display: block;

            width: 2px;
            height: 80px;

            background-color: #ebe8ef;
          }
        }
      }
    }
  }
</style>
