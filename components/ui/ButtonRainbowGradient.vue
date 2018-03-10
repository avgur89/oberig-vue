<template lang="pug">
  .ButtonRainbowGradient
    a.ButtonRainbowGradient__link(
      :href="url",
      target="_blank",
      rel="noopener",
      v-if="isHref"
    ) {{ text }}
    .ButtonRainbowGradient__link(v-else-if="isStatic") {{ text }}
    nuxt-link.ButtonRainbowGradient__link(
      :to="url",
      v-else
    ) {{ text }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';

  @Component({
    props: {
      url: {
        type: String,
        required: false
      },
      text: {
        type: String,
        required: true
      },
      isHref: {
        type: Boolean,
        default: false
      },
      isStatic: {
        type: Boolean,
        default: false
      }
    }
  })
  export default class ButtonRainbowGradient extends Vue {}
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .ButtonRainbowGradient {
    position: relative;
    display: inline-block;

    min-width: 212px;
    height: 60px;
    line-height: 60px;

    border-radius: 40px;
    text-align: center;

    box-shadow: 0 12px 16px rgba(30, 75, 120, 0.22);

    cursor: pointer;

    &:before {
      content: "";

      position: absolute;
      display: inline-block;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border-radius: 40px;

      background-image: linear-gradient(
          to right,
          rgba(171, 140, 192, 0.66) 0%,
          rgba(33, 116, 183, 0.66) 50%,
          rgba(171, 140, 192, 0.66) 100%
      );
      background-size: 200% auto;
      background-position: right center;

      transition: background 1s ease;
    }

    @media (min-width: $minDesktop) {
      &:hover {
        &:before {
          background-position: left center;
        }
      }
    }

    &__link {
      position: relative;
      display: inline-block;

      width: 100%;

      padding: 0 30px;

      font-family: $CalibriBold;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 2.8px;

      color: #fff;

      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
