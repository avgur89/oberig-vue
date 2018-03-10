<template lang="pug">
  a.ButtonCircleIcon(
    :href="url",
    :target="targetAttribute",
    :rel="relAttribute"
  )
    svg(style="position: absolute;", width="40", height="39", viewbox="0 0 40 39")
      defs
        linearGradient(id="circleIconGradient")
          stop(offset="0%", stop-color="rgba(33, 116, 183, 0.66)")
          stop(offset="100%", stop-color="rgba(171, 140, 192, 0.66)")
    BaseSvgIcon.circle-icon(
      :icon="icon",
      :width="width",
      :height="height"
    )
    BaseSvgIcon.circle-icon-hover(
      :icon="icon",
      :width="width",
      :height="height"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseSvgIcon from './BaseSvgIcon.vue';

  @Component({
    components: { BaseSvgIcon },
    props: {
      width: {
        type: String,
        default: '20'
      },
      height: {
        type: String,
        default: '20'
      },
      icon: {
        type: String
      },
      url: {
        type: String
      },
      targetBlank: {
        type: Boolean,
        default: true
      }
    }
  })
  export default class ButtonCircleIcon extends Vue {
    /**
     * @return {String|Boolean}
     */
    get targetAttribute() {
      return this.targetBlank ? '_blank' : false;
    }

    /**
     * @return {String|Boolean}
     */
    get relAttribute() {
      return this.targetBlank ? 'noopener' : false;
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";

  .circle-icon {
    position: absolute;
    top: 50%;
    left: 50%;

    svg {
      fill: url(#circleIconGradient);
    }

    transform: translate(-50%, -50%);
    transition: opacity 0.6s;

    opacity: 1;
    backface-visibility: hidden;
  }

  .circle-icon-hover {
    position: absolute;
    top: 50%;
    left: 50%;


    transform: translate(-50%, -50%);
    transition: opacity 0.6s;

    opacity: 0;
    backface-visibility: hidden;

    svg {
      fill: #fff;
    }
  }

  .ButtonCircleIcon {
    position: relative;
    display: inline-block;

    .svg-icon {
      font-size: 0;
    }

    width: 40px;
    height: 39px;

    border-radius: 100%;
    margin-right: 20px;

    box-shadow: 1px -2px 16px rgba(30, 75, 120, 0.18);
    background-color: rgba(255, 255, 255, 0.3);

    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }

    &:before {
      content: "";
      display: inline-block;

      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border-radius: 100%;

      background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);
      background-size: cover;
      background-position: center;

      transition: opacity 0.6s;
      opacity: 0;
    }

    svg {
      top: 0;
      left: 0;
    }

    @media (min-width: $desktop) {
      &:hover {
        &:before {
          opacity: 1;
        }

        .circle-icon-hover {
          opacity: 1;
        }

        .circle-icon {
          opacity: 0;
        }
      }
    }
  }
</style>
