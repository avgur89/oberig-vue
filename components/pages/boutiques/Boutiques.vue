<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    SectionCities
    SectionBanner
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import SectionMain from './sections/SectionMain.vue';
  import SectionCities from './sections/SectionCities.vue';
  import SectionBanner from './sections/SectionBanner.vue';

  @Component({
    components: {
      SectionMain,
      SectionCities,
      SectionBanner
    },
    computed: mapGetters(['pageData'])
  })
  export default class Boutiques extends Vue {}
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 80px;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 48px;
    }
  }
</style>
