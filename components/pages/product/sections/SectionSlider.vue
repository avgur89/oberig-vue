<template lang="pug">
  section.SectionSlider
    .SectionSlider__leftSide
      .SectionSlider__leftSide-cnt
        h3.SectionSlider__title {{ m.type }}
        .SectionSlider__article
          p.SectionSlider__article-label {{ t.code }}:
          p.SectionSlider__article-value {{ m.code }}
        ButtonRainbowGradient(
          :isStatic="true",
          :text="t.send_request",
          v-if="!changeButtonPosition",
          @click.native="addProductAndGoToForm",
          ref="SectionSliderButtonRef"
        )
    no-ssr
      .SectionSlider__wrapper
        .SectionSlider__arrow.SectionSlider__next(@click="SlideCarousel('next')")
          BaseSvgIcon(
            icon="arrow_slider_right",
            id="nextIcon",
            width="29",
            height="9",
            :fill="false"
          )
          BaseSvgIcon.AppMenu__link-icon(
            icon="socials-hover",
            width="60",
            height="60",
            :fill="false"
          )
        .SectionSlider__arrow.SectionSlider__prev(@click="SlideCarousel('prev')")
          BaseSvgIcon(
            icon="arrow_slider_left",
            id="prevIcon",
            width="29",
            height="9",
            :fill="false"
          )
          BaseSvgIcon.AppMenu__link-icon(
            icon="socials-hover",
            width="60",
            height="60",
            :fill="false"
          )
        Carousel.SectionSlider__slider(
          :perPage="1",
          ref="SectionSliderCarouselRef",
          paginationActiveColor="#5a6778",
          paginationColor="#cdcdcd",
          :navigationEnabled="false",
          :paginationSize="5"
        )
          Slide(
            v-for="(imageSrc, index) in m.imagesForSlider",
            :key="index"
          )
            .SectionSlider__slide
              img.SectionSlider__slide-image(
                :src="imageSrc",
                alt=""
              )
    .SectionSlider__rightSide
      .SectionSlider__rightSide-cnt
        .SectionSlider__collection
          p.SectionSlider__collection-label {{ t.collection }}:
          p.SectionSlider__collection-value {{ m.collection.label }}
        .SectionSlider__materials
          p.SectionSlider__materials-label {{ t.materials }}:
          p.SectionSlider__materials-value(
            v-for="(metal, index) in m.metals",
            :key="index"
          ) {{ metal.label }} - {{ metal.amount }} {{ t.g }}
          p.SectionSlider__materials-value(
            v-for="(stone, index) in m.stones",
            :key="index"
          ) {{ stone.label }} - {{ stone.amount }} {{ t.ct }}
        ButtonRainbowGradient(
          :isStatic="true",
          :text="t.send_request",
          v-if="changeButtonPosition",
          @click.native="addProductAndGoToForm",
          ref="SectionSliderButtonRef"
        )
</template>

