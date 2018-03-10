<template lang="pug">
  section.BlockImageItems
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .BlockImageItems__inner
      template(v-if="!pictureMode")
        SectionImageListItem(
          v-for="(item, index) in items",
          :index="index",
          :key="item.id",
          :alias="item.alias",
          :label="item.label",
          :imageUrl="item.titleImage",
          :previewUrl="item.previewImage"
        )
      template(v-else)
        SectionImageListItem(
          v-for="(item, index) in items",
          :index="index",
          :key="index",
          :imageUrl="item"
        )
      RevealingOrnament.BlockImageItems__pattern(
        v-if="itemsQuantityIsOdd",
        icon="pattern_catalog"
      )
      img.BlockImageItems__logo(
        :src="`img/collections-logo.${webp_png}`",
        alt=""
      )
</template>

<script>
  import '../../assets/svg/dist/pattern_catalog';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import webpExtension from '../../mixins/webpExtension';
  import BaseReveal from '../ui/BaseReveal.vue';
  import SectionImageListItem from '../ui/BaseImageItem.vue';
  import RevealingOrnament from '../ui/RevealingOrnament.vue';

  @Component({
    props: {
      items: {
        type: Array,
        required: true
      },
      pictureMode: {
        type: Boolean,
        default: false
      }
    },
    components: {
      BaseReveal,
      SectionImageListItem,
      RevealingOrnament
    },
    mixins: [webpExtension]
  })
  export default class BlockImageItems extends Vue {
    /**
     * @return {Boolean}
     */
    get itemsQuantityIsOdd() {
      return Math.abs(this.items.length % 2) === 1;
    }

    /**
     * Animate section logo
     */
    revealSection() {
      TweenMax.to('.BlockImageItems__logo', 0.8, { opacity: 1 });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BlockImageItems {
    position: relative;
    z-index: 5;

    margin-bottom: 87px;

    @media (max-width: $minTablet) {
      margin-bottom: 49px;
    }

    &__inner {
      position: relative;

      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      @media (max-width: $minTablet) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    &__pattern {
      display: flex;
      justify-content: center;
      align-items: center;

      flex: 0 1 50%;

      opacity: 0;

      @media (max-width: $minTablet) {
        display: none;
      }
    }

    &__logo {
      position: absolute;

      top: 500px;
      left: 50%;

      transform: translateX(-50%);

      opacity: 0;

      @media (max-width: $minDesktop) {
        top: 300px;
      }

      @media (max-width: $minTablet) {
        display: none;
      }
    }
  }
</style>
