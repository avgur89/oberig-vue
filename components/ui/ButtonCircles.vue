<template lang="pug">
  nuxt-link.ButtonCircles(
    :to="url",
    :class="cssClassesObject"
  )
    .ButtonCircles__inner(
      @mouseenter="onHover(false)",
      @mouseleave="onHover(true)"
    )
      .ButtonCircles__text.gradient-text-nohover(ref="ButtonCirclesTextRef") {{ text }}
      .ButtonCircles__line(ref="ButtonCirclesLineRef")
      BaseSvgIcon.ButtonCircles__icon(
        icon="buttonCircles",
        width="84",
        height="85",
        :fill="false",
        ref="ButtonCirclesIconRef"
      )
</template>

<script>
  import '../../assets/svg/dist/buttonCircles';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { initial } from 'lodash';
  import animatable from '../../mixins/animatable';
  import BaseSvgIcon from './BaseSvgIcon.vue';

  @Component({
    mixins: [animatable],
    components: { BaseSvgIcon },
    props: {
      text: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  })
  export default class ButtonCircles extends Vue {
    /**
     * @return {Array<HTMLElement>}
     */
    get paths() {
      return initial([...this.$el.querySelectorAll('path')]);
    }

    /**
     * Animate (reveal) link.
     */
    reveal() {
      const {
        $refs: {
          ButtonCirclesTextRef,
          ButtonCirclesLineRef,
          ButtonCirclesIconRef: { $el }
        }
      } = this;

      new TimelineMax()
        .to($el, 0.35, { scale: 1, opacity: 0.35 }, 0)
        .to(ButtonCirclesLineRef, 0.25, { width: 43, opacity: 1 }, 0.14)
        .to(ButtonCirclesTextRef, 0.5, { y: '-50%', opacity: 1 }, 0.2);
    }

    /**
     * Animate link (hover).
     *
     * @param {Boolean} [reverse=false]
     */
    onHover(reverse = false) {
      const {
        paths,
        $refs: { ButtonCirclesTextRef, ButtonCirclesLineRef }
      } = this;
      const { circles, lineFirst, lineSecond, label } = reverse ?
      {
        circles: [{ x: 0 }, 0.1],
        lineFirst: [0.1, { delay: 0.2, opacity: 1 }, 0.165],
        lineSecond: [0.2, { delay: 0.2, width: 43 }, 0.165],
        label: [{ x: 0 }, 0]
      }
      :
      {
        circles: [{ cycle: { x: [-17, -12, -6.5] } }, 0.1, 0],
        lineFirst: [0.2, { width: 0 }, 0],
        lineSecond: [0.1, { opacity: 0 }, 0.1],
        label: [{ x: 32 }, 0]
      };

      new TimelineMax()
        .staggerTo(paths, 0.5, ...circles)
        .to(ButtonCirclesLineRef, ...lineFirst)
        .to(ButtonCirclesLineRef, ...lineSecond)
        .to(ButtonCirclesTextRef, 0.6, ...label);
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .ButtonCircles {
    position: relative;

    &.js-animatable {
      .ButtonCircles {
        &__text {
          transform: translateY(-50%) translateY(-30px);
          opacity: 0;
        }
        &__line {
          width: 0;
          opacity: 0;
        }
        &__icon {
          opacity: 0;
          transform: scale(0.55);
        }
      }
    }

    &__text {
      position: absolute;

      right: 32px;
      top: 50%;

      transform: translate3d(0, -50%, 0);

      font-family: $CalibriBold;
      font-size: 13px;
      line-height: 24px;
      text-transform: uppercase;
      white-space: nowrap;
      letter-spacing: 2.5px;

      z-index: 3;
    }

    &__line {
      position: absolute;

      left: 58px;
      top: 50%;

      width: 43px;
      height: 1px;
      background-color: #cdcdcd;

      z-index: 2;

      &:before {
        content: '';
        display: block;

        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: #cdcdcd;

        margin-top: -1px;
      }
    }

    &__icon {
      position: relative;
      stroke: #cdcdcd;
      color: #cdcdcd;
      fill: none;

      z-index: 1;

      opacity: 0.4;
    }
  }
</style>
