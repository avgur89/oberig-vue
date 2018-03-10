<template lang="pug">
  .SectionRelated
    .SectionRelated__close(@click="closeRelated")
      BaseSvgIcon.SectionRelated__close-svg(
        icon="cross_icon",
        width="15",
        height="15",
        :fill="false"
      )
    .SectionRelated__title {{ p.addPopupLabel }}
    .SectionRelated__subtitle {{ p.addPopupDescription }}
    .SectionRelated__inner(ref="SectionRelatedInnerRef")
      BaseProduct.SectionRelated__item(
        v-for="item in cartRelatedProducts",
        :key="item.id",
        :alias="item.alias",
        :code="item.code",
        :type="item.type",
        :id="item.id",
        :imageUrl="item.titleImageSrc || item.titleImage",
        :onAddAction="addToSelected",
        :onRemoveAction="removeFromSelected",
        mode="add"
      )
      .SectionRelated__item-dummy
      .SectionRelated__item-dummy
      .SectionRelated__item-dummy
      .SectionRelated__item-dummy
    .SectionRelated__apply(
      @click.once="applySelected",
      v-if="selected.length > 0"
    )
      ButtonRainbowGradient(
        :text="p.applyLabel",
        isStatic
      )
    nuxt-link.SectionRelated__catalog(:to="catalogLink")
      span.SectionRelated__catalog-text {{ p.addPopupLinkLabel }}
      BaseSvgIcon.SectionRelated__catalog-arrow(
        icon="arrow_slider_right",
        width="31",
        height="11"
      )
</template>

<script>
  import '../../../../assets/svg/dist/cross_icon';
  import '../../../../assets/svg/dist/arrow_slider_right';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import Scrollbar from 'smooth-scrollbar';
  import bus from '../../../../plugins/event-bus';
  import { HIDE_RELATED } from '../../../../modules/_events';
  import { generateUrl } from '../../../../modules/_helpers';
  import BaseProduct from '../../../ui/BaseProduct.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';

  @Component({
    components: {
      BaseProduct,
      ButtonRainbowGradient,
      BaseSvgIcon
    },
    computed: mapGetters(['cartRelatedProducts', 'p']),
    methods: mapActions(['addToCart'])
  })
  export default class SectionRelated extends Vue {
    /**
     * Selected related items
     *
     * @type {Array}
     */
    selected = [];

    /**
     * @return {String}
     */
    get catalogLink() {
      return generateUrl(this.$route.params.lang, 'catalog');
    }


    mounted() {
      Scrollbar.init(this.$refs.SectionRelatedInnerRef);
    }

    destroyed() {
      Scrollbar.destroy(this.$refs.SectionRelatedInnerRef);
    }

    /**
     * Run filters close animation
     */
    closeRelated() {
      bus.$emit(HIDE_RELATED);
    }

    /**
     * Add selected products to cart
     */
    applySelected() {
      this.addToCart(this.selected);

      bus.$emit(HIDE_RELATED);
    }

    /**
     * Add product to selected item (will be applied after button click)
     *
     * @param {Object} product
     */
    addToSelected(product) {
      this.selected.push(product);
    }

    /**
     * Remove product from selected items
     *
     * @param {Object} product
     */
    removeFromSelected(product) {
      this.selected = this.selected.filter(item => item.id !== product.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .page-view .SectionRelated {
    position: relative;

    margin-bottom: 60px;
    margin-top: 19px;
    padding: 56px 28px 45px 28px;

    box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);
    background-color: #ffffff;

    @media (max-width: $minDesktop) {
      padding: 46px 23px 50px 17px;

      margin-top: 34px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      margin-left: -14px;

      padding: 55px 0 50px 0;

      box-shadow: none;
    }

    &__title {
      font-family: $MinionProRegular;
      font-size: 18px;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 2.7px;
      margin-bottom: 22px;

      padding-left: 32px;

      @include gradient-text(false);

      @media (max-width: $minTablet) {
        text-align: center;
        font-size: 13px;
        padding-left: 15px;
        padding-right: 15px;
        margin-bottom: 13px;

        line-height: 22px;
        text-transform: uppercase;
        letter-spacing: 1.95px;
      }
    }

    &__subtitle {
      max-width: 625px;
      color: #444344;
      font-family: $Calibri;
      font-size: 16px;
      line-height: 26px;

      padding-left: 32px;

      @media (max-width: $minTablet) {
        text-align: center;
        padding-left: 25px;
        padding-right: 25px;
      }
    }

    &__inner {
      margin-top: 35px;
      margin-bottom: 35px;
      min-height: 245px;
      padding-left: 32px;
      max-height: 434px;
      padding-bottom: 15px;

      overflow: hidden;

      @media (max-width: $minDesktop) {
        margin-bottom: 19px;
        padding-bottom: 30px;
        max-height: 366px;
        min-height: 214px;
      }

      @media (max-width: $minTablet) {
        justify-content: center;
        margin-bottom: 30px;
        margin-top: 32px;
        max-height: 414px;
        padding-left: 25px;
        padding-right: 25px;
      }
    }

    &__close {
      position: absolute;

      right: 28px;
      top: 58px;

      cursor: pointer;

      transition: transform .7s ease;
      transform-origin: center center;

      @media (min-width: $desktop) {
        &:hover {
          transform: rotate(180deg) translateY(-3px);
        }
      }

      @media (max-width: $minTablet) {
        right: 20px;
        top: 18px;
      }

      &-svg {
        color: transparent;
        fill: #736d7b;
      }
    }

    &__item {
      width: 192px;
      height: 170px;
      margin-right: 30px !important;

      @media (max-width: $minDesktop) {
        width: 180px;
        height: 159px;
        margin-bottom: 25px;
        margin-right: 21px !important;
      }

      @media (max-width: $minTablet) {
        width: 125px;
        height: 118px;
        margin-right: 0 !important;
        margin-bottom: 20px;

        &:nth-child(even) {
          margin-left: 20px !important;
        }
      }

      &-dummy {
        height: 0;
        width: 192px;
        margin-right: 30px;

        @media (max-width: $minDesktop) {
          width: 180px;
          margin-right: 21px;
        }

        @media (max-width: $minTablet) {
          width: 125px;
          margin-right: 0;

          &:nth-child(even) {
            margin-left: 20px;
          }
        }
      }
    }

    &__apply {
      display: inline-block;
      margin-left: 32px;
      margin-right: 50px;

      @media (max-width: $minTablet) {
        margin: 0 0 42px 0;
        display: block;
        text-align: center;
      }

      + .SectionRelated__catalog {
        margin-left: 0;
      }
    }

    &__catalog {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      text-decoration: none;
      margin-left: 32px;

      @media (max-width: $minTablet) {
        display: block;
        text-align: center;
        margin: 0;
      }

      &-text {
        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        @include gradient-text();
      }
      &-arrow {
        margin-left: 14px;
        color: #50556b;
        margin-top: 2px;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .page-view .SectionRelated {
    .scroll-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: $minTablet) {
        justify-content: center;
      }
    }

    .scrollbar-track-y {
      width: 2px;
      background-color: #e1e0e4;
      opacity: 1;

      @media (max-width: $minTablet) {
        right: 13px;
      }
    }

    .scrollbar-thumb {
      width: 2px;
      background-color: #c4b4d2;
    }

    &__item {
      .BaseProduct__image {
        max-width: 75%;
        max-height: 75%;

        @media (max-width: $minTablet) {
          &-wrapper {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
