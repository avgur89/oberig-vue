<template lang="pug">
  .BaseDropdown(
    v-on-clickaway="close",
    @click="toggle",
    :class="cssClassesObject"
  )
    .BaseDropdown__item.BaseDropdown__item--current.gradient-text-haswhite {{ currentItem }}
    .BaseDropdown__inner
      .BaseDropdown__item.gradient-text(
        v-for="(item, index) in items",
        :key="index",
        @click="onChange(item, index)"
      ) {{ item.label }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mixin as clickaway } from 'vue-clickaway';
  import { every } from 'lodash';
  import { css } from '../../modules/_helpers';

  @Component({
    mixins: [clickaway],
    props: {
      items: {
        type: Array,
        required: true,
        validator: items => every(items, item => !!item.label)
      },
      currentItem: {
        type: String,
        required: true
      },
      onChange: {
        type: Function,
        required: false
      },
      initiallyOpened: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  })
  export default class BaseDropdown extends Vue {
    /**
     * Opened state indicator
     *
     * @type {Boolean}
     */
    isOpened = this.initiallyOpened;

    /**
     * @return {Object}
     */
    get cssClassesObject() {
      return { [css.active]: this.isOpened };
    }

    toggle() {
      this.isOpened = !this.isOpened;
    }

    open() {
      this.isOpened = true;
    }

    close() {
      this.isOpened = false;
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/variables';

  .BaseDropdown {
    position: relative;
    display: inline-block;
    text-align: center;

    min-width: 48px;

    cursor: pointer;

    @media (max-width: $minTablet) {
      min-width: 42px;
    }

    &:hover {
      &:after {
        height: 1px;
        transform: translateY(4px);
      }
    }

    &.js-active {
      &:before {
        width: 100%;
      }
      &:after {
        height: 0;
      }
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 11px;
      right: 0;

      transition: width .3s ease-out;
      will-change: width;

      width: 0;
      height: 1px;
      box-shadow: inset 0 0 8px #5d6672;
      background-image: linear-gradient(to right, #506a8c 50%, #c95842 100%);

      z-index: 3;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 7px;
      right: 0;

      transition: height .3s ease-out, transform .3s ease-out;
      will-change: height, transform;

      width: 1px;
      height: 9px;
      background-image: linear-gradient(to right, #49546e 50%, #ba6946 100%);

      .js-white & {
        background: white;
      }

      @media (max-width: $minTablet) {
        top: 7.5px;
      }
    }

    &__inner {
      width: 100%;

      position: absolute;
      left: 0;
      top: calc(50% - 1px);
      padding-top: 10px;
      padding-bottom: 10px;
      opacity: 0;
      visibility: hidden;

      transition:
        box-shadow .4s ease-out,
        background-color .4s ease-out,
        opacity .4s ease-out,
        visibility 0s ease-out .4s;

      .BaseDropdown.js-active & {
        box-shadow: 0 4px 6px rgba(30, 75, 120, 0.2);
        background-color: #ffffff;
        opacity: 1;
        visibility: visible;

        transition:
          box-shadow .4s ease-out,
          background-color .4s ease-out,
          opacity .4s ease-out,
          visibility 0s ease-out 0s;
      }
    }

    &__item {
      display: inline-block;
      width: 100%;

      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;

      cursor: pointer;

      @media (max-width: $minTablet) {
        font-size: 13px;
      }

      &--current {
        position: relative;
        width: auto;

        z-index: 2;

        transition: all .4s ease;

        .BaseDropdown.js-active & {
          transform: translateY(-40px);
          opacity: 0;
        }

        .js-white & {

        }
      }
    }
  }
</style>
