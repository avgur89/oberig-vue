<template lang="pug">
  .SectionList(:class="cssClassesObj")
    BaseReveal(
      :in-viewport-once="true",
      :action="revealList"
    )
    .SectionList__inner
      BaseProduct.SectionList__item(
        v-for="item in cartProducts",
        :key="item.id",
        :alias="item.alias",
        :code="item.code",
        :type="item.type",
        :id="item.id",
        :imageUrl="item.titleImageSrc || item.imageUrl",
        mode="remove"
      )
      .SectionList__item-toggle(:class="{ 'items-even': cartProducts && cartProducts.length % 2 === 0 }")
        .SectionList__toggle(@click="toggleRelated")
          svg.SectionList__toggle-svg(
            xmlns="http://www.w3.org/2000/svg",
            viewBox="0 0 32.7 32.8",
            :class="noFilter ? '' : $style.filter"
          )
            linearGradient#ProductAddGradient
              stop(offset="0%", stop-color="rgba(171, 140, 192, 0.75)")
              stop(offset="100%", stop-color="rgba(33, 116, 183, 0.75)")
            path(d="M23.8,2.7c10,3.4,7.9,17.1,6.9,20.6C29.8,26.8,25.4,35,11,30.6c-9.1-2.8-9.9-8.4-9.9-13.9 c0-5.5,4.1-12.1,11.1-14.5C17.8,0.2,18.5,0.9,23.8,2.7z")
          .SectionList__toggle-x
            span
            span
          .SectionList__toggle-label {{ opened ? p.cancelButtonLabel : p.addButtonLabel }}
      .SectionList__item-dummy
      .SectionList__item-dummy
      .SectionList__item-dummy
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import {
    SHOW_RELATED,
    HIDE_RELATED
  } from '../../../../modules/_events';
  import { css } from '../../../../modules/_helpers';
  import BaseProduct from '../../../ui/BaseProduct.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseProduct, BaseReveal },
    props: {
      opened: {
        type: Boolean,
        required: true
      }
    },
    computed: mapGetters(['cartProducts', 'p']),
    watch: {
      opened(nextState, prevState) {
        if (nextState === prevState) return;

        nextState ? this.activeButtonState() : this.normalButtonState();
      }
    },
    methods: mapActions(['actualizeRelatedProducts'])
  })
  export default class SectionList extends Vue {
    /**
     * GSAP animation timeline
     *
     * @type {Object|Undefined}
     */
    relatedAnimation = undefined;

    /**
     * Detect filter support
     *
     * @type {Boolean}
     */
    noFilter = false;

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.active]: this.opened
      };
    }

    mounted() {
      this.noFilter = [
        'iPad',
        '9.1.3 Safari'
      ].some(v => navigator.userAgent.includes(v));
    }

    /**
     * Show items list
     */
    revealList() {
      TweenMax.to(this.$el, 0.9, { delay: 0.5, opacity: 1, ease: Power1.easeOut });
    }

    /**
     * Open/close related products block
     */
    toggleRelated() {
      this.opened ? this.closeRelated() : this.openRelated();
    }

    /**
     * Run filters open animation
     */
    async openRelated() {
      await this.actualizeRelatedProducts(this.$router);

      bus.$emit(SHOW_RELATED);
    }

    /**
     * Run filters close animation
     */
    closeRelated() {
      bus.$emit(HIDE_RELATED);
    }

    /**
     * Set active button state when related are shown
     */
    activeButtonState() {
      if (this.relatedAnimation) return this.relatedAnimation.play();

      this.relatedAnimation = new TimelineMax()
        .to('#ProductAddGradient stop', 0.6, {
          attr: {
            'stop-color': 'rgba(255, 255, 255, 1)'
          },
          ease: Power1.easeOut
        });
    }

    /**
     * Return button to the normal state
     */
    normalButtonState() {
      this.relatedAnimation.reverse();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionList {
    opacity: 0;

    margin-top: 33px;

    @media (max-width: $minDesktop) {
      margin-top: 30px;
    }

    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: $minDesktop) {
        @media (orientation: landscape) {
          justify-content: center;
        }
      }
    }

    &.js-active {
      .SectionList {
        &__toggle:hover .SectionList__toggle-x {
          transform: translateX(-50%);

          span {
            &:nth-child(1) {
              transform: translate3d(2px,-6px,0) rotate(-45deg);
            }
            &:nth-child(2) {
              transform: translate3d(1px,-6px,0) rotate(45deg);
            }
          }
        }
      }
    }

    &__toggle {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;

      position: relative;

      cursor: pointer;

      @media (min-width: $desktop) {
        &:hover {
          .SectionList {
            &__toggle {
              &-x {
                transform: translateX(-50%) scale(0.8);
              }
              &-label {
                background-position: left 0;
              }
            }
          }
        }
      }

      @media (max-width: $minDesktop) and (min-width: $tablet) {
        .SectionList {
          &__toggle {
            &-x {
              top: 31px;
              left: 50%;
              transform: translate3d(-50%, -50%, 0) !important;
            }
            &-label {
              width: 100%;
              margin-left: 0;
              margin-top: 21px;
            }
          }
        }
      }

      .SectionList.js-active & {
        .SectionList {
          &__toggle {
            &-x {
              span {
                background: -webkit-linear-gradient(left, rgba(171, 140, 192, 0.75) 0%, rgba(33, 116, 183, 0.75) 65%);

                &:nth-child(1) {
                  height: 32px;
                  transform: translate3d(2px,-11px,0) rotate(-45deg);
                }
                &:nth-child(2) {
                  height: 32px;
                  transform: translate3d(1px,-2px,0) rotate(45deg);
                }
              }
            }
            &-label {
              background-position: left 0;
            }
          }
        }
      }

      &-svg {
        width: 61px;
        height: 62px;

        path {
          fill-rule: evenodd;
          clip-rule: evenodd;
          fill: url(#ProductAddGradient);
        }
      }
      &-x {
        position: absolute;

        height: 16px;

        top: 24px;
        left: 50%;

        transform: translateX(-50%);

        transition: transform .4s ease-out;

        font-size: 0;

        span {
          display: inline-block;
          width: 1px;

          background-color: white;

          transform: translate3d(0, 0, 0);
          transition: transform .6s ease, height .5s ease-out;

          &:nth-child(1) {
            height: 17px;
            transform: rotate(90deg) translate3d(0, -0.5px, 0);
          }
          &:nth-child(2) {
            height: 17px;
          }
        }
      }
      &-label {
        font-family: $CalibriBold;
        font-size: 13px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.6px;

        margin-top: 32px;

        background: -webkit-linear-gradient(left, #50556b, #786266 33.3%, #786266 66.6%, #50556b 100%);
        background-size: 300% 100%;
        background-position: right 0;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-repeat: no-repeat;

        transition: background 1s ease;

        @media (max-width: $minTablet) {
          margin-top: 22px;
        }
      }
    }

    &__item {
      @media (min-width: $minTablet) {
        &:not(:first-child) {
          margin-left: 21px;
        }
      }

      @media (min-width: $desktop) {
        &:nth-child(3n+1) {
          margin-left: 0;
        }
      }

      @media (max-width: $minTablet) {
        height: 290px !important;
      }

      margin-right: 0 !important;

      &-toggle {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 373px;
        height: 373px;

        margin-left: 21px;
        margin-bottom: 40px;

        z-index: 3;

        @media (max-width: $minDesktop) {
          width: 330px;
          height: 330px;

          margin-bottom: 0;

          @media (min-width: $tablet) {
            .SectionList__toggle-label {
              margin-top: 32px;
            }

            &.items-even {
              margin-left: 0;
              width: 100%;
              height: 155px;
            }
          }
        }

        @media (max-width: $minTablet) {
          width: 100%;
          height: 147px;
          margin-left: 0;
        }
      }
      &-dummy {
        width: 373px;
        height: 0;

        margin-right: 21px;

        @media (max-width: $minDesktop) {
          width: 330px;
        }

        @media (max-width: $minTablet) {
          display: none;
        }
      }
    }
  }
</style>

<style lang="scss" module>
  .filter {
    -webkit-filter: drop-shadow(1px -2px 16px rgba(30, 75, 120, 0.3));
    filter: drop-shadow(1px -2px 16px rgba(30, 75, 120, 0.3));
  }
</style>
