<template lang="pug">
  .TheBackground(
    :class="cssClassesObj",
    :style="{ background: `url(/img/bg_final.${webp_jpg})` }"
  )
    .TheBackground__gradient(ref="TheBackgroundGradientRef")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { throttle } from 'lodash';
  import webpExtension from '../../mixins/webpExtension';
  import bus from '../../plugins/event-bus';
  import {
    ENABLE_BACKGROUND,
    DISABLE_BACKGROUND
  } from '../../modules/_events';
  import { Resp, css } from '../../modules/_helpers';

  @Component({
    mixins: [webpExtension],
    watch: {
      $route(next, prev) {
        const nextIsProduct = next.name.includes('product');
        const prevIsProduct = prev.name.includes('product');

        if (nextIsProduct && !prevIsProduct) {
          this.disableFloatingBackground();
        }

        if (!nextIsProduct && prevIsProduct) {
          Resp.isDesk ? this.enableFloatingBackground() : this.opacityEnabled = true;
        }
      }
    }
  })
  export default class TheBackground extends Vue {
    /**
     * Css class indicator state (1/0).
     *
     * @type {Boolean}
     */
    opacityEnabled = false;

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return { [css.hidden]: !this.opacityEnabled };
    }

    mounted() {
      const isProductPage = this.$route.name.includes('product');

      if (Resp.isDesk && !isProductPage) {
        !Resp.isFirefox ? this.enableFloatingBackground() : this.opacityEnabled = true;
      }

      if (!Resp.isDesk && !isProductPage) this.opacityEnabled = true;

      bus.$on(ENABLE_BACKGROUND, this.enableFloatingBackground);
      bus.$on(DISABLE_BACKGROUND, this.disableFloatingBackground);
    }

    destroyed() {
      bus.$off(ENABLE_BACKGROUND, this.enableFloatingBackground);
      bus.$off(DISABLE_BACKGROUND, this.disableFloatingBackground);
    }

    /**
     * Initialize background animation.
     */
    enableFloatingBackground() {
      this.opacityEnabled = true;

      document.body.addEventListener('mousemove', this.moveBackground);
    }

    /**
     * Disable floating background animation.
     */
    disableFloatingBackground() {
      this.opacityEnabled = false;

      document.body.removeEventListener('mousemove', this.moveBackground);
    }

    /**
     * Rotate background (gradient).
     */
    moveBackground = throttle(({ pageX, pageY }) => {
      const { TheBackgroundGradientRef: gradient } = this.$refs;
      const scrlTop = Resp.scrollTop;
      const degrees = 180 / Math.PI;
      const wHeight = window.innerHeight;

      let currentRotation = 0;
      let distance = 0;

      // re-calc y (remove scrolled distance)
      if (scrlTop > (wHeight - 50)) pageY -= scrlTop;

      // allow full-screen rotation
      pageY += wHeight / 2.5;

      // calc final x, y and angle
      const x = pageX - (gradient.offsetLeft + (gradient.offsetWidth / 2));
      const y = pageY - (gradient.offsetTop + (gradient.offsetHeight / 2));
      const angle = (Math.atan2(y, x) * degrees) + 180;

      // prevent gradient 'jump'
      if (gradient._gsTransform) {
        currentRotation = gradient._gsTransform.rotation;
      }
      distance = Math.abs(currentRotation - angle);
      if (distance > 180) {
        if (currentRotation < 180 && angle > 180) {
          TweenMax.set(gradient, {
            rotation: currentRotation + 360
          });
        } else if (currentRotation > 180 && angle < 180) {
          TweenMax.set(gradient, {
            rotation: currentRotation - 360
          });
        }
      }

      // animate
      TweenMax.to(gradient, 20, {
        ease: Back.easeOut.config(5),
        rotation: angle
      });
    }, 150);
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';

  .TheBackground {
    position: fixed;

    width: 100%;
    height: 100%;

    left: 0;
    top: 0;

    z-index: 0;

    overflow: hidden;

    transition: opacity 2s ease;

    &.js-hidden {
      opacity: 0;
    }

    &__gradient {
      position: fixed;

      left: -53vw;
      top: -50vw;
      height: 200vw;
      width: 200vw;
      opacity: 0.3;

      z-index: -1;

      background: linear-gradient(90deg, rgba(105, 163, 211, 1) 0%, white 54%, rgb(204, 137, 208) 85%);

      @media (max-width: 1024px) {
        width: 180vw;
        height: 100%;

        left: -40vw;
        top: 0;
      }

      @media (max-width: $minTablet) {
        height: 130vh;
      }
    }
  }
</style>
