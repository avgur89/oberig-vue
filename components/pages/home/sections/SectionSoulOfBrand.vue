<template lang="pug">
  section.SectionSoulOfBrand#SectionSoulOfBrand(:class="cssClassesObject")
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-200",
      :action="revealSection"
    )
    .SectionSoulOfBrand__image
      .SectionSoulOfBrand__image-circles
        BaseSvgIcon.SectionSoulOfBrand__image-circle(
          icon="soul-of-brand-clip-circle-1",
          width="431",
          height="441",
          :fill="false"
        )
        BaseSvgIcon.SectionSoulOfBrand__image-circle(
          icon="soul-of-brand-clip-circle-2",
          width="442",
          height="451",
          :fill="false"
        )
        BaseSvgIcon.SectionSoulOfBrand__image-circle(
          icon="soul-of-brand-clip-circle-3",
          width="460",
          height="469",
          :fill="false"
        )
      .SectionSoulOfBrand__image-inner
        svg(width="431", height="440", viewBox="0 0 431 440")
          defs
            clipPath#soul-of-brand-image-clip
              path#soul-of-brand-image-clip-path(transform="translate(10 -3450) scale(0.6)", d="M312.38 5907.46c33.8 0 56.22 17.29 84.69 31.43 23.41 11.64 54 18.13 71.73 37.2 20.03 21.56 25.84 52.24 36.05 80.68 8.48 23.61 23.1 44.11 23.1 70.72 0 32.63-18.32 58.6-30.8 86.45-13.74 30.65-22.82 62.52-48.04 83.67-18.1 15.17-45.13 17.79-67.44 26.34-23.57 9.04-42.63 23.58-69.29 23.58-34 0-56.09-17.13-84.68-31.44-26.32-13.16-59.69-22.55-78.63-44.97-19.4-22.96-20.34-51-29.16-80.76-5.98-20.19-23.1-40.68-23.1-62.87 0-36.58 23.02-71.8 38.5-102.16 11.38-22.31 12.13-41.67 29.98-58.69 21.94-20.91 48.79-25.46 77.8-35.61 21.93-7.66 44.82-23.57 69.3-23.57z")
          image(id="soul-of-brand-image", width="100%", height="101%", :xlink:href="p.soulImage", clip-path="url(#soul-of-brand-image-clip)")
    .SectionSoulOfBrand__text
      h2.SectionSoulOfBrand__title
        span(v-html="firstTitlePart")
        span(v-html="secondTitlePart")
      .SectionSoulOfBrand__quote(v-html="p.soulQuote")
    ButtonCircles.SectionSoulOfBrand__link(
      :initiallyHidden="true",
      :text="p.soulLinkLabel",
      :url="philosophyUrl",
      ref="SectionSoulOfBrandLinkRef"
    )
</template>

