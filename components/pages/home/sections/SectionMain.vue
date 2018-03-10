<template lang="pug">
  section.SectionMain#SectionMain(:class="isIosChrome ? $style.fullScreen : ''")
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__ornament
      img.ornament--main.ornament-1.ornament-1-1(src="~static/img/ornament/ornament-1-1.png", alt="")
      img.ornament--sub.ornament-1.ornament-1-1(src="~static/img/ornament/ornament-1-1-shadow.png", alt="")
      img.ornament--main.ornament-2.ornament-1-2(src="~static/img/ornament/ornament-1-2.png", alt="")
      img.ornament--sub.ornament-2.ornament-1-2(src="~static/img/ornament/ornament-1-2-shadow.png", alt="")
      img.ornament--main.ornament-3.ornament-1-3(src="~static/img/ornament/ornament-1-3.png", alt="")
      img.ornament--sub.ornament-3.ornament-1-3(src="~static/img/ornament/ornament-1-3-shadow.png", alt="")
      img.ornament--main.ornament-4.ornament-1-4(src="~static/img/ornament/ornament-1-4.png", alt="")
      img.ornament--sub.ornament-4.ornament-1-4(src="~static/img/ornament/ornament-1-4-shadow.png", alt="")
      img.ornament--main.ornament-5.ornament-1-5(src="~static/img/ornament/ornament-1-5.png", alt="")
      img.ornament--sub.ornament-5.ornament-1-5(src="~static/img/ornament/ornament-1-5-shadow.png", alt="")
      img.ornament--main.ornament-6.ornament-1-6(src="~static/img/ornament/ornament-1-6.png", alt="")
      img.ornament--sub.ornament-6.ornament-1-6(src="~static/img/ornament/ornament-1-6-shadow.png", alt="")
      img.ornament--main.ornament-7.ornament-1-7(src="~static/img/ornament/ornament-1-7.png", alt="")
      img.ornament--sub.ornament-7.ornament-1-7(src="~static/img/ornament/ornament-1-7-shadow.png", alt="")
      img.ornament--main.ornament-8.ornament-1-8(src="~static/img/ornament/ornament-1-8.png", alt="")
      img.ornament--sub.ornament-8.ornament-1-8(src="~static/img/ornament/ornament-1-8-shadow.png", alt="")
      img.ornament--main.ornament-1.ornament-2-1(src="~static/img/ornament/ornament-2-1.png", alt="")
      img.ornament--sub.ornament-1.ornament-2-1(src="~static/img/ornament/ornament-2-1-shadow.png", alt="")
      img.ornament--main.ornament-2.ornament-2-2(src="~static/img/ornament/ornament-2-2.png", alt="")
      img.ornament--sub.ornament-2.ornament-2-2(src="~static/img/ornament/ornament-2-2-shadow.png", alt="")
      img.ornament--main.ornament-3.ornament-2-3(src="~static/img/ornament/ornament-2-3.png", alt="")
      img.ornament--sub.ornament-3.ornament-2-3(src="~static/img/ornament/ornament-2-3-shadow.png", alt="")
      img.ornament--main.ornament-4.ornament-2-4(src="~static/img/ornament/ornament-2-4.png", alt="")
      img.ornament--sub.ornament-4.ornament-2-4(src="~static/img/ornament/ornament-2-4-shadow.png", alt="")
      img.ornament--main.ornament-5.ornament-2-5(src="~static/img/ornament/ornament-2-5.png", alt="")
      img.ornament--sub.ornament-5.ornament-2-5(src="~static/img/ornament/ornament-2-5-shadow.png", alt="")
      img.ornament--main.ornament-6.ornament-2-6(src="~static/img/ornament/ornament-2-6.png", alt="")
      img.ornament--sub.ornament-6.ornament-2-6(src="~static/img/ornament/ornament-2-6-shadow.png", alt="")
      img.ornament--main.ornament-7.ornament-2-7(src="~static/img/ornament/ornament-2-7.png", alt="")
      img.ornament--sub.ornament-7.ornament-2-7(src="~static/img/ornament/ornament-2-7-shadow.png", alt="")
      img.ornament--main.ornament-8.ornament-2-8(src="~static/img/ornament/ornament-2-8.png", alt="")
      img.ornament--sub.ornament-8.ornament-2-8(src="~static/img/ornament/ornament-2-8-shadow.png", alt="")
    .SectionMain__animation
      .SectionMain__animation-sequence(ref="SectionMainAnimationSequenceRef")
      img.SectionMain__animation-shadow(:src="`/img/ring_fixed.${webp_png}`", alt="")
    VideoBlock.SectionMain__video(
      ref="SectionMainVideoRef",
      :videoSrc="p.videoFileId",
      :blockText="p.labelPowerInYou"
    )
    IconScrolldown.SectionMain__scrolldown(ref="SectionMainScrolldownRef")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { forEach, throttle } from 'lodash';
  import imagesLoaded from 'imagesloaded';
  import webpExtension from '../../../../mixins/webpExtension';
  import AnchorScrollController from '../../../../modules/AnchorScrollController';
  import bus from '../../../../plugins/event-bus';
  import {
    ANIMATION_FINISHED,
    PRELOADER_FINISHED
  } from '../../../../modules/_events';
  import { Resp, crawlersRegExp } from '../../../../modules/_helpers';
  import Ring from '../../../../modules/Ring';
  import IconScrolldown from '../../../ui/IconScrolldown.vue';
  import VideoBlock from '../../../ui/VideoBlock.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  let ornamentsSequence;
  let photoSequence;

  @Component({
    components: { IconScrolldown, VideoBlock, BaseReveal },
    mixins: [webpExtension],
    computed: mapGetters(['p', 'preloaderIsFinished', 'animationIsFinished'])
  })
  export default class SectionMain extends Vue {
    /**
     * Detect safari
     *
     * @type {Boolean}
     */
    isIosChrome = false;

    mounted() {
      this.isIosChrome = crawlersRegExp.test(navigator.userAgent)
        || (Resp.isMobile && (Resp.isIosChrome || !Resp.isIos));

      // set main screen as anchor for scrolling
      this.setAnchorMainScreen();

      // Create sequence
      if (Resp.isDesk) photoSequence = new Ring(this.$refs.SectionMainAnimationSequenceRef);

      // turn on/off sequences
      window.addEventListener('scroll', this.updateListeners);

      bus.$on(PRELOADER_FINISHED, () => TweenMax.set(window, { scrollTo: { y: 0 } }));
    }

    destroyed() {
      // remove scroll controller
      this.animationIsFinished
        ? AnchorScrollController.disable()
        : bus.$off(ANIMATION_FINISHED, AnchorScrollController.enable);

      // remove sequence
      photoSequence && photoSequence.destroy();

      // remove sequence listeners
      window.removeEventListener('scroll', this.updateListeners);
    }

    /**
     * Lock main screen as anchor for scrolling
     */
    setAnchorMainScreen() {
      if (!Resp.isTouch) {
        this.animationIsFinished
          ? AnchorScrollController.enable(true)
          : bus.$on(ANIMATION_FINISHED, AnchorScrollController.enable);
      }
    }

    /**
     * Turn off/on sequences
     *
     * @type {Function}
     */
    updateListeners = throttle(() => {
      if (!photoSequence || !ornamentsSequence) return;

      const sequences = [photoSequence, ornamentsSequence];
      const isInViewport = Resp.scrollTop < window.innerHeight;

      forEach(sequences, (sequence) => {
        const paused = sequence.paused();
        if (isInViewport) {
          if (paused) sequence.play();
        } else if (!paused) {
          sequence.pause();
        }
      });
    }, 150);

    /**
     * Run main screen reveal animation, photo sequence ('photoSequence' animation timeline).
     *
     * @async
     */
    async revealSection() {
      if (!this.$isServer) {
        await new Promise(resolve => imagesLoaded(this.$el, resolve));
      }

      // photo reveal
      this.revealMainPhoto();

      // ornaments shadow animation
      this.registerOrnamentsSequence();

      // ornaments reveal
      this.revealOrnaments();

      // scrolldown button reveal, start infinite icon animation after
      this.revealAndRunScrolldownAnimation();

      // video reveal
      this.$refs.SectionMainVideoRef.reveal();
    }

    /**
     * Show main photo
     */
    revealMainPhoto() {
      TweenMax.to('.SectionMain__animation', 1, {
        scale: 1,
        opacity: 1,
        force3D: true,
        rotation: 0.01
      });
      TweenMax.to('.SectionMain__animation-shadow', 1, {
        opacity: 1
      });
    }

    /**
     * Show ornaments and run shadow's sequence
     */
    revealOrnaments() {
      const ornamentMainAnimationWaves = [
        '.ornament-1.ornament--main, .ornament-2.ornament--main, .ornament-3.ornament--main',
        '.ornament-5.ornament--main',
        '.ornament-6.ornament--main, .ornament-7.ornament--main, .ornament-8.ornament--main',
        '.ornament-4.ornament--main'
      ];
      const ornamentSubAnimationWaves = [
        '.ornament-1.ornament--sub, .ornament-2.ornament--sub, .ornament-3.ornament--sub',
        '.ornament-5.ornament--sub',
        '.ornament-6.ornament--sub, .ornament-7.ornament--sub, .ornament-8.ornament--sub',
        '.ornament-4.ornament--sub'
      ];
      const ornamentsDefaults = {
        ease: Power1.easeOut,
        delay: 0.1,
        force3D: true,
        rotation: 0.01,
        transform: 'none'
      };

      TweenMax.staggerTo(ornamentMainAnimationWaves, 0.6, {
        ...ornamentsDefaults,
        opacity: 0.4
      }, 0.04);
      TweenMax.staggerTo(ornamentSubAnimationWaves, 0.6, {
        ...ornamentsDefaults,
        opacity: 0.2
      }, 0.04, () => setTimeout(() => ornamentsSequence.play(), 500));
    }

    /**
     * Create 'ornamentsSequence' animation time line.
     */
    registerOrnamentsSequence() {
      const sequenceWaves = [
        '.ornament-1.ornament--sub, .ornament-1.ornament--main',
        '.ornament-2.ornament--sub, .ornament-2.ornament--main',
        '.ornament-3.ornament--sub, .ornament-4.ornament--sub, .ornament-5.ornament--sub, .ornament-6.ornament--sub',
        '.ornament-7.ornament--sub',
        '.ornament-8.ornament--sub'
      ];

      ornamentsSequence =
        new TimelineMax({ paused: true, yoyo: true, repeat: -1, repeatDelay: 1 })
          .staggerTo(sequenceWaves, 1, {
            ease: Power0.easeNone,
            cycle: {
              alpha: [0.6, 0.6, 0.75, 0.75, 0.72]
            }
          }, 0.4)
          .staggerTo(sequenceWaves, 1, {
            ease: Power0.easeNone,
            cycle: {
              alpha: [0.35, 0.35, 0.2, 0.2, 0.2]
            }
          }, 0.5, 2.3);
    }

    /**
     * Show scrolldow icon and start looped animation
     */
    revealAndRunScrolldownAnimation() {
      const { SectionMainScrolldownRef: scrolldown } = this.$refs;
      const scrolldownLines = scrolldown.lines;

      TweenMax.staggerTo(scrolldownLines, 0.65, {
        delay: 0.5,
        ease: Power1.easeOut,
        force3D: true,
        rotation: 0.01,
        css: { y: 0 }
      }, 0.15, () => setTimeout(scrolldown.startAnimation, 1000));
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  .SectionMain {
    position: relative;

    width: 100%;

    @media (min-width: $desktop) {
      height: 100vh;
    }

    @media (max-width: $minDesktop) {
      height: 100vh;
    }

    @media (max-width: $minTablet) {
      position: relative;
      z-index: 4;
      height: 90vh;
    }

    &__animation {
      display: inline-block;
      position: absolute;

      left: 50%;
      top: 50%;
      margin-top: -145px;
      margin-left: -180px;

      width: 360px;
      height: 360px;

      transform: scale(0.85);
      opacity: 0;

      z-index: 3;

      @media (max-width: $minTablet) {
        width: 250px;
        height: 250px;

        margin-top: -121px;
        margin-left: -125px;
      }

      &-sequence {
        width: 100%;
        height: 100%;
      }

      &-shadow {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        opacity: 0;

        z-index: -1;

        @media (max-width: $minTablet) {
          width: 250px;
          height: 250px;
        }
      }
    }

    &__ornament {
      position: absolute;

      height: 490px;
      width: 100%;

      top: 50%;
      margin-top: -266px;

      @media (max-width: $minTablet) {
        left: -84vw;
        margin-top: -275px;
      }
    }

    &__scrolldown {
      position: absolute;

      right: -15px;
      bottom: 30px;

      span {
        transform: translateY(52px);
      }

      @media (max-width: $minTablet) {
        right: -14px;
        bottom: 34px;
      }
    }

    &__video {
      position: absolute;

      left: 0;
      bottom: 40px;

      z-index: 6;

      @media (max-width: $minDesktop) {
        bottom: 30px;
      }

      @media (max-width: $minTablet) {
        bottom: 33px;
      }
    }
  }
</style>

<style lang="scss">
  .SectionMain {
    &__ornament {
      .ornament {
        &-1 {
          &-1 {
            top: 269px;
            right: calc(50% + -6px);

            transform: translate3d(20px, 10px, 0);
          }

          &-2 {
            top: 215px;
            right: calc(50% + 74px);

            transform: translate3d(21px, 11px, 0);
          }

          &-3 {
            top: 164px;
            right: calc(50% + 203px);

            transform: translate3d(20px, 11.5px, 0);
          }

          &-4 {
            top: 50px;
            right: calc(50% + 134px);

            transform: translate3d(15px, -16px, 0);
          }
          &-5 {
            top: 260px;
            right: calc(50% + 382px);

            transform: translate3d(-20px, 20px, 0);
          }

          &-6 {
            top: 162px;
            right: calc(50% + 368px);

            transform: translate3d(-27px, -11px, 0);
          }

          &-7 {
            top: 53px;
            right: calc(50% + 399px);

            transform: translate3d(-25px, -12.5px, 0);
          }

          &-8 {
            top: 2px;
            right: calc(50% + 528px);

            transform: translate3d(-25px, -12.5px, 0);
          }
        }

        &-2 {
          &-1 {
            top: 269px;
            left: calc(50% + -6px);

            transform: translate3d(-20px, 10px, 0);
          }

          &-2 {
            top: 215px;
            left: calc(50% + 74px);

            transform: translate3d(-21px, 11px, 0);
          }

          &-3 {
            top: 164px;
            left: calc(50% + 203px);

            transform: translate3d(-20px, 11.5px, 0);
          }

          &-4 {
            top: 50px;
            left: calc(50% + 134px);

            transform: translate3d(-15px, -15px, 0);
          }
          &-5 {
            top: 260px;
            left: calc(50% + 382px);

            transform: translate3d(20px, 20px, 0);
          }

          &-6 {
            top: 162px;
            left: calc(50% + 368px);

            transform: translate3d(27px, -11px, 0);
          }

          &-7 {
            top: 53px;
            left: calc(50% + 399px);

            transform: translate3d(25px, -12.5px, 0);
          }

          &-8 {
            top: 2px;
            left: calc(50% + 528px);

            transform: translate3d(25px, -12.5px, 0);
          }
        }
      }

      img {
        position: absolute;

        opacity: 0;
      }
    }

    &__animation {
      &-sequence {
        canvas {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__scrolldown {
      span {
        transform: translateY(52px);
      }
    }
  }
</style>

<style lang="scss" module>
  @import "../../../../assets/scss/variables";

  .fullScreen {
    @media (max-width: $minTablet) {
      height: 100vh !important;
    }
  }
</style>
