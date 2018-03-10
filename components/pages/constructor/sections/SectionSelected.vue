<template lang="pug">
  section.SectionSelected
    .SectionSelected__title {{ title }}
    .SectionSelected__inner
      template(v-for="item in items")
        .SectionSelected__item(
          :key="item.id",
          v-if="typeof item.id === 'string'",
          @click="removeConstructorItem(item)"
        )
          .gradient-text {{ item.categoryName }} - {{ item.label }}
          .SectionSelected__item-x
            span
            span
        .SectionSelected__item(
          :key="item.id",
          v-else,
          @click="removeConstructorItem(item)"
        )
          .gradient-text {{ item.label }}
          .SectionSelected__item-x
            span
            span
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapActions } from 'vuex';

  @Component({
    props: {
      title: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      }
    },
    methods: mapActions(['removeConstructorItem'])
  })
  export default class SectionSelected extends Vue {}
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSelected {
    margin-bottom: 121px;
    float: left;
    width: 100%;
    margin-top: 13px;
    padding-left: 40px;

    @media (max-width: $minDesktop) {
      margin-top: 48px;
      padding-left: 0;
    }

    @media (max-width: $minTablet) {
      margin-top: 0;
      margin-bottom: 56px;
    }

    &__item {
      position: relative;
      display: inline-block;
      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 30px;
      text-transform: uppercase;
      letter-spacing: 2.8px;

      cursor: pointer;

      padding-right: 20px;

      &:not(:last-child) {
        margin-right: 40px;
      }

      &-x {
        position: absolute;

        right: 0;
        top: 9px;

        transform: rotate(45deg);

        transition: transform .5s ease;

        span {
          position: absolute;
          display: inline-block;
          width: 1px;
          height: 15px;

          background: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

          &:first-child {
            transform: rotate(90deg);
          }

          &:last-child {
            left: -0.2px;
          }
        }
      }

      @media (min-width: $desktop) {
        &:hover {
          .SectionSelected__item-x {
            transform: rotate(45deg) scale(1.3) translate3d(0px, -1.5px, 0);
          }
          .gradient-text {
            background-position: left 0;
          }
        }
      }
    }

    &__title {
      font-family: $MinionProRegular;
      font-size: 18px;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 2.7px;

      margin-bottom: 24px;

      @include gradient-text(false);

      @media (max-width: $minDesktop) {
        font-size: 14px;
        line-height: initial;
        margin-bottom: 14px;
      }
    }

    &__inner {
      max-height: 155px;

      @media (max-width: $minTablet) {
        max-height: none;
      }
    }
  }
</style>
