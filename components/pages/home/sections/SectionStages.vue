<template lang="pug">
  section.SectionStages#SectionStages(:class="cssClassesObject")
    .SectionStages__title
      span.SectionStages__title-lines(ref="SectionStagesTitleLinesRef")
        span
        span
      h3(ref="SectionStagesTitleTextRef") {{ p.stagesTitle }}
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealSection"
    )
    img.SectionStages__image(
      :src="p.stagesImageId",
      ref="SectionStagesMainImageRef"
      alt=""
    )
    .SectionStages__items
      .SectionStages__item
        .SectionStages__item-line
          BaseSvgIcon(icon="stages-line-1", width="292", height="181", :fill="false")
        .SectionStages__item-text(@mouseover="setActiveItem($event)") {{ p.stageText1 }}
      .SectionStages__item
        .SectionStages__item-line
          BaseSvgIcon(icon="stages-line-2", width="287", height="96", :fill="false")
        .SectionStages__item-text(@mouseover="setActiveItem($event)") {{ p.stageText2 }}
      .SectionStages__item
        .SectionStages__item-line
          BaseSvgIcon(icon="stages-line-3", width="269", height="84", :fill="false")
        .SectionStages__item-text(@mouseover="setActiveItem($event)") {{ p.stageText3 }}
      .SectionStages__item
        .SectionStages__item-line
          BaseSvgIcon(icon="stages-line-4", width="316", height="154", :fill="false")
        .SectionStages__item-text(@mouseover="setActiveItem($event)") {{ p.stageText4 }}
      .SectionStages__item
        .SectionStages__item-line
          BaseSvgIcon(icon="stages-line-5", width="290", height="122", :fill="false")
        .SectionStages__item-text(@mouseover="setActiveItem($event)") {{ p.stageText5 }}
</template>

