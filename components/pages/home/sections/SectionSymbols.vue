<template lang="pug">
  section.SectionSymbols#SectionSymbols
    h2.SectionSymbols__title(
      v-html="sectionTitle",
      ref="SectionSymbolsTitleRef",
      :class="{ [animatable]: !animationIsFinished }"
    )
    .SectionSymbols__text(
      v-html="sectionText",
      ref="SectionSymbolsTextRef",
      :class="{ [animatable]: !animationIsFinished }"
    )
    SliderRadial.SectionSymbols__slider(
      :initiallyHidden="!animationIsFinished",
      :items="pageData.symbols",
      ref="SectionSymbolsSliderRef",
      v-once
    )
    ButtonCircles.SectionSymbols__link(
      :initiallyHidden="!animationIsFinished",
      :text="p.symbolsLinkLabel",
      :url="symbolsLink",
      ref="SectionSymbolsLinkRef",
      v-once
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import bus from '../../../../plugins/event-bus';
  import { mapGetters } from 'vuex';
  import { replace } from 'lodash';
  import { Resp, css, extractStringChunks } from '../../../../modules/_helpers';
  import { ANIMATION_FINISHED } from '../../../../modules/_events';
  import ButtonCircles from '../../../ui/ButtonCircles.vue';
  import SliderRadial from '../../../ui/SliderRadial.vue';

  @Component({
    components: { ButtonCircles, SliderRadial },
    computed: mapGetters(['p', 'pageData', 'menu', 'animationIsFinished'])
  })
  export default class SymbolsSection extends Vue {
    /**
     * @type {String}
     */
    sectionText = '';

    /**
     * Css-class, element visibility indicator.
     *
     * @type {String}
     */
    animatable = css.animatable;

    /**
     * @return {String}
     */
    get sectionTitle() {
      return extractStringChunks(this.p.symbolsTitle);
    }

    /**
     * @return {String}
     */
    get symbolsLink() {
      const [{ route }] = this.menu.filter(item => item.name === 'symbol');
      return route;
    }

    mounted() {
      this.sectionText = Resp.isDesk
        ? this.p.symbolsDescription
        : replace(this.p.symbolsDescription, /<br>/g, '');

      bus.$on(ANIMATION_FINISHED, this.revealSymbolsSection);

      // set initial height
      if (Resp.isTablet) TweenMax.set(this.$el, { height: window.innerHeight });

      // crutches
      if (this.animationIsFinished) {
        TweenMax
          .set([this.$refs.SectionSymbolsTitleRef, this.$refs.SectionSymbolsTextRef], { opacity: 1 });
      }
    }

    destroyed() {
      bus.$off(ANIMATION_FINISHED, this.revealSymbolsSection);
    }

    /**
     * Reveal symbol section (link, slider, title, subtitle).
     */
    revealSymbolsSection() {
      new TimelineMax()
        // slider
        .addCallback(this.$refs.SectionSymbolsSliderRef.reveal, 0)
        // title and subtitle
        .addCallback(this.revealTextNodes, 0.3)
        // link
        .addCallback(this.$refs.SectionSymbolsLinkRef.reveal, 1.15);
    }

    /**
     * Reveal title and subtitle.
     */
    revealTextNodes() {
      const {
        SectionSymbolsTitleRef: title,
        SectionSymbolsTextRef: text
      } = this.$refs;
      const titleSyllables = [...title.querySelectorAll('div')];
      const textLines = new SplitText(text, { type: 'lines' }).lines;

      new TimelineMax()
        .set('.SectionSymbols__title, .SectionSymbols__text', { opacity: 1 })
        // crutches (because of splitText plugin)
        .addCallback(() => { text.style.opacity = 1; }, 0)
        // show title
        .staggerFromTo(titleSyllables.reverse(), 0.55, { y: -40, opacity: 0 }, {
          ease: Power1.easeOut,
          opacity: 1,
          y: 0
        }, 0.08, 0)
        // show subtitle
        .staggerFromTo(textLines, 0.3, {
          opacity: 0,
          y: -30
        }, {
          ease: Power1.easeOut,
          opacity: 1,
          y: 0
        }, 0.07, 0.3);
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  #app .SectionSymbols {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    max-width: 1280px;

    margin: 0 auto;

    @media (max-width: $minDesktop) {
      height: auto;
    }

    @media (max-width: $minTablet) {
      display: block;

      margin-top: 116px;
      margin-bottom: 168px;
    }

    &__title {
      position: absolute;

      left: 37px;
      top: calc(50% - 128px);

      display: inline-block;
      font-family: $MinionProRegular;
      font-size: 50px;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: -0.5px;

      opacity: 0;

      color: #736d7b;

      div {
        display: inline-block;
      }

      > div, > span {
        &:not(:first-child) {
          margin-left: 5px;
        }
      }

      @media (min-width: $largeDesktop) {
        left: 0;
        top: calc(50% - 90px);
      }

      @media (max-width: $minDesktop) {
        left: 50%;
        top: 16.3vh;
        transform: translate3d(-50%, 0, 0);

        @media (orientation: landscape) {
          top: 13.3vh;
        }
      }

      @media (max-width: $minTablet) {
        left: auto;
        top: auto;

        transform: none;

        position: relative;
        font-size: 35px;
        line-height: 45px;
        width: 100%;
        text-align: center;
      }

      &.js-animatable {
        div {
          opacity: 0;
          transform: translate3d(0, -60px, 0);
        }
      }
    }

    &__text {
      position: absolute;

      left: 94px;
      top: calc(50% - 31px);

      width: 15vw;
      color: #444344;
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0.1px;

      opacity: 0;

      @media (min-width: $largeDesktop) {
        left: 60px;
        top: calc(50% + 5px);
      }

      @media (max-width: $minDesktop) {
        left: 50%;
        top: calc(16.3vh + 77px);
        width: 500px;
        transform: translate3d(-50%, 0, 0);
        text-align: center;

        @media (orientation: landscape) {
          width: 75vw;
          top: calc(12.3vh + 67px);
        }
      }

      @media (max-width: $minTablet) {
        left: auto;
        top: auto;

        transform: none;

        position: relative;
        font-size: 16px;
        line-height: 26px;
        width: 100%;

        margin-top: 21px;
      }

      &.js-animatable {
        opacity: 0;

        div {
          opacity: 0;
        }
      }
    }

    &__link {
      position: absolute;

      right: -23px;
      top: calc(50% - 7px);

      @media (min-width: $largeDesktop) {
        right: -42px;
      }

      @media (max-width: $minDesktop) {
        right: 50%;
        top: auto;
        bottom: 7vh;
        transform: translateX(50%) translateX(86px);

        @media (orientation: landscape) {
          right: 150px;
        }
      }

      @media (max-width: $minTablet) {
        bottom: -105px;
        transform: translateX(50%) translateX(65px);

        .ButtonCircles__text {
          letter-spacing: 1.2px;
        }
      }
    }
  }
</style>
