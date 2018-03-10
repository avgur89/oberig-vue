<template lang="pug">
  article.SectionProductsItem
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-200",
      :action="revealItem"
    )
    .SectionProductsItem__image-wrapper(ref="SectionProductsItemImageRef")
      img.SectionProductsItem__image(
        :src="imgUrl",
        alt=""
      )
    .SectionProductsItem__cnt
      h3.SectionProductsItem__title(ref="SectionProductsItemTitleRef") {{ type }} {{ title }}
      .SectionProductsItem__desc(ref="SectionProductsItemDescRef", v-html="desc")
      .SectionProductsItem__collections(ref="SectionProductsItemCollectionsRef")
        .SectionProductsItem__collections-title {{ t.collection }}:
        p.SectionProductsItem__collections-desc {{ collection }}
      .SectionProductsItem__materials(ref="SectionProductsItemMaterialsRef")
        .SectionProductsItem__materials-title {{ t.materials }}:
        p.SectionProductsItem__materials-desc(
          v-for="(metal, index) in metals",
          :key="index"
        ) {{ metal.label }} - {{ metal.amount }} {{ t.g }}
        p.SectionProductsItem__materials-desc(
          v-for="(stone, index) in stones",
          :key="index"
        ) {{ stone.label }} - {{ stone.amount }} {{ t.ct }}
      .SectionProductsItem__price(ref="SectionProductsItemPriceRef") {{ t.price }}: {{ price }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    props: {
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      imgUrl: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: false
      },
      collection: {
        type: String,
        required: true
      },
      price: {
        type: [String, Number],
        required: true
      },
      metals: {
        type: Array,
        required: false
      },
      stones: {
        type: Array,
        required: false
      }
    },
    computed: mapGetters(['t'])
  })
  export default class SectionProductsItem extends Vue {
    /**
     * Reveal product item
     */
    revealItem() {
      const {
        SectionProductsItemImageRef,
        SectionProductsItemTitleRef,
        SectionProductsItemDescRef,
        SectionProductsItemCollectionsRef,
        SectionProductsItemMaterialsRef,
        SectionProductsItemPriceRef
      } = this.$refs;

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // image
        .fromTo(SectionProductsItemImageRef, 0.8,
          { opacity: 0, y: 50, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, ease: Power1.easeOut },
          0
        )
        // info
        .staggerFromTo([
          SectionProductsItemTitleRef,
          SectionProductsItemDescRef,
          SectionProductsItemCollectionsRef,
          SectionProductsItemMaterialsRef,
          SectionProductsItemPriceRef
        ],
          0.5,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.2,
          0
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionProductsItem {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    padding: 60px 95px 60px 122px;

    border-bottom: 1px solid #e1e0e4;

    opacity: 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;

      border-bottom: none;
    }

    @media (max-width: $minDesktop) {
      flex-direction: column;
      align-items: center;
      text-align: center;

      padding: 60px 80px 53px 80px;
    }

    @media (max-width: $minTablet) {
      padding: 60px 0 53px 0;
    }

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      flex: 0 0 380px;
      height: 375px;

      margin-right: 118px;

      background-color: white;
      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        max-width: 380px;
        width: 100%;

        margin-right: 0;
        margin-bottom: 31px;
      }

      @media (max-width: $minTablet) {
        max-width: 290px;
        height: 286px;
      }
    }

    &__image {
      max-width: 320px;
      max-height: 320px;

      @media (max-width: $minTablet) {
        max-width: 200px;
        max-height: 200px;
      }
    }

    &__cnt {
      flex: 1 1 auto;
      width: 100%;
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 19px;

      font-family: $MinionProDisp;
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 1.5px;

      color: #4d4d4d;

      text-transform: uppercase;

      @media (max-width: $minDesktop) {
        margin-bottom: 27px;
      }

      @media (max-width: $minTablet) {
        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__desc {
      margin-bottom: 27px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__collections {
      margin-bottom: 24px;

      &-title {
        margin-bottom: 6px;

        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      &-desc {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;

        color: #444344;
      }
    }

    &__materials {
      margin-bottom: 24px;

      &-title {
        margin-bottom: 6px;

        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #a5a5a5;
      }

      &-desc {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;

        color: #444344;
      }
    }

    &__price {
      @include gradient-text(false);

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;

      color: #4d4d4d;

      @media (max-width: $minTablet) {
        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }
  }
</style>
