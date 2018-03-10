<template lang="pug">
  section.SectionProducts
    .SectionProducts__list
      SectionProductsItem(
        v-for="(item, index) in m.products",
        :key="index",
        :price="item.price",
        :desc="item.description",
        :title="item.product.code",
        :type="item.product.type",
        :imgUrl="item.product.titleImageSrc",
        :collection="item.product.collection",
        :metals="item.product.metals",
        :stones="item.product.stones"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import SectionProductsItem from './SectionProductsItem.vue';

  @Component({
    components: { SectionProductsItem },
    computed: mapGetters(['m'])
  })
  export default class SectionProducts extends Vue {}
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionProducts {
    position: relative;

    margin-bottom: 140px;

    @media (max-width: $minDesktop) {
      margin-bottom: 133px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 93px;
    }
  }
</style>
