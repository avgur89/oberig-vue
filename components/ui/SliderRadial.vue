<template lang="pug">
  .SliderRadial(:class="cssClassesObject")
    .SliderRadial__texts
      .SliderRadial__text(
        v-for="(item, index) in items",
        :key="index",
        :data-text-id="index",
        :class="{ [active]: index === currentSlideId }"
      ) {{ item.label }}
    .SliderRadial__images
      img.SliderRadial__image(
        v-for="(item, index) in items",
        :key="index",
        :data-image-id="index",
        :id="index === 2 ? 'AnimationSectionFinalImage' : ''",
        :src="index === 2 ? animationScreenFinalImageSrc : item.bigImage",
        :alt="item.label"
      )
    .SliderRadial__controls
      .SliderRadial__control(
        :class="{ [active]: index === currentSlideId }",
        v-for="(item, index) in items",
        :key="index",
        @click="changeSlide(index)"
      )
        img(:src="item.icon", :alt="item.label")
    .SliderRadial__controls--mobile
      .SliderRadial__control--mobile(@click="prevSlide")
        BaseSvgIcon(
          icon="arrow_slider_left",
          width="40"
        )
      .SliderRadial__control--mobile(@click="nextSlide")
        BaseSvgIcon(
          icon="arrow_slider_right",
          width="40"
        )
</template>

