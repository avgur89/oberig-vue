<template lang="pug">
  section.SectionSlider
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection",
      :in-viewport-offset-top="-100"
    )
    h2.SectionSlider__title {{ p.categoriesTitle }}
    no-ssr
      .SectionSlider__wrapper
        .SectionSlider__arrow.SectionSlider__next(@click="SlideCarousel('next')", v-if="hasArrows")
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
        .SectionSlider__arrow.SectionSlider__prev(@click="SlideCarousel('prev')", v-if="hasArrows")
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
          ref="SectionSliderCarouselRef",
          :perPageCustom="[[320, 1], [768, 3], [1200, 7]]",
          :navigationEnabled="false",
          :paginationEnabled="false"
        )
          Slide(
            v-for="collection in pageData.categories",
            :key="collection.id"
          )
            .SectionSlider__slide
              nuxt-link.SectionSlider__slide-item(:to="generateProductUrl(collection.alias)")
                .SectionSlider__slide-image-wrapper
                  img.SectionSlider__slide-image(
                    :src="collection.icon",
                    alt=""
                  )
                p.SectionSlider__slide-desc {{ collection.label }}
</template>

<script>
  import '../../../../assets/svg/dist/arrow_slider_right';
  import '../../../../assets/svg/dist/arrow_slider_left';
  import '../../../../assets/svg/dist/socials-hover';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { Carousel, Slide } from 'vue-carousel';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import { mapGetters } from 'vuex';
  import { generateUrl, Resp } from '../../../../modules/_helpers';

  @Component({
    components: {
      Carousel,
      Slide,
      BaseReveal,
      BaseSvgIcon
    },
    computed: mapGetters(['pageData', 'p', 'menu'])
  })
  export default class SectionSlider extends Vue {
    /**
     * Desktop indicator.
     *
     * @type {Boolean}
     */
    isDesktop = false;

    /**
     * @return {Boolean}
     */
    get hasArrows() {
      return this.isDesktop ? this.pageData.categories.length > 7 : true;
    }

    beforeMount() {
      this.isDesktop = Resp.isDesk;
    }

    /**
     * Generate corresponding url for alias
     *
     * @param {String} alias
     * @return {String}
     */
    generateProductUrl(alias) {
      return generateUrl(this.$route.params.lang, `catalog?category=${alias}`);
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
     * Reveal combination section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionSlider__title', {
        type: 'lines',
        linesClass: 'line'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title lines
        .staggerFromTo(titleLines, 0.8,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: Power1.easeOut },
          0.3,
          0
        )
        .fromTo('.SectionSlider__title', 1,
          { opacity: 0 },
          { opacity: 1 },
          0
        )
        // slider arrows
        .fromTo('.SectionSlider__arrow', 1,
          { opacity: 0 },
          { opacity: 1 },
          0.5
        )
        // photos
        .staggerFromTo('.SectionSlider__slide-item', 1,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: Power1.easeOut },
          0.2,
          0.5
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSlider {
    position: relative;

    margin-bottom: 95px;

    opacity: 0;

    @media (max-width: $minTablet) {
      margin-bottom: 69px;
    }

    &__title {
      max-width: 290px;

      margin: 0 auto 42px auto;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;
      text-align: center;

      opacity: 0;

      color: #736d7b;

      @media (max-width: $minTablet) {
        margin-bottom: 46px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__wrapper {
      position: relative;
    }

    #prevIcon,
    #nextIcon {
      color: #736d7b;
    }

    &__arrow {
      position: absolute;
      z-index: 1;

      top: 35%;
      transform: translateY(-50%);

      cursor: pointer;
      opacity: 0;
    }

    &__next {
      right: 0;
    }

    &__prev {
      left: 0;
    }

    &__slider {
      margin: 0 40px;
    }

    &__slide {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      &-item {
        display: inline-block;

        text-decoration: none;

        opacity: 0;
      }

      &-image-wrapper {
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 100px;

        border-radius: 100%;

        margin: 0 auto;
        margin-bottom: 28px;

        box-shadow: inset 0 -16px 35px rgba(93, 102, 114, 0.18);
        border: 1px solid #ffffff;

        &:after {
          content: '';
          display: block;

          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 100%;
          border-radius: 100%;

          box-shadow: inset 0 -16px 35px rgba(93, 102, 114, 0.3);
          opacity: 0;

          transition: opacity 0.4s ease;
        }
      }

      &-image {
        max-width: 45px;
        max-height: 45px;
      }

      &-desc {
        @include gradient-text(false);

        font-family: $Calibri;
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;
        text-align: center;

        color: #444344;

        @media (min-width: $largeDesktop) {
          max-width: 165px;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSlider {
    &__title {
      div {
        @include gradient-text(false);
        opacity: 0;
      }
    }

    &__slide {
      &-item {
        @media (min-width: $desktop) {
          &:hover .SectionSlider__slide-image-wrapper {
            &:after {
              opacity: 1;
            }
          }
        }
      }
    }

    .AppMenu__link-icon {
      position: absolute;
      left: 50%;
      top: 50%;
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

        transition: opacity .4s ease, transform 0s ease .4s;
      }
    }
  }
</style>