<script>
  import '~/assets/svg/dist/stages-line-1';
  import '~/assets/svg/dist/stages-line-2';
  import '~/assets/svg/dist/stages-line-3';
  import '~/assets/svg/dist/stages-line-4';
  import '~/assets/svg/dist/stages-line-5';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import animatable from '../../../../mixins/animatable';
  import { css, Resp } from '../../../../modules/_helpers';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  /**
   * SVG lines selector
   *
   * @constant
   * @type {string}
   */
  const PATHS_SELECTOR = 'path + path[pid="2"], path + path[pid="9"]';

  @Component({
    mixins: [animatable],
    components: { BaseReveal, BaseSvgIcon },
    computed: mapGetters(['p'])
  })
  export default class StagesSection extends Vue {
    /**
     * @return {NodeList}
     */
    get paths() {
      return this.$el.querySelectorAll(PATHS_SELECTOR);
    }

    /**
     * @return {NodeList}
     */
    get items() {
      return this.$el.querySelectorAll('.SectionStages__item');
    }

    /**
     * @return {NodeList}
     */
    get texts() {
      return this.$el.querySelectorAll('.SectionStages__item-text');
    }

    /**
     * @return {Array<Array>}
     */
    get splitSvgLines() {
      const svgLines = this.$el.querySelectorAll('.SectionStages__item-line');
      return [[svgLines[0], svgLines[4]], [svgLines[1], svgLines[3]], svgLines[2]];
    }

    /**
     * @return {Array<Array>}
     */
    get splitTexts() {
      const texts = this.texts;
      return [[texts[0], texts[4]], [texts[1], texts[3]], texts[2]];
    }

    mounted() {
      // prepare paths for animation
      if (Resp.isDesk) TweenMax.to(this.paths, 0.01, { drawSVG: '100% 100%' });
    }

    /**
     * Set new active item.
     *
     * @param {HTMLElement} target
     */
    setActiveItem({ target }) {
      if (!target) return;

      if (Resp.isIE) return;

      const clickedItem = target.closest('.SectionStages__item');
      const clickedItemPath = clickedItem.querySelector(PATHS_SELECTOR);
      const clickedItemText = clickedItem.querySelector('.SectionStages__item-text');

      this.unsetAllItems();

      // show clicked path
      TweenMax.to(clickedItemPath, 0.7, { ease: Power1.easeOut, drawSVG: '0% 100%' });
      // show clicked text
      clickedItem.classList.add(css.active);
      // show other texts
      TweenMax.to(clickedItemText, 0.7, { ease: Power1.easeOut, x: -19 });
    }

    /**
     * Remove active state from all items.
     */
    unsetAllItems() {
      // hide other paths
      TweenMax.to(this.paths, 0.7, { drawSVG: '100% 100%' });
      // hide other paths dots
      this.items.forEach(item => item.classList.remove(css.active));
      // hide other texts
      TweenMax.to(this.texts, 0.6, { ease: Power1.easeOut, x: 0 });
    }

    /**
     * Animate-in stages section elements.
     */
    revealSection() {
      const {
        SectionStagesTitleTextRef: titleText,
        SectionStagesTitleLinesRef: titleLines,
        SectionStagesMainImageRef: mainImage
      } = this.$refs;
      const titleTextLines = new SplitText(titleText, { type: 'lines' }).lines;
      const titleLinesSpans = titleLines.querySelectorAll('span');
      const revealAnimation = new TimelineMax();
      let splitTextStaggerDelay = 0.4;

      revealAnimation
        // title and title lines
        .set(this.$el, { opacity: 1 })
        .staggerFromTo(titleTextLines, 0.6, {
          opacity: 0,
          y: -25
        }, {
          ease: Power1.easeOut,
          opacity: 1,
          y: 0
        }, 0.1, 0)
        .staggerTo(titleLinesSpans, 0.4, { cycle: { height: [86, 80] } }, 0.2, 0.1)
        // main image
        .to(mainImage, 0.8, {
          delay: 0.2,
          y: 0,
          opacity: 1
        }, 0.2);

      // text blocks and svg lines
      if (Resp.isDesk) {
        this.splitTexts.forEach((text, index) => {
          splitTextStaggerDelay += 0.25;

          revealAnimation
            .fromTo(text, 0.75, {
              transition: 'none'
            }, {
              ease: Power1.easeOut,
              opacity: 1,
              y: 0,
              onComplete: () => {
                if (index === 2) [...this.texts].forEach((t) => { t.style.transition = ''; });
              }
            }, splitTextStaggerDelay)
            .to(this.splitSvgLines[index], 0.8, { opacity: 1 }, splitTextStaggerDelay);
        });
      } else {
        revealAnimation
          .staggerTo(this.texts, 0.65, {
            ease: Power1.easeOut,
            opacity: 1,
            y: 0
          }, 0.15, 0.4);
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  .SectionStages {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    min-height: 400px;

    max-width: 1280px;

    margin: 238px auto 0 auto;

    opacity: 0;

    @media (max-width: $minDesktop) {
      display: block;
      margin: -9px auto 0 auto;
    }

    @media (min-width: $largeDesktop) {
      margin-top: 90px;
    }

    &.js-animatable {
      .SectionStages {
        &__title {
          div {
            opacity: 0;
          }
          &-lines {
            span {
              height: 0;
            }
          }
        }
        &__image {
          opacity: 0;
          transform: translate3d(-50%, 40px, 0);
        }
        &__item {
          .SectionStages__item-line {
            opacity: 0;
          }

          .SectionStages__item-text {
            opacity: 0;
          }

          &:nth-child(1), &:nth-child(2) {
            .SectionStages__item-text {
              transform: translateY(-60px);

              @media (max-width: $minDesktop) {
                transform: translateY(60px);
              }
            }
          }
          &:nth-child(4), &:nth-child(5) {
            .SectionStages__item-text {
              transform: translateY(60px);
            }
          }

          @media (max-width: $minDesktop) {
            &:nth-child(3) {
              .SectionStages__item-text {
                transform: translateY(60px);
              }
            }
          }
        }
      }
    }

    &__title {
      position: relative;

      max-width: 24vw;
      font-family: $MinionProRegular;
      font-size: 30px;
      font-weight: 400;
      line-height: 45px;
      text-transform: uppercase;
      letter-spacing: 1.1px;

      margin-left: 93px;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      @media (min-width: 1700px) {
        max-width: 17vw;
      }

      @media (min-width: $largeDesktop) {
        margin-left: 55px;
      }

      @media (max-width: $minDesktop) {
        max-width: none;
        width: 55vw;
        margin: 0 auto;
        letter-spacing: 1.7px;
        left: 6px;
      }

      @media (max-width: $minTablet) {
        width: 100%;
        left: 0;

        font-size: 25px;
        line-height: 40px;

        padding-left: 48px;
      }

      div {
        color: #736d7b;
      }

      &-lines {
        position: absolute;

        left: -54px;
        top: 9px;

        @media (max-width: $minDesktop) {
          left: -44px;
        }

        @media (max-width: $minTablet) {
          left: 1px;
        }

        span {
          &:first-child {
            position: absolute;

            left: 0;
            top: 0;

            display: block;
            width: 2px;
            height: 86px;
            border: 1px solid #cdcdcd;
          }
          &:last-child {
            position: absolute;

            left: 3px;
            top: 0;

            display: block;
            width: 0;
            height: 80px;
            border-right: 1px solid #cdcdcd;
          }
        }
      }
    }

    &__image {
      position: absolute;
      top: -53px;
      left: calc(50% - 1.3vw);
      transform: translate3d(-50%, 0, 0);

      z-index: 2;

      @media (max-width: 1340px) {
        top: 5px;
      }

      @media (max-width: $minDesktop) {
        display: none;
      }
    }

    &__items {
      margin-right: 27px;
      letter-spacing: 0.1px;

      @media (min-width: $largeDesktop) {
        margin-right: 0;
      }

      @media (max-width: $minDesktop) {
        position: relative;
        margin: 40px auto 0;
        max-width: 55vw;
        left: 6px;
      }

      @media (max-width: $minTablet) {
        margin-top: 22px;
        max-width: none;
        left: 0;
        padding-left: 48px;
      }
    }

    &__item {
      position: relative;

      &.js-active {
        .SectionStages__item {
          &-line {
            path {
              &:first-child {
                stroke: #b5b3b3;
                fill: #b5b3b3;
              }
            }

            defs + path[pid="2"] {
              fill: #b5b3b3;
            }
          }
        }
      }

      &:not(:first-child) {
        margin-top: 22px;

        @media (max-width: $minDesktop) {
          margin-top: 23px;
        }

        @media (max-width: $minTablet) {
          margin-top: 18px;
        }
      }

      &:nth-child(1) {
        .SectionStages__item-line {
          top: -31px;
        }
      }

      &:nth-child(2) {
        .SectionStages__item-line {
          top: -60px;
        }
      }

      &:nth-child(3) {
        .SectionStages__item-line {
          top: -16px;
        }
      }

      &:nth-child(4) {
        .SectionStages__item-line {
          top: -114px;
        }
      }

      &:nth-child(5) {
        .SectionStages__item-line {
          top: -90px;

          path {
            &:nth-child(2) {
              stroke-width: 1;
            }
            &[pid="7"] {
              stroke: none !important;
            }
          }
        }
      }

      &-text {
        color: #444344;
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        max-width: 300px;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @media (min-width: $largeDesktop) {
          max-width: 354px;
        }

        @media (max-width: 1270px) {
          max-width: 280px;
        }

        @media (max-width: 1250px) {
          max-width: 250px;
        }

        @media (max-width: $minDesktop) {
          position: relative;
          max-width: none;

          &:before {
            content: '';

            position: absolute;

            left: -45px;
            top: 10px;

            border-radius: 50%;

            width: 5px;
            height: 5px;
            background-color: #cdcdcd;
          }
        }

        @media (max-width: $minTablet) {
          &:before {
            left: -47px;
            top: 9px;
          }
        }
      }

      &-line {
        position: absolute;
        right: calc(100% + 42px);
        top: 0;

        path {
          stroke: #cdcdcd;

          opacity: 0.3;

          &:first-child {
            fill: #cdcdcd;
            stroke: none !important;
            transition: .3s ease;
          }

          &[pid="0"] {
            opacity: 0.66;
          }

          &[pid="2"], &[pid="9"] {
            stroke: #b5b3b3;
            stroke-width: 1.5;
          }
        }

        @media (max-width: $minDesktop) {
          display: none;
        }
      }
    }
  }
</style>
