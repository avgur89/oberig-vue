<template lang="pug">
  section.SectionOrnament
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealSection"
    )
    .SectionOrnament__column
      .SectionOrnament__column-title
        span.SectionOrnament__column-title-lines
          span
          span
          span
        h2.SectionOrnament__column-title-text {{ p.blockWithImageTitle }}
    .SectionOrnament__pattern
      img.SectionOrnament__pattern-image(:src="p.productImage", alt="")
    .SectionOrnament__column(v-html="p.blockWithImageDescription", :class="$style.paragraphMargin")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p'])
  })
  export default class SectionOrnament extends Vue {
    /**
     * Reveal ornament section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionOrnament__column-title-text', {
        type: 'lines'
      });
      const { lines: descLines } = new SplitText('.SectionOrnament__column p', {
        type: 'lines'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // image
        .fromTo('.SectionOrnament__pattern', 0.9,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0
        )
        // title
        .staggerFromTo(titleLines, 0.7,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.1,
          Resp.isDesk ? 0.3 : 0
        )
        // description
        .staggerFromTo(descLines, 0.6,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.1,
          Resp.isDesk ? 0.3 : 0
        )
        // lines
        .staggerFromTo('.SectionOrnament__column-title-lines span', 0.5,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0 },
          0.2,
          Resp.isDesk ? 0.3 : 0
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionOrnament {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 71px;
    padding-left: 39px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      margin-bottom: 124px;
      padding: 0;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 87px;
    }

    &__column {
      flex: 1 1 auto;
      width: 100%;

      &:last-child {
        margin-right: 0;
      }

      &-title {
        position: relative;

        margin-left: 55px;

        @media (max-width: $minDesktop) {
          margin-left: 0;
          margin-bottom: 45px;
        }

        @media (max-width: $minTablet) {
          margin-bottom: 20px;
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

        &-text {
          max-width: 240px;
          width: 100%;

          font-family: $MinionProDisp;
          font-size: 30px;
          font-weight: 400;
          line-height: 45px;
          text-transform: uppercase;
          letter-spacing: 1.5px;

          color: #736d7b;

          @media (max-width: $minDesktop) {
            max-width: 478px;
            width: 100%;

            margin: 0 auto;
            text-align: center;
          }

          @media (max-width: $minTablet) {
            font-size: 25px;
            line-height: 40px;
            letter-spacing: 1.25px;
          }
        }

        &-lines {
          position: absolute;

          left: -54px;
          top: 9px;

          @media (max-width: $minDesktop) {
            display: none;
          }
        }
      }
    }

    &__pattern {
      flex: 0 0 405px;

      display: flex;
      justify-content: center;
      align-items: flex-start;

      height: 304px;

      margin-right: 12px;

      background-color: transparent;

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        max-width: 405px;
        width: 100%;

        margin-bottom: 3px;
        margin-right: 0;
      }

      @media (max-width: $minTablet) {
        display: none;
      }

      &-image {
        max-width: 250px;
        max-height: 250px;
      }
    }
  }
</style>

<style lang="scss" module>
  @import "../../../../assets/scss/variables";

  .paragraphMargin {
    p {
      margin-bottom: 22px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      &:last-child {
        margin-bottom: 0;
      }

      @media (max-width: $minDesktop) {
        max-width: 493px;
        width: 100%;

        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
    }
  }
</style>
