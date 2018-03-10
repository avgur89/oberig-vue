<template lang="pug">
  section.BlockLinks
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealBlockLinks"
    )
    nuxt-link.BlockLinks__link(:to="urlLeft")
      .BlockLinks__link-desc.BlockLinks__link-desc--left {{ textLeft }}
    nuxt-link.BlockLinks__link(:to="urlRight", :style="{ 'background-image': `url(${imgUrl})` }")
      .BlockLinks__link-desc.BlockLinks__link-desc--right {{ textRight }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseReveal from '../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    props: {
      urlLeft: {
        type: String,
        required: true
      },
      urlRight: {
        type: String,
        required: true
      },
      textLeft: {
        type: String,
        required: true
      },
      textRight: {
        type: String,
        required: true
      },
      imgUrl: {
        type: String,
        required: true
      },
      reveal: {
        type: Function,
        required: false
      }
    }
  })
  export default class BlockLinks extends Vue {
    /**
     * Call 'reveal' function with BlockLinks as first argument
     */
    revealBlockLinks() {
      typeof this.reveal === 'function' && this.reveal(this.$el);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BlockLinks {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    width: calc(100% + 80px);
    margin-left: -40px;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);
      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);
      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      flex-direction: column;
      width: calc(100% + 28px);
      margin-left: -14px;
    }

    &__link {
      position: relative;

      flex: 0 1 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      height: 200px;

      background-color: #fff;
      box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);
      text-decoration: none;

      @media (max-width: $minDesktop) {
        height: 145px;
      }

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;
        height: 150px;
      }

      &:last-child {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        &:before,
        &:after {
          content: "";

          position: absolute;
          display: inline-block;

          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);
          background-size: 100% auto;
          background-position: right center;
          opacity: 0.5;

          transition: opacity 1s ease;
        }

        &:after {
          background-image: linear-gradient(to right, #c95842 0%, #506a8c 100%);
          opacity: 0;
        }

        @media (min-width: $minDesktop) {
          &:hover {
            &:before {
              opacity: 0;
            }
            &:after {
              opacity: 0.5;
            }
          }
        }
      }

      &-desc {
        position: relative;
        z-index: 1;

        font-family: $CalibriBold;
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        text-align: center;

        color: #fff;

        &--left {
          @include gradient-text();
        }
      }
    }
  }
</style>
