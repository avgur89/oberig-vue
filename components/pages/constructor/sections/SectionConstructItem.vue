<template lang="pug">
  .SectionConstructItem(
    :class="cssClassesObj",
    @click="toggleItem(data)"
  )
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealItem"
    )
    template(v-if="!empty")
      .SectionConstructItem__image-wrapper
        img.SectionConstructItem__image(:src="imageUrl", alt="")
        BaseSvgIcon.SectionConstructItem__svg(
          icon="ok-icon",
          width="111",
          height="87"
        )
      .SectionConstructItem__title {{ title }}
    template(v-else)
      .SectionConstructItem__image-wrapper
        .SectionConstructItem__title {{ title }}
        BaseSvgIcon.SectionConstructItem__svg(
          icon="ok-icon",
          width="111",
          height="87"
        )
</template>

<script>
  import '../../../../assets/svg/dist/ok-icon';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import { css } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  @Component({
    components: { BaseReveal, BaseSvgIcon },
    props: {
      title: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: false
      },
      empty: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        required: true
      },
      isSymbols: {
        type: Boolean,
        required: false
      }
    },
    computed: mapGetters(['constructorSelected']),
    methods: mapActions(['addConstructorItem', 'removeConstructorItem'])
  })
  export default class SectionProductsItem extends Vue {
    /**
     * @type {Boolean}
     */
    get isSelected() {
      const { constructorSelected, data } = this;

      return constructorSelected && constructorSelected.some(({ category, id }) => (
        category === data.category && id === data.id
      ));
    }

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.single]: this.empty,
        [css.active]: this.isSelected,
        [css.smaller]: this.isSymbols,
      };
    }

    /**
     * Add/remove item from selected
     *
     * @param {Object} item
     */
    toggleItem(item) {
      this.isSelected ? this.removeConstructorItem(item) : this.addConstructorItem(item);
    }

    /**
     * Reveal products item
     */
    revealItem() {
      TweenMax.fromTo(
        this.$el,
        0.9,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: Power1.easeOut }
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionConstructItem {
    flex: 0 0 208px;

    margin-bottom: 53px;

    cursor: pointer;
    opacity: 0;

    @media (max-width: $minTablet) {
      flex: 0 1 calc(50% - 15px);
    }

    &.js-single {
      @media (min-width: $desktop) {
        &:hover {
          .SectionConstructItem {
            &__title {
              opacity: 0.1;
            }
          }
        }
      }

      &.js-active {
        .SectionConstructItem {
          &__title {
            opacity: 0.1;
          }
        }
      }

      @media (max-width: $minTablet) {
        height: 130px;
      }

      .SectionConstructItem__image-wrapper {
        text-align: center;

        background-color: transparent;
      }
    }

    &.js-smaller {
      .SectionConstructItem__image {
        max-width: 100px;
        max-height: 100px;
      }
    }

    &:not(.js-single) {
      .SectionConstructItem__image-wrapper {
        margin-bottom: 32px;

        background-color: #ffffff;

        @media (max-width: $minTablet) {
          margin-bottom: 24px;
        }
      }
    }

    &.js-active {
      .SectionConstructItem {
        &__image-wrapper {
          box-shadow: none;
          border-radius: 50%;
          background-color: #ffffff;
        }
        &__svg {
          opacity: 1;
        }
        &__image {
          opacity: 0.1;
        }
      }
    }

    @media (min-width: $desktop) {
      &:hover {
        .SectionConstructItem {
          &__image-wrapper {
            box-shadow: none;
            border-radius: 50%;
            background-color: white;
          }
          &__image {
            opacity: 0.1;
          }
        }
      }
    }

    &__svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);

      z-index: 3;

      opacity: 0;

      transition: opacity .6s ease;
    }

    &__title {
      @include gradient-text(false);

      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      text-transform: uppercase;
      letter-spacing: 2.8px;

      text-align: center;

      color: #736d7b;

      transition: opacity .6s ease;
    }

    &__image-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      max-width: 208px;
      width: 100%;
      height: 208px;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);

      transition: box-shadow 0.6s ease, border-radius 0.5s ease-out, background .6s ease;

      @media (max-width: $minTablet) {
        margin-left: auto;
        margin-right: auto;

        max-width: 130px;
        height: 130px;
      }
    }

    &__image {
      max-width: 140px;
      max-height: 140px;

      transition: opacity .6s ease;

      @media (max-width: $minTablet) {
        max-width: 80px;
        max-height: 80px;
      }
    }
  }
</style>
