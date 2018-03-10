<template lang="pug">
  section.SectionWishlist
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-100",
      :action="revealSection"
    )
    .SectionWishlist__list
      .SectionWishlist__item(v-if="hasMeaning")
        .SectionWishlist__title {{ meaningTitle }}
        .SectionWishlist__desc {{ meaningDesc }}
        .SectionWishlist__textarea-wrapper
          textarea(
            :class="[cssClassesObject, cssDefaultClass]",
            :placeholder="meaningPlaceholder",
            name="meaning",
            @focus="toggleClass",
            @blur="toggleClass"
          )
          span.focus-border
          span.border
      .SectionWishlist__item
        .SectionWishlist__title {{ wishTitle }}
        .SectionWishlist__desc {{ wishDesc }}
        .SectionWishlist__textarea-wrapper
          textarea(
            :class="[cssClassesObject, cssDefaultClass]",
            :placeholder="wishPlaceholder",
            name="wish",
            @focus="toggleClass",
            @blur="toggleClass"
          )
          span.focus-border
          span.border
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import autosize from 'autosize';
  import { mapGetters } from 'vuex';
  import { css } from '../../modules/_helpers';
  import BaseReveal from '../ui/BaseReveal.vue';

  @Component({
    props: {
      initiallyActive: {
        type: Boolean,
        default: false
      },
      defaultClass: {
        type: String,
        default: 'SectionWishlist__textarea'
      },
      wishTitle: {
        type: String,
        required: true
      },
      wishDesc: {
        type: String,
        required: true
      },
      wishPlaceholder: {
        type: String,
        required: true
      },
      hasMeaning: {
        type: Boolean,
        default: false
      },
      meaningTitle: {
        type: String,
        required: false
      },
      meaningDesc: {
        type: String,
        required: false
      },
      meaningPlaceholder: {
        type: String,
        required: false
      }
    },
    components: { BaseReveal },
    computed: mapGetters(['pageData', 'p'])
  })
  export default class SectionWishlist extends Vue {
    /**
     * Active state indicator
     *
     * @type {Boolean}
     */
    isActive = this.initiallyActive;

    /**
     * @return {Object}
     */
    get cssClassesObject() {
      return { [css.active]: this.isActive };
    }

    /**
     * @return {String}
     */
    get cssDefaultClass() {
      return this.defaultClass;
    }

    mounted() {
      this.autosizeTextarea();
    }

    /**
     * Toggle active state (wtf?)
     */
    toggleClass() {
      this.isActive = !this.isActive;
    }

    /**
     * Activate textarea's autosize
     */
    autosizeTextarea() {
      autosize(this.$el.querySelectorAll('textarea'));
    }

    /**
     * Animate wishlist screen.
     */
    revealSection() {
      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title, description, textarea
        .staggerFromTo([
          '.SectionWishlist__title',
          '.SectionWishlist__desc',
          '.SectionWishlist__textarea-wrapper'
        ], 0.75,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0 },
          0.15,
          0
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .SectionWishlist {
    position: relative;
    margin: 0 40px 122px 40px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-left: 0;
      margin-right: 0;
      margin-bottom: 86px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 98px;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      @media (max-width: $minDesktop) {
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    &__item {
      position: relative;

      flex: 1 1 50%;
      margin-right: 40px;

      &:last-child {
        margin-right: 0;
      }

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;
        width: 100%;

        margin-right: 0;
        margin-bottom: 54px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      @media (max-width: $minTablet) {
        margin-bottom: 55px;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 23px;

      font-family: $MinionProDisp;
      font-size: 18px;
      font-weight: 400;
      line-height: 31px;
      text-transform: uppercase;
      letter-spacing: 2.7px;

      color: #3f4144;

      @media (max-width: $minTablet) {
        margin-bottom: 14px;

        font-size: 13px;
        line-height: 22px;
        letter-spacing: 1.95px;
      }
    }

    &__desc {
      margin-bottom: 43px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      @media (max-width: $minDesktop) {
        margin-bottom: 46px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 22px;
      }
    }

    &__textarea {
      @include placeholder {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      width: 100%;
      height: 38px;

      resize: none;
      outline: none;

      border: none;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
      background-color: transparent;

      &-wrapper {
        position: relative;
      }

      & ~ .border {
        position: absolute;

        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);

        transition: 1s;
      }

      & ~ .focus-border {
        position: absolute;

        bottom: 0;
        left: 50%;

        width: 0;
        height: 1px;

        background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

        transition: 0.6s;
      }

      &:focus {
        &.js-active {
          & ~ .border {
            opacity: 0;
            transition: 0.4s;
          }
          & ~ .focus-border {
            left: 0;
            width: 100%;

            transition: 0.4s;
          }
        }
      }
    }
  }
</style>
