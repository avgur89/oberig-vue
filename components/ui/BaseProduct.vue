<template lang="pug">
  .BaseProduct(
    :class="cssClassesObj",
    @mouseenter="setHoverState",
    @mouseleave="removeHoverState",
    @click="clickAction",
    :title="`${type} - ${code}`"
  )
    BaseReveal(
      v-if="modeIs.goTo",
      :in-viewport-once="true",
      :in-viewport-offset-top="-110",
      :action="revealItem"
    )
    .BaseProduct__image-wrapper
      svg.BaseProduct__svg(
        xmlns="http://www.w3.org/2000/svg",
        viewBox="0 0 146.9 146.9",
        v-if="!modeIs.add"
      )
        path.BaseProduct__form(d="M0,0h146.9v146.9H0V0z")
      img.BaseProduct__image(
        :src="imageUrl",
        :alt="`Oberig product: ${type} ${code}`"
      )
      span.BaseProduct__desc(v-if="modeIs.goTo") {{ type }} {{ code.toUpperCase() }}
      span.BaseProduct__desc(v-else-if="modeIs.remove")
        BaseSvgIcon.BaseProduct__remove(
          icon="cross_icon",
          width="20",
          height="20",
          :fill="false"
        )
      span.BaseProduct__desc(v-else-if="modeIs.add")
        BaseSvgIcon.BaseProduct__add(
          icon="ok-icon",
          width="111",
          height="87"
        )
</template>

