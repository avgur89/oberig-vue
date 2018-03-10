<template lang="pug">
  .PortraitImage
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-200",
      :action="revealImage"
    )
    .PortraitImage__circles
      BaseSvgIcon.PortraitImage__circle(
        icon="soul-of-brand-clip-circle-1",
        width="431",
        height="441",
        :fill="false"
      )
      BaseSvgIcon.PortraitImage__circle(
        icon="soul-of-brand-clip-circle-2",
        width="442",
        height="451",
        :fill="false"
      )
      BaseSvgIcon.PortraitImage__circle(
        icon="soul-of-brand-clip-circle-3",
        width="460",
        height="469",
        :fill="false"
      )
    .PortraitImage__inner
      svg(width="431", height="440", viewBox="0 0 431 440")
        defs
          clipPath#soul-of-brand-image-clip
            path#soul-of-brand-image-clip-path(transform="translate(10 -3450) scale(0.6)", d="M312.38 5907.46c33.8 0 56.22 17.29 84.69 31.43 23.41 11.64 54 18.13 71.73 37.2 20.03 21.56 25.84 52.24 36.05 80.68 8.48 23.61 23.1 44.11 23.1 70.72 0 32.63-18.32 58.6-30.8 86.45-13.74 30.65-22.82 62.52-48.04 83.67-18.1 15.17-45.13 17.79-67.44 26.34-23.57 9.04-42.63 23.58-69.29 23.58-34 0-56.09-17.13-84.68-31.44-26.32-13.16-59.69-22.55-78.63-44.97-19.4-22.96-20.34-51-29.16-80.76-5.98-20.19-23.1-40.68-23.1-62.87 0-36.58 23.02-71.8 38.5-102.16 11.38-22.31 12.13-41.67 29.98-58.69 21.94-20.91 48.79-25.46 77.8-35.61 21.93-7.66 44.82-23.57 69.3-23.57z")
        image(id="soul-of-brand-image", width="100%", height="101%", :xlink:href="imgUrl", clip-path="url(#soul-of-brand-image-clip)")
    slot
</template>

<script>
  import '../../assets/svg/dist/soul-of-brand-clip-circle-1';
  import '../../assets/svg/dist/soul-of-brand-clip-circle-2';
  import '../../assets/svg/dist/soul-of-brand-clip-circle-3';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseSvgIcon from './BaseSvgIcon.vue';
  import BaseReveal from './BaseReveal.vue';

  @Component({
    components: { BaseSvgIcon, BaseReveal },
    props: {
      imgUrl: {
        type: String,
        required: true
      }
    }
  })
  export default class PortraitImage extends Vue {
    /**
     * Reveal portrait image and circles
     */
    revealImage() {
      new TimelineMax()
        // clip path
        .to('#soul-of-brand-image-clip-path', 1.2, {
          ease: Power1.easeOut,
          attr: { transform: 'translate(-90 -5636) scale(0.9569)' }
        })
        // circles
        .staggerTo('.PortraitImage__circle', 1.2, {
          ease: Power1.easeOut,
          scale: 1
        }, 0.15, 0.09);
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .PortraitImage {
    @media (max-width: $minDesktop) {
      width: 340px !important;
      height: 340px !important;

      @media (min-width: $tablet) {
        transform: translateX(4px);
      }

      svg {
        width: 340px !important;
        height: 340px !important;
      }
    }

    @media (max-width: $minTablet) {
      width: 291px !important;
      height: 291px !important;

      svg {
        width: 291px !important;
        height: 291px !important;
      }
    }

    &__circles {
      position: absolute;

      right: 0;
      bottom: 0;

      z-index: 1;

      @media (max-width: $minDesktop) {
        width: 100%;
        height: 100%;

        right: 50%;
        bottom: 50%;

        transform: translate3d(50%, 50%, 0) translateX(4px) translateY(-3px);
      }
    }

    &__circle {
      position: absolute;

      stroke: #cdcdcd;

      transform: scale(0.5);

      &:nth-child(1) {
        right: 10px;
        bottom: -8px;

        opacity: 0.45;
        stroke: #cdcdcd;
      }
      &:nth-child(2) {
        right: 6px;
        bottom: -13px;

        stroke: #bdbaba;
      }
      &:nth-child(3) {
        bottom: -14px;
        right: 0;

        stroke: #bdbaba;
      }

      @media (max-width: $minDesktop) {
        width: 340px !important;
        height: 340px !important;

        @media (min-width: $tablet) {
          transform: translateX(4px);
        }

        svg {
          width: 340px !important;
          height: 340px !important;
        }
      }

      @media (max-width: $minTablet) {
        width: 291px !important;
        height: 291px !important;

        svg {
          width: 291px !important;
          height: 291px !important;
        }
      }
    }

    &__inner {
      position: relative;
      z-index: 2;
    }
  }
</style>
