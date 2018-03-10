<template lang="pug">
  .BaseCheckbox__group
    input.BaseCheckbox__checkbox(
      :id="id",
      :value="value",
      :checked="isChecked",
      :name="name",
      :type="type",
      @click="onClickAction"
    )
    label.BaseCheckbox__hidden-label(:for="id")
    label.BaseCheckbox__label(:for="id") {{ label }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';

  @Component({
    props: {
      id: {
        type: [Number, String],
        required: true
      },
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      },
      isChecked: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: () => 'checkbox'
      },
      name: {
        type: String,
        default: () => this.label
      },
      action: {
        type: Function,
        required: false
      },
      actionArgs: {
        type: Array,
        required: false
      }
    }
  })
  export default class BaseCheckbox extends Vue {
    /**
     * Input onclick listener
     */
    onClickAction() {
      if (typeof this.action === 'function') this.action(...this.actionArgs);
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BaseCheckbox {
    &__group {
      position: relative;

      flex: 0 1 auto;
      height: 32px;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      margin-right: 33px;

      &:last-child {
        margin-right: 0;
        margin-bottom: 0;
      }

      @media (max-width: $minTablet) {
        margin-right: 0;
        margin-bottom: 30px;
      }
    }

    &__checkbox {
      visibility: hidden;

      &:checked + .BaseCheckbox__hidden-label:after{
        opacity: 1;
        transform: scale(1) translate(-50%, -50%);
      }
    }

    &__label {
      @include gradient-text(false);

      margin-left: 28px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
      cursor: pointer;
    }

    &__hidden-label {
      position: absolute;
      left: 0;
      top: 0;

      height: 32px;
      width: 32px;
      border-radius: 100%;

      box-shadow: 0 9px 16px rgba(30, 75, 120, 0.2);
      background-color: #ffffff;

      cursor: pointer;

      &:after {
        content: "";
        position: absolute;
        display: block;
        top: 16px;
        left: 16px;

        width: 10px;
        height: 10px;
        border-radius: 50%;

        background-color: #ffffff;
        background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

        transform: scale(0.8) translate(-50%, -50%);
        transform-origin: left top;
        opacity: 0;

        transition: transform 0.4s ease, opacity .4s ease;
      }
    }
  }
</style>