<script>
  import '../../assets/svg/dist/cross_icon';
  import '../../assets/svg/dist/ok-icon';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapActions } from 'vuex';
  import bus from '../../plugins/event-bus';
  import {
    COLLECTION_PREVIEW_CLOSED,
    DISABLE_BACKGROUND,
    QUERY_CHANGED
  } from '../../modules/_events';
  import {
    Resp,
    css,
    generateUrl,
    calculateScale
  } from '../../modules/_helpers';
  import BaseReveal from './BaseReveal.vue';

  const ADD = 'add';
  const GOTO = 'goTo';
  const REMOVE = 'remove';

  @Component({
    components: { BaseReveal },
    props: {
      alias: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      code: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: false
      },
      delayIndex: {
        type: Number,
        default: 0
      },
      previewClosed: {
        type: Boolean,
        default: true
      },
      onAddAction: {
        type: Function,
        required: false
      },
      onRemoveAction: {
        type: Function,
        required: false
      },
      mode: {
        type: String,
        required: true,
        validator: mode => [ADD, REMOVE, GOTO].some(expectedMode => expectedMode === mode)
      }
    },
    methods: mapActions(['removeFromCart'])
  })
  export default class BaseProduct extends Vue {
    /**
     * GSAP animation timeline
     *
     * @type {Object|Undefined}
     */
    itemAnimation = undefined;

    /**
     * User clicked on item and page transition started
     *
     * @type {Boolean}
     */
    clickedOnItem = false;

    /**
     * Revealed indicator
     *
     * @type {Boolean}
     */
    revealed = false;

    /**
     * @return {Object}
     */
    get modeIs() {
      return {
        add: this.mode === ADD,
        goTo: this.mode === GOTO,
        remove: this.mode === REMOVE
      };
    }

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.hidden]: this.clickedOnItem,
        [css.animatable]: this.modeIs.goTo,
        [css.single]: this.modeIs.add
      };
    }

    mounted() {
      if (this.modeIs.goTo) {
        bus.$on(QUERY_CHANGED, this.setRevealed);
      }
    }

    destroyed() {
      if (this.modeIs.goTo) {
        bus.$off(COLLECTION_PREVIEW_CLOSED, this.revealAnimation);
        bus.$off(QUERY_CHANGED, this.setRevealed);
      }
    }

    /**
     * Set items reveal state
     */
    setRevealed() {
      if (this.revealed) return;

      this.revealed = true;

      TweenMax.set(this.$el, { opacity: 1, y: 0 });
    }

    /**
     * Activate item animation
     */
    revealItem() {
      if (this.revealed) return;

      if (!this.previewClosed) return bus.$on(COLLECTION_PREVIEW_CLOSED, this.revealAnimation);

      this.revealAnimation();
    }

    /**
     * Product reveal animation
     */
    revealAnimation() {
      this.revealed = true;

      const lineIndex = (this.delayIndex - 1) % (Resp.isDesk ? 3 : 2);
      const delay = Resp.isMobile ? 0 : lineIndex * 0.2;

      TweenMax.fromTo(this.$el, 0.8,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, delay, ease: Power1.easeOut }
      );
    }

    /**
     * Run hovered state animation
     */
    setHoverState() {
      if (this.clickedOnItem || this.modeIs.add) return;

      if (this.itemAnimation) return this.itemAnimation.play();

      const svgForm = this.$el.querySelector('path');
      const imageWrapper = this.$el.querySelector('.BaseProduct__image-wrapper');
      const image = this.$el.querySelector('img');
      const label = this.$el.querySelector('.BaseProduct__desc');
      const time = 0.5;

      this.itemAnimation = new TimelineMax()
        .to(svgForm, time, {
          morphSVG: {
            shape: 'M102.5,8.6c59.4,25.4,36.1,79.8,31.8,96.2s-24.2,54.4-90.5,33.9C2.2,125.8,4.4,91.2,4.4,65.5s1.5-50,34.3-58.7  C67.3-0.7,86.8,1.9,102.5,8.6z',
            shapeIndex: 6
          },
          ease: Power1.easeInOut
        }, 0.04)
        .to(image, time, {
          opacity: 0.1,
          ease: Power1.easeOut
        }, 0)
        .to(label, time, {
          opacity: 1,
          ease: Power1.easeOut
        }, 0)
        .to(imageWrapper, 0.2, { boxShadow: '0 30px 49px rgba(30, 75, 120, 0)' }, 0);
    }

    /**
     * Remove hovered state (animation)
     */
    removeHoverState() {
      if (this.clickedOnItem || this.modeIs.add) return;

      this.itemAnimation.reverse();
    }

    /**
     * Dispatch action (based on type)
     */
    clickAction() {
      switch (this.mode) {
        case ADD: {
          this.toggleProduct();
          break;
        }
        case GOTO: {
          this.goToProduct();
          break;
        }
        case REMOVE: {
          this.removeProduct();
          break;
        }
        default: break;
      }
    }

    /**
     * Navigate to the clicked route with custom transition
     */
    goToProduct() {
      if (this.clickedOnItem) return;

      this.clickedOnItem = true;

      const svg = this.$el.querySelector('svg');
      const svgForm = this.$el.querySelector('path');
      const [scaleX, scaleY] = calculateScale(this.$el);
      const onAnimationComplete = () => {
        const url = generateUrl(this.$route.params.lang, `product/${this.alias}`);
        this.$router.push(url);
      };

      bus.$emit(DISABLE_BACKGROUND);

      new TimelineMax({ onComplete: onAnimationComplete })
        .to(svgForm, 0.7, {
          morphSVG: 'M0,0h146.9v146.9H0V0z',
          ease: Power1.easeInOut
        })
        .to(svg, 0.7, {
          scaleX,
          scaleY,
          ease: Power0.easeNone
        }, 0);
    }

    /**
     * Remove product from cart
     */
    removeProduct() {
      this.removeFromCart(this.id);
    }

    /**
     * Add/remove <product> to cart/store etc
     */
    toggleProduct() {
      const { alias, type, code, imageUrl, id } = this;
      const actionArgs = {
        alias,
        type,
        code,
        imageUrl,
        id
      };

      !this.clickedOnItem ? this.onAddAction(actionArgs) : this.onRemoveAction(actionArgs);

      this.clickedOnItem = !this.clickedOnItem;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BaseProduct {
    position: relative;
    display: block;
    width: 373px;
    height: 373px;

    margin-right: 40px;
    margin-bottom: 40px;

    cursor: pointer;

    z-index: 3;

    @media (max-width: $minDesktop) {
      width: 330px;
      height: 330px;
    }

    @media (max-width: $minTablet) {
      width: 100%;
      height: 290px;
      margin-right: 0;
    }

    &.js-hidden {
      &:not(.js-single) {
        z-index: 8;

        .BaseProduct {
          &__image-wrapper {
            box-shadow: none !important;
          }
          &__desc {
            opacity: 0 !important;
            transition: opacity 0.25s;
          }
          &__image {
            opacity: 0 !important;
            transition: opacity 0.25s;
          }
        }
      }
      &.js-single {
        .BaseProduct {
          &__image-wrapper {
            box-shadow: none;
          }
          &__desc {
            opacity: 1;
          }
          &__image {
            opacity: 0.15;
          }
        }
      }
    }

    &.js-single {
      .BaseProduct {
        &__image-wrapper {
          background-color: white;
        }
      }

      @media (min-width: $desktop) {
        &:hover {
          .BaseProduct {
            &__image-wrapper {
              box-shadow: none;
            }
            &__image {
              opacity: 0.15;
            }
          }
        }
      }

      .BaseProduct {
        &__image-wrapper {
          transition: box-shadow .6s ease;
          transform: translate3d(0, 0, 0);
        }
        &__desc {
          transition: opacity .6s ease;
        }
        &__image {
          transition: opacity .6s ease;
          transform: translate3d(0, 0, 0);
        }
      }
    }

    &.js-animatable {
      opacity: 0;
    }

    &__svg {
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      z-index: 1;
    }

    &__form {
      fill: white;
    }

    &:nth-child(3n + 3) {
      margin-right: 0;

      @media (max-width: $minDesktop) {
        margin-right: 40px;
      }

      @media (max-width: 1279px) and (min-width: 1190px) {
        margin-right: 40px;
      }

      @media (max-width: $minTablet) {
        width: 100%;
        margin-right: 0;
      }
    }

    &:nth-child(even) {
      @media (max-width: $minDesktop) {
        margin-right: 0;
      }

      @media (max-width: 1279px) and (min-width: 1190px) {
        margin-right: 0;
      }
    }

    &:last-child {
      margin-right: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 0;
      }
    }

    &__remove {
      color: transparent;
      fill: #736d7b;
    }

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);

      @media (max-width: $minTablet) {
        height: 290px;
        width: 290px;
        margin: 0 auto;
      }
    }

    &__image {
      position: relative;

      max-width: 230px;
      max-height: 230px;

      z-index: 2;
    }

    &__desc {
      position: absolute;

      left: 50%;
      top: 50%;

      transform: translate3d(-50%, -50%, 0);

      opacity: 0;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      z-index: 4;

      color: #444344;
    }
  }
</style>