<script>
  import '../../../../assets/svg/dist/soul-of-brand-clip-circle-1';
  import '../../../../assets/svg/dist/soul-of-brand-clip-circle-2';
  import '../../../../assets/svg/dist/soul-of-brand-clip-circle-3';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import animatable from '../../../../mixins/animatable';
  import { mapGetters } from 'vuex';
  import { initial, last, join, split } from 'lodash';
  import { extractStringChunks, generateUrl } from '../../../../modules/_helpers';
  import ButtonCircles from '../../../ui/ButtonCircles.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    mixins: [animatable],
    components: { ButtonCircles, BaseSvgIcon, BaseReveal },
    computed: mapGetters(['p'])
  })
  export default class SectionSoulOfBrand extends Vue {
    /**
     * @return {String}
     */
    get philosophyUrl() {
      return generateUrl(this.$route.params.lang, 'philosophy');
    }

    /**
     * @return {Array<String>}
     */
    get titleArray() {
      return split(this.p.soulTitle, ' ');
    }

    /**
     * @return {String}
     */
    get firstTitlePart() {
      return extractStringChunks(join(initial(this.titleArray), ' '));
    }

    /**
     * @return {String}
     */
    get secondTitlePart() {
      return extractStringChunks(last(this.titleArray));
    }

    /**
     * Animate-in soul of brand section elements (clip path, circles, title, text, link).
     */
    revealSection() {
      const quoteLines = new SplitText('.SectionSoulOfBrand__quote p', { type: 'lines' }).lines;
      const revealAnimation = new TimelineMax();

      revealAnimation
        // clip path
        .to('#soul-of-brand-image-clip-path', 1.2, {
          ease: Power1.easeOut,
          attr: { transform: 'translate(-90 -5636) scale(0.9569)' }
        })
        // circles
        .staggerTo('.SectionSoulOfBrand__image-circle', 1.2, {
          ease: Power1.easeOut,
          scale: 1
        }, 0.15, 0.09)
        // title
        .staggerFromTo('.SectionSoulOfBrand__title .chunk', 0.5, {
          opacity: 0,
          y: -50
        }, {
          ease: Power1.easeOut,
          opacity: 1,
          y: 0
        }, 0.15, 0)
        // quote
        .set('.SectionSoulOfBrand__quote p', { opacity: 1 }, 0)
        .staggerFromTo(quoteLines, 0.5, {
          opacity: 0,
          y: -50,
        }, {
          ease: Power1.easeOut,
          opacity: 1,
          y: 0
        }, 0.1, 0.51)
        // link
        .addCallback(this.$refs.SectionSoulOfBrandLinkRef.reveal, 0.95);
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  .SectionSoulOfBrand {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    max-width: 1280px;

    margin: 203px auto 0 auto;

    @media (min-width: 1600px) {
      margin-bottom: 200px;
    }

    @media (max-width: $minDesktop) {
      display: block;
      margin: 96px auto 0 auto;
    }

    @media (max-width: $minTablet) {
      margin-top: 79px;
      margin-bottom: 140px;
    }

    &.js-animatable {
      .SectionSoulOfBrand {
        &__title {
          div {
            opacity: 0;
          }
        }
        &__quote {
          p {
            opacity: 0;
          }
        }
      }
    }

    &__text {
      display: inline-block;

      margin-left: 354px;

      @media (min-width: $largeDesktop) {
        margin-left: 389px;
      }

      @media (max-width: $minDesktop) {
        display: block;
        margin: 52px auto 0;
        text-align: center;
      }

      @media (max-width: $minTablet) {
        margin-top: 50px;
      }
    }

    &__title {
      display: inline-block;
      position: relative;

      font-family: $MinionProRegular;
      font-size: 50px;
      line-height: 65px;
      text-transform: uppercase;

      margin-left: -1px;

      > span {
        display: block;
        width: 100%;

        white-space: nowrap;

        &:first-child {
          @media (min-width: $desktop) {
            margin-left: -64px;
          }
        }
      }

      div {
        display: inline-block;
        letter-spacing: -0.3px;
        color: #736d7b;
      }

      @media (max-width: $minTablet) {
        font-size: 35px;
        line-height: 50px;
        letter-spacing: 1.5px;
        margin-left: 0;
      }
    }

    &__quote {
      max-width: 280px;
      color: #444344;
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      margin-top: 31px;

      @media (min-width: $largeDesktop) {
        max-width: 420px;
      }

      @media (max-width: $minDesktop) {
        max-width: 66vw;
        margin: 31px auto 0;
      }

      @media (max-width: $minTablet) {
        font-size: 16px;
        line-height: 26px;
        max-width: none;
        margin-top: 15px;
      }

      p {
        letter-spacing: 0.1px;

        & + p {
          margin-top: 24px;

          @media (max-width: $minTablet) {
            margin-top: 19px;
          }
        }
      }
    }

    &__link {
      position: absolute;
      right: -23px;
      bottom: -32px;

      @media (min-width: $largeDesktop) {
        right: 5px;
      }

      @media (max-width: $minDesktop) {
        right: calc(50% - 64px);
        bottom: -102px;
      }

      @media (max-width: $minTablet) {
        right: calc(50% - 57px);

        .button-circles__text {
          letter-spacing: 1.2px;
        }
      }
    }

    &__image {
      position: absolute;

      left: 66px;
      top: -86px;

      width: 431px;
      height: 440px;

      z-index: 2;

      @media (min-width: $largeDesktop) {
        left: 40px;
      }

      @media (max-width: $minDesktop) {
        position: relative;

        left: auto;
        top: auto;

        margin: 0 auto;
      }

      @media (max-width: $minDesktop) {
        width: 340px;
        height: 340px;

        @media (min-width: $tablet) {
          transform: translateX(4px);
        }

        svg {
          width: 340px !important;
          height: 340px !important;
        }
      }

      @media (max-width: $minTablet) {
        width: 291px;
        height: 291px;

        svg {
          width: 291px !important;
          height: 291px !important;
        }
      }

      &-circles {
        position: absolute;
        right: 0;
        bottom: 0;

        z-index: 1;

        @media (max-width: $minDesktop) {
          width: 100%;
          height: 100%;

          right: 50%;
          bottom: 50%;

          transform: translate3d(50%, 50%, 0) translateX(4px) translateY(-3px);
        }
      }

      &-circle {
        position: absolute;

        stroke: #cdcdcd;

        transform: scale(0.5);

        &:nth-child(1) {
          right: 10px;
          bottom: -8px;

          opacity: 0.45;
          stroke: #cdcdcd;
        }
        &:nth-child(2) {
          right: 6px;
          bottom: -13px;

          stroke: #bdbaba;
        }
        &:nth-child(3) {
          bottom: -14px;
          right: 0;

          stroke: #bdbaba;
        }

        @media (max-width: $minDesktop) {
          width: 340px !important;
          height: 340px !important;

          @media (min-width: $tablet) {
            transform: translateX(4px);
          }

          svg {
            width: 340px !important;
            height: 340px !important;
          }
        }

        @media (max-width: $minTablet) {
          width: 291px !important;
          height: 291px !important;

          svg {
            width: 291px !important;
            height: 291px !important;
          }
        }
      }

      &-inner {
        position: relative;
        z-index: 2;
      }
    }
  }
</style>
