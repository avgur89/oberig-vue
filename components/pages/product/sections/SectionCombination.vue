<template lang="pug">
  section.SectionCombination(v-if="sectionExists")
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection",
      :in-viewport-offset-top="-100"
    )
    h2.SectionCombination__title {{ p.idealCombinationTitle }}
    no-ssr
      .SectionCombination__wrapper
        .SectionCombination__arrow.SectionCombination__next(@click="SlideCarousel(nextSlide)")
          BaseSvgIcon(
            icon="arrow_slider_right",
            id="nextIcon",
            width="29",
            height="9",
            :fill="false"
          )
        .SectionCombination__arrow.SectionCombination__prev(@click="SlideCarousel(prevSlide)")
          BaseSvgIcon(
            icon="arrow_slider_left",
            id="prevIcon",
            width="29",
            height="9",
            :fill="false"
          )
        Carousel.SectionCombination__slider(
          :perPageCustom="[[320, 1], [768, 2], [1200, 5]]",
          ref="SectionSliderCarouselRef",
          :navigationEnabled="false",
          :paginationEnabled="false"
        )
          Slide(
            v-for="product in m.relatedProducts",
            :key="product.id"
          )
            .SectionCombination__slide
              nuxt-link.SectionCombination__slide-item(:to="generateProductUrl(product.alias)")
                .SectionCombination__slide-image-wrapper
                  img.SectionCombination__slide-image(
                    :src="product.titleImage",
                    alt=""
                  )
                  span.SectionCombination__slide-desc {{ product.type }} {{ product.code }}
</template>

<script>
  import '../../../../assets/svg/dist/arrow_slider_right';
  import '../../../../assets/svg/dist/arrow_slider_left';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { Carousel, Slide } from 'vue-carousel';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../../modules/_helpers';

  @Component({
    components: {
      Carousel,
      Slide,
      BaseReveal
    },
    computed: mapGetters(['p', 'm'])
  })
  export default class SectionCombination extends Vue {
    /**
     * Flag to run next slider
     *
     * @type {String}
     */
    nextSlide = 'next';

    /**
     * Flag to run previous slider
     *
     * @type {String}
     */
    prevSlide = 'prev';

    /**
     * @return {Boolean}
     */
    get sectionExists() {
      const products = this.m.relatedProducts;
      return products && products.length && products.length > 0;
    }

    /**
     * Generate corresponding url for alias
     *
     * @param {String} alias
     * @return {String}
     */
    generateProductUrl(alias) {
      return generateUrl(this.$route.params.lang, `product/${alias}`);
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
      const { lines: titleLines } = new SplitText('.SectionCombination__title', {
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
        // slider arrows
        .fromTo('.SectionCombination__arrow', 1,
          { opacity: 0 },
          { opacity: 1 },
          0.5
        )
        .fromTo('.SectionCombination__title', 1,
          { opacity: 0 },
          { opacity: 1 },
          0
        )
        // photos
        .staggerFromTo('.SectionCombination__slide-item', 1,
          { y: 50, opacity: 0 },
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

  .SectionCombination {
    position: relative;

    margin-bottom: 95px;

    @media (max-width: $minTablet) {
      margin-bottom: 69px;
    }

    &__title {
      max-width: 400px;

      margin: 0 auto 40px auto;

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
        margin-bottom: 50px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__wrapper {
      position: relative;
      width: 100%;
    }

    #prevIcon,
    #nextIcon {
      color: #736d7b;
    }

    &__arrow {
      opacity: 0;
    }

    &__next {
      position: absolute;

      top: 40%;
      right: 0;

      transform: translateY(-50%);

      z-index: 1;

      cursor: pointer;

      @media (min-width: $desktop) {
        display: none;
      }

      @media (max-width: $minDesktop) {
        display: block;
      }
    }

    &__prev {
      position: absolute;

      top: 40%;
      left: 0;

      transform: translateY(-50%);

      z-index: 1;

      cursor: pointer;

      @media (min-width: $desktop) {
        display: none;
      }

      @media (max-width: $minDesktop) {
        display: block;
      }
    }

    &__slide {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      &-item {
        display: inline-block;

        box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);
        background-color: #fff;

        transition: box-shadow .7s ease;

        opacity: 0;
      }

      &-image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 208px;
        height: 208px;
      }

      &-image {
        max-width: 150px;
        max-height: 150px;
      }

      &-desc {
        display: none;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionCombination {
    .VueCarousel-slide {
      padding-bottom: 45px;

      @media (min-width: $desktop) {
        &:hover {
          .SectionCombination__slide-item {
            box-shadow: none;
          }
        }
      }
    }

    &__title {
      .line {
        @include gradient-text(false);
        opacity: 0;
      }
    }
  }
</style>
