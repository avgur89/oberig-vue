<template lang="pug">
  section.SectionBanner(:style="{ 'background-image': `url(${p.bannerImage})` }")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';

  @Component({
    computed: mapGetters(['p'])
  })
  export default class SectionBanner extends Vue {}
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .SectionBanner {
    position: relative;

    width: calc(100% + 80px);
    height: 400px;

    margin-left: -40px;
    margin-bottom: 50px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);

      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);

      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      height: 200px;

      margin-left: -14px;
    }
  }
</style>