<script>
  import '../../assets/svg/dist/arrow_slider_left';
  import '../../assets/svg/dist/arrow_slider_right';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import animatable from '../../mixins/animatable';
  import { css, Resp } from '../../modules/_helpers';
  import BaseSvgIcon from './BaseSvgIcon.vue';

  @Component({
    mixins: [animatable],
    components: { BaseSvgIcon },
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    computed: mapGetters(['webpIsSupported'])
  })
  export default class SliderRadial extends Vue {
    /**
     * Active slide index.
     *
     * @type {Number}
     */
    currentSlideId = 2;

    /**
     * Css-class, slide active state indicator.
     *
     * @type {String}
     */
    active = css.active;

    /**
     * Animation state flag.
     *
     * @type {Boolean}
     */
    isAnimating = false;

    /**
     * @return {String}
     */
    get animationScreenFinalImageSrc() {
      return `/img/animation-screen-final.${this.webpIsSupported ? 'webp' : 'png'}`;
    }

    /**
     * Animate (reveal) slider elements.
     */
    reveal() {
      const { $el } = this;
      const sliderControls = $el.querySelectorAll('.SliderRadial__control');
      const sliderControlsMob = $el.querySelectorAll('.SliderRadial__control--mobile');
      const sliderTexts = $el.querySelector('.SliderRadial__texts');
      const animation = new TimelineMax();

      // texts
      animation.to(sliderTexts, 0.45, {
        ease: Power1.easeOut,
        css: { opacity: 1, y: 0 }
      }, 0.5);

      // controls
      if (Resp.isDesk) {
        animation.staggerFromTo(sliderControls, 0.5, { x: -40, y: -40 }, {
          ease: Power1.easeOut,
          x: 0,
          y: 0,
          cycle: { scale: i => i === this.currentSlideId ? 1.1154 : 1 }
        }, 0.2, 0.41);
      } else {
        animation.staggerFromTo(sliderControlsMob, 0.9, {
          cycle: { x: [-100, 100] }
        }, {
          ease: Power1.easeOut,
          opacity: 1,
          cycle: { x: Resp.isTablet ? [-50, 50] : [-38, 38] }
        }, 0, 0.41);
      }

      // remove animatable class, clear controls style
      animation.addCallback(() => {
        this.hidden = false;
        sliderControls.forEach && sliderControls.forEach((el) => { el.style.transform = ''; });
      }, 1.7);
    }

    /**
     * Go to the next slide
     */
    nextSlide() {
      const nextSlide = this.currentSlideId === 4 ? 0 : this.currentSlideId + 1;
      this.changeSlide(nextSlide);
    }

    /**
     * Go to the previous slide
     */
    prevSlide() {
      const nextSlide = this.currentSlideId === 0 ? 4 : this.currentSlideId - 1;
      this.changeSlide(nextSlide);
    }

    /**
     * Change active slide.
     *
     * @param {Number} nextSlideIndex - next active slide id
     */
    changeSlide(nextSlideIndex) {
      const { isAnimating, currentSlideId } = this;

      // clicked on active slide or slider is currently animating
      if ((currentSlideId === nextSlideIndex) || isAnimating) return;

      // set animation flag
      this.isAnimating = true;

      // run animation
      this.animateSlides(nextSlideIndex);

      // set active elements
      this.currentSlideId = nextSlideIndex;
    }

    /**
     * Animate slides.
     *
     * @param {Number} nextSlideIndex - next active slide id
     */
    animateSlides(nextSlideIndex) {
      const { $el, currentSlideId } = this;
      const animation = new TimelineMax();

      const sliderImages = [...$el.querySelectorAll('.SliderRadial__images')];
      const prevImage =
        $el.querySelector(`.SliderRadial__image[data-image-id='${currentSlideId}']`);
      const nextImage =
        $el.querySelector(`.SliderRadial__image[data-image-id='${nextSlideIndex}']`);
      const sliderRatio = Resp.isMobile ? (74 / 100) * window.innerWidth : 457;
      const imageRatio  = Resp.isMobile ? (sliderRatio / 2) - 20 : 220;

      animation
        // scale image container
        .to(sliderImages, 0.4, {
          ease: Power1.easeOut,
          css: { width: 40, height: 40 }
        }, 0)
        .to(sliderImages, 0.4, {
          ease: Power1.easeOut,
          css: { width: sliderRatio, height: sliderRatio }
        }, 0.4)
        // translate image
        .to(prevImage, 0.4, {
          ease: Power1.easeOut,
          y: -imageRatio,
          opacity: 0
        }, 0)
        .fromTo(nextImage, 0.4, {
          y: -imageRatio,
          opacity: 0
        }, {
          ease: Power1.easeOut,
          y: 0,
          opacity: 1,
          onComplete: () => { this.isAnimating = false; }
        }, 0.4);
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .SliderRadial {
    position: relative;

    width: 457px;
    height: 457px;

    margin-top: 75px;

    @media (max-width: $minDesktop) {
      margin-top: 187px;
    }

    @media (max-width: $minTablet) {
      margin: 52px auto 0;

      width: 74vw;
      height: 74vw;
    }

    &.js-animatable {
      .SliderRadial {
        @media (max-width: $minTablet) {
          opacity: 0;
        }
        &__control {
          transform: scale(0);

          &--mobile {
            opacity: 0;
          }
        }
        &__texts {
          opacity: 0;
          transform: translate3d(0, -36px, 0);
        }
        &__images {
          border: 1px solid rgba(255, 255, 255, 0);
          box-shadow: none;
          overflow: visible;
        }
        &__image {
          &:nth-child(3) {
            opacity: 0;

            @media (min-width: $tablet) {
              top: -266px;
              width: 555px;
              height: 735px;

              @media (max-width: $minDesktop) {
                top: -325px;
              }
            }
          }
        }
      }
    }

    &__texts {
      width: 100%;
      height: 100%;
    }

    &__text {
      position: absolute;
      width: 100%;
      top: 376px;

      color: #4d4d4d;
      font-family: $MinionProRegular;
      font-size: 18px;
      font-weight: 400;
      line-height: 23px;
      text-transform: uppercase;
      letter-spacing: 2.8px;
      text-align: center;

      opacity: 0;
      transform: translate3d(0, -36px, 0);

      transition: opacity .4s ease .02s, transform .5s ease .02s;

      z-index: 2;

      &.js-active {
        transform: translate3d(0, 0, 0);
        opacity: 1;

        transition: opacity .35s ease .5s, transform .4s ease .5s;
      }

      @media (max-width: $minTablet) {
        top: auto;
        bottom: 38px;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 1.9px;
      }
    }

    &__images {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;

      width: 457px;
      height: 457px;

      top: 50%;
      left: 50%;

      transform: translate3d(-50%, -50%, 0);

      border-radius: 50%;

      box-shadow: inset 0 16px 35px rgba(93, 102, 114, 0.15);
      border: 1px solid rgba(255, 255, 255, 0);

      overflow: hidden;

      @media (max-width: $minTablet) {
        width: 74vw;
        height: 74vw;
      }
    }

    &__image {
      position: absolute;

      top: 5px;
      left: 50%;

      opacity: 0;
      transform: translate3d(-50%, 0, 0);

      backface-visibility: hidden;

      max-width: 268px;
      max-height: 355px;

      &:nth-child(3) {
        opacity: 1;
      }

      @media (min-width: $tablet) {
        &:nth-child(3) {
          width: 268px;
          height: 355px;

          max-width: none;
          max-height: none;
        }
      }

      @media (max-width: $minTablet) {
        max-height: 48vw;
      }
    }

    &__controls {
      position: absolute;
      top: 0;
      right: 0;

      @media (max-width: $minDesktop) {
        right: 35px;
      }

      @media (max-width: $minDesktop) {
        display: none;
      }

      &--mobile {
        display: none;

        @media (max-width: $minDesktop) {
          display: flex;
          justify-content: space-between;

          position: absolute;

          width: 100%;

          top: 50%;
          transform: translate3d(0, -50%, 0);
        }
      }
    }

    &__control {
      position: absolute;

      border-radius: 50%;

      width: 78px;
      height: 78px;
      box-shadow: inset 0 -16px 35px rgba(93, 102, 114, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.4);
      background-color: rgba(255, 255, 255, 0);

      cursor: pointer;

      img {
        @media (min-width: $desktop) {
          max-height: 44%;
        }
      }

      .SliderRadial:not(.js-animatable) & {
        transition: transform .4s ease;

        &.js-active {
          transform: scale(1.1154) !important;
        }

        @media (min-width: $desktop) {
          &:hover {
            transform: scale(1.1154) !important;
          }
        }
      }

      &:nth-child(1) {
        top: 3px;
        left: -20px;
      }

      &:nth-child(2) {
        top: 79px;
        left: 46px;
      }

      &:nth-child(3) {
        top: 188px;
        left: 78px;
      }

      &:nth-child(4) {
        top: 299px;
        left: 48px;
      }

      &:nth-child(5) {
        top: 378px;
        left: -20px;
      }

      img {
        position: absolute;

        left: 50%;
        top: 50%;

        transform: translate3d(-50%, -50%, 0);

        cursor: pointer;
      }

      &--mobile {
        display: none;

        .st0{fill:#231F20;}

        @media (max-width: $minDesktop) {
          display: inline-block;
          font-size: 0;

          &:first-child {
            transform: translate3d(-50px, 0, 0);
          }
          &:last-child {
            transform: translate3d(50px, 0, 0);
          }
        }

        @media (max-width: $minTablet) {
          &:first-child {
            transform: translate3d(-38px, 0, 0);
          }
          &:last-child {
            transform: translate3d(38px, 0, 0);
          }
          width: 31px;

          svg {
            width: 31px !important;
          }
        }
      }
    }
  }
</style>
