<template lang="pug">
  .ButtonTabs(@click="toggleTab")
    .ButtonTabs__icon
      svg(style="position: absolute;", width="40", height="39", viewbox="0 0 40 39")
        defs
          linearGradient(id="circleIconGradient")
            stop(offset="0%", stop-color="rgba(33, 116, 183, 0.66)")
            stop(offset="100%", stop-color="rgba(171, 140, 192, 0.66)")
      BaseSvgIcon.ButtonTabs__svg#icon(
        :icon="icon",
        :width="width",
        :height="height"
      )
      BaseSvgIcon.ButtonTabs__svg#icon-hover(
        :icon="icon",
        :width="width",
        :height="height"
      )
    .ButtonTabs__desc {{ text }}
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
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      toggleTab: {
        type: Function,
        required: true
      }
    }
  })
  export default class ButtonTabsIcon extends Vue {}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";

  .ButtonTabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &__svg {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 0;

      transform: translate(-50%, -50%);
    }

    &__icon {
      position: relative;
      display: inline-block;

      width: 40px;
      height: 39px;

      border-radius: 100%;
      margin-right: 26px;

      box-shadow: 1px -2px 16px rgba(30, 75, 120, 0.18);
      background-color: rgba(255, 255, 255, 0.3);

      text-decoration: none;
      cursor: pointer;

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
      }

      svg {
        top: 0;
        left: 0;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }
  }
</style>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .ButtonTabs {
    #icon {
      fill: #fff;

      transition: opacity 0.6s;

      backface-visibility: hidden;
    }

    #icon-hover {
      fill: url(#circleIconGradient);

      transition: opacity 0.6s;

      opacity: 0;
      backface-visibility: hidden;
    }

    @media (min-width: $desktop) {
      &:hover {
        .ButtonTabs__icon {
          &:before {
            opacity: 0;
          }

          #icon {
            opacity: 0;
          }

          #icon-hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
