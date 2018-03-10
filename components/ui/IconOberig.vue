<template lang="pug">
  BaseSvgIcon.IconOberig(
    :icon="svgIcon",
    :width="width",
    :height="height"
  )
</template>

<script>
  import '~/assets/svg/dist/Symbol_Oberig';
  import '~/assets/svg/dist/Symbol_Oberig_empty';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { getPaths } from '../../modules/_helpers';
  import BaseSvgIcon from './BaseSvgIcon.vue';

  @Component({
    components: { BaseSvgIcon },
    props: {
      width: {
        type: String,
        default: '60'
      },
      height: {
        type: String,
        default: '61'
      },
      videoMode: {
        type: Boolean,
        default: false
      }
    }
  })
  export default class IconOberig extends Vue {
    /**
     * Animation status flag.
     *
     * @type {Boolean}
     */
    isAnimating = true;

    /**
     * SVG icon name.
     *
     * @type {String}
     */
    svgIcon = this.videoMode ? 'Symbol_Oberig_empty' : 'Symbol_Oberig';

    /**
     * TimelineMax animation object.
     *
     * @type {Undefined|Object}
     */
    animationTimeline = undefined;

    /**
     * Run infinite icon animation.
     *
     * @return {Promise}
     */
    startAnimation() {
      this.isAnimating = true;

      const prealoderIcon = this.$el;
      const preloaderLines = Array.from(prealoderIcon.querySelectorAll('path'));
      const getIconLines = getPaths(preloaderLines);
      const centerDot = getIconLines(id => id === 0);
      const linesLevel1 = getIconLines(id => (id - 1) % 3 === 1);
      const linesLevel2 = getIconLines(id => id % 3 === 1);
      const linesLevel3 = getIconLines(id => id % 3 === 0 && id !== 0);

      const parts = { prealoderIcon, centerDot, linesLevel1, linesLevel2, linesLevel3 };

      // start animation
      this.animation = this.videoMode
        ? this.videoModeAnimation(parts)
        : this.normalAnimation(parts);

      return this.animation;
    }

    /**
     * Finish icon's animation.
     *
     * @async
     * @return {Promise}
     */
    async finishAnimation() {
      this.isAnimating = false;

      await this.animation;
    }

    /**
     * Start normal animation.
     *
     * @param {HTMLElement} prealoderIcon
     * @param {HTMLElement} centerDot
     * @param {Array} linesLevel1
     * @param {Array} linesLevel2
     * @param {Array} linesLevel3
     * @return {Promise}
     */
    normalAnimation({ prealoderIcon, centerDot, linesLevel1, linesLevel2, linesLevel3 }) {
      return new Promise((resolve) => {
        const checkAndFinishAnimation = () => {
          if (!this.isAnimating) {
            TweenMax.killTweensOf([prealoderIcon, centerDot, linesLevel1, linesLevel2, linesLevel3]);
            resolve();
          }
        };

        this.animationTimeline = new TimelineMax({
          onRepeat: checkAndFinishAnimation,
          repeat: -1,
          repeatDelay: 0.15
        });

        this.animationTimeline
          .set(prealoderIcon, { opacity: 1 })
          // draw preloader lines
          .fromTo(linesLevel1, 0.2, { drawSVG: '100% 100%' }, { ease: Power0.easeNone, drawSVG: '0% 100%' })
          .fromTo(linesLevel2, 0.35, { drawSVG: '100% 100%' }, { ease: Power0.easeNone, drawSVG: '0% 100%' })
          .fromTo(linesLevel3, 1.2, { drawSVG: '100% 100%' }, { ease: Power1.easeOut, drawSVG: '0% 100%' })
          .to(linesLevel1, 0.1, { ease: Power0.easeNone, drawSVG: '0%' })
          .to(linesLevel2, 0.25, { ease: Power0.easeNone, drawSVG: '0%' })
          .to(linesLevel3, 0.9, { ease: Power1.easeOut, drawSVG: '0%' })
          // scale preloader center dot
          .fromTo(centerDot, 0.15, { transformOrigin: 'center', scale: 0 }, { transformOrigin: 'center', scale: 1 }, 0)
          .to(centerDot, 1.1, { transformOrigin: 'center', scale: 0 }, 1.65)
          // rotate preloader itself
          .fromTo(prealoderIcon, 1.5, { rotation: '+=100' }, { ease: Power1.easeInOut, rotation: '+=60' }, 0.075)
          .to(prealoderIcon, 1, { ease: Power1.easeInOut, rotation: '+=60' }, 1.8);
      });
    }

    /**
     * Start video mode icon animation.
     *
     * @param {HTMLElement} prealoderIcon
     * @param {HTMLElement} centerDot
     * @param {Array} linesLevel1
     * @param {Array} linesLevel2
     * @param {Array} linesLevel3
     * @return {Promise}
     */
    videoModeAnimation({ prealoderIcon, centerDot, linesLevel1, linesLevel2, linesLevel3 }) {
      return new Promise((resolve) => {
        this.animationTimeline = new TimelineMax({ onComplete: resolve });

        this.animationTimeline
          .set(prealoderIcon, { opacity: 1 })
          // draw preloader lines
          .fromTo(linesLevel1, 0.2, { drawSVG: '100% 100%' }, { ease: Power0.easeNone, drawSVG: '0% 100%' })
          .fromTo(linesLevel2, 0.35, { drawSVG: '100% 100%' }, { ease: Power0.easeNone, drawSVG: '0% 100%' })
          .fromTo(linesLevel3, 1.2, { drawSVG: '100% 100%' }, { ease: Power1.easeOut, drawSVG: '0% 100%' })
          .to(linesLevel1, 0.1, { ease: Power0.easeNone, drawSVG: '0%' })
          .to(linesLevel2, 0.25, { ease: Power0.easeNone, drawSVG: '0%' })
          .to(linesLevel3, 0.9, { ease: Power1.easeOut, drawSVG: '0% 40%' })
          // scale preloader center dot
          .fromTo(centerDot, 0.15, { transformOrigin: 'center', scale: 0 }, { transformOrigin: 'center', scale: 1 }, 0)
          // rotate preloader itself
          .to(prealoderIcon, 1.5, { ease: Power1.easeInOut, rotation: '+=60' }, 0.075)
          .to(prealoderIcon, 10, { repeat: -1, ease: Power0.easeNone, rotation: '420' }, 2.1);
      });
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .IconOberig {
    fill: none;
    stroke: black;
    opacity: 0;

    .st0{fill:#434243;stroke:none;}
    .st1{fill:none;stroke:#52556b;stroke-miterlimit:10;stroke-width: 2px;}

    overflow: visible;
  }
</style>