<script>
  import '../../../../assets/svg/dist/arrow_slider_right';
  import '../../../../assets/svg/dist/arrow_slider_left';
  import '../../../../assets/svg/dist/socials-hover';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import {
    PRODUCT_PREVIEW_CLOSED,
    SET_LOCK
  } from '../../../../modules/_events';
  import { generateUrl, Resp } from '../../../../modules/_helpers';
  import { Carousel, Slide } from 'vue-carousel';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  @Component({
    components: {
      Carousel,
      Slide,
      ButtonRainbowGradient,
      BaseSvgIcon
    },
    computed: mapGetters(['t', 'm']),
    methods: mapActions(['addToCart'])
  })
  export default class SectionSlider extends Vue {
    /**
     * Flag to toggle button's position in DOM
     *
     * @type {Boolean}
     */
    changeButtonPosition = false;

    mounted() {
      this.changeButtonPosition = !Resp.isDesk;

      bus.$on(PRODUCT_PREVIEW_CLOSED, this.revealSection);
    }

    destroyed() {
      bus.$off(PRODUCT_PREVIEW_CLOSED, this.revealSection);
    }

    /**
     * Run slider carousel with custom arrows
     */
    SlideCarousel(value) {
      const carousel = this.$refs.SectionSliderCarouselRef;
      const currentPage = carousel.currentPage;
      const pageCount = carousel.pageCount;

      if (value === 'prev') {
        currentPage !== 0 ? carousel.goToPage(currentPage - 1) : carousel.goToPage(pageCount - 1);
      } else {
        currentPage < pageCount - 1 ? carousel.goToPage(currentPage + 1) : carousel.goToPage(0);
      }
    }

    /**
     * Reveal slider section
     */
    revealSection() {
      const rightSideLines = this.$el.querySelectorAll('.SectionSlider__rightSide p');
      const leftSideLines = this.$el.querySelectorAll('.SectionSlider__leftSide p');
      const onRevealComplete = () => bus.$emit(SET_LOCK, false);

      new TimelineMax({ onComplete: onRevealComplete })
        .set(this.$el, { opacity: 1 })
        // slider
        .fromTo(this.$refs.SectionSliderCarouselRef.$el, 1.3, { opacity: 0 }, {
          opacity: 1,
          ease: Power1.easeOut
        }, 0)
        // right side
        .staggerFromTo(rightSideLines, 0.5,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.1,
          0.4
        )
        // left side
        .staggerFromTo(['.SectionSlider__title', ...leftSideLines], 0.5,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.1,
          0.4
        )
        // slider arrows
        .fromTo('.SectionSlider__arrow', 1,
          { opacity: 0 },
          { opacity: 1 },
          0.5
        )
        // button
        .fromTo(this.$refs.SectionSliderButtonRef.$el, 1,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeOut },
          0.9
        );
    }

    /**
     * Add product to cart and go to formalization page
     */
    addProductAndGoToForm() {
      const formUrl = generateUrl(this.$route.params.lang, 'formalization');
      const {
        id,
        code,
        alias,
        type,
        titleImageSrc
      } = this.m;

      this.addToCart([{
        id,
        code,
        alias,
        type,
        titleImageSrc
      }]);

      this.$router.push(formUrl);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSlider {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    opacity: 0;

    height: calc(100vh - 80px);

    @media (max-width: $largeDesktop) and (min-width: $tablet){
      padding-top: 91px;
    }

    @media (max-width: $minDesktop) {
      flex-direction: column;
      height: auto;

      margin-bottom: 130px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 89px;
      margin-top: 89px;

      height: auto;
    }

    &__wrapper {
      position: relative;

      @media (max-width: $minDesktop) {
        margin-bottom: 39px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 19px;
      }
    }

    &__leftSide {
      flex: 0 1 33%;

      @media (min-width: $desktop) {
        margin-top: -58px;
      }

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;
        width: 100%;

        margin-bottom: 39px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 19px;
      }

      &-cnt {
        text-align: center;

        @media (min-width: $desktop) {
          float: right;
          margin-right: 80px;
        }

        @media (max-width: $minDesktop) {
          display: block;
          margin-left: 0;
        }
      }
    }

    &__rightSide {
      flex: 0 1 33%;

      @media (min-width: $desktop) {
        margin-top: -111px;
      }

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;
        width: 100%;
      }

      &-cnt {
        margin-left: 22px;


        @media (min-width: $desktop) {
          float: left;
        }

        @media (max-width: $minDesktop) {
          text-align: center;
          margin-left: 0;
        }
      }
    }

    &__arrow {
      opacity: 0;
      color: #736d7b;
    }

    #prevIcon,
    #nextIcon {
      color: #736d7b;
    }

    &__next {
      position: absolute;
      bottom: 25px;
      right: 0;

      z-index: 1;

      cursor: pointer;
    }

    &__prev {
      position: absolute;
      bottom: 25px;
      left: 0;

      z-index: 1;

      cursor: pointer;
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 27px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;

      color: #4d4d4d;

      @media (max-width: $minTablet) {
        margin-bottom: 16px;

        font-size: 25px;
        line-height: 40px;
        letter-spacing: 1.25px;
      }
    }

    &__article {
      margin-bottom: 33px;

      @media (max-width: $minDesktop) {
        margin-bottom: 0;
      }

      &-label {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      &-value {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-transform: uppercase;

        color: #444344;
      }
    }

    &__collection {
      margin-bottom: 24px;

      &-label {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      &-value {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;
      }
    }

    &__materials {
      &-label {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      &-value {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;
      }
    }

    &__wrapper {
      @media (max-width: $minTablet) {
        width: 100%;
      }
    }

    &__slider {
      width: 335px;

      @media (max-width: $minTablet) {
        width: 181px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &__slide {
      position: relative;
      width: 335px;
      height: 335px;

      @media (max-width: $minTablet) {
        width: 181px;
        height: 181px;
      }

      &-image {
        position: absolute;

        left: 50%;
        top: 50%;

        max-width: 335px;
        max-height: 335px;

        transform: translate3d(-50%, -50%, 0);

        @media (max-width: $minTablet) {
          max-width: 181px;
          max-height: 181px;
        }
      }
    }
  }

  .VueCarousel-wrapper {
    margin-bottom: 13px;

    @media (max-width: $minTablet) {
      margin-bottom: -17px;
    }
  }

  .ButtonRainbowGradient {
    @media (max-width: $minDesktop) {
      margin-top: 54px;
    }

    @media (max-width: $minTablet) {
      margin-top: 36px;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSlider {
    .AppMenu__link-icon {
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translate3d(-50%, -50%, 0);

      color: #cdcdcd;
      opacity: 0.3;

      z-index: 1;

      @media (max-width: $minDesktop) {
        display: none;
      }

      &:hover path {
        opacity: 1;
        transform: scale(1);

        &:nth-child(1) {
          transition: all .5s ease;
        }
        &:nth-child(2) {
          transition: all .5s ease 0.15s;
        }
        &:nth-child(3) {
          transition: all .5s ease 0.3s;
        }
      }

      path {
        opacity: 0;
        transform: scale(0.5);
        transform-origin: center center;

        transition: opacity .6s ease, transform 0s ease .6s;
      }
    }
  }
</style>
