<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    SectionProducts
    SectionBanner
    SectionPersonalManager
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import SectionMain from './sections/SectionMain.vue';
  import SectionProducts from './sections/SectionProducts.vue';
  import SectionBanner from './sections/SectionBanner.vue';
  import SectionPersonalManager from './sections/SectionPersonalManager.vue';

  @Component({
    components: {
      SectionMain,
      SectionProducts,
      SectionBanner,
      SectionPersonalManager
    }
  })
  export default class Personal extends Vue {}
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 80px;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 124px;
    }
  }
</style>
