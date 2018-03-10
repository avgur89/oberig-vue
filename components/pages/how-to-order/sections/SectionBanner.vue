<template lang="pug">
  section.SectionBanner
    img.SectionBanner__img(:src="p.bannerImage", alt="", v-parallax="0.2")
    .SectionBanner__cnt
      h2.SectionBanner__title {{ p.bannerTitle }}
      .SectionBanner__desc(v-html="p.bannerDescription")
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
  @import "../../../../assets/scss/mixins";

  .SectionBanner {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: calc(100% + 80px);
    height: 487px;

    margin-left: -40px;
    margin-bottom: 127px;

    overflow: hidden;

    @media (max-width: $minTablet) {
      height: 445px;
      margin-bottom: 91px;
    }

    &__img {
      position: absolute;
      left: 0;
      top: -200px;
      width: 100%;
      min-height: 160%;

      z-index: 1;

      @include object-fit(cover);

      @media (min-width: $largeDesktop) {
        min-height: 180%;
        top: -210px;
      }
    }

    &:after {
      content: '';
      display: block;

      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background-color: #444344;
      background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);
      opacity: 0.35;
    }

    &__cnt {
      max-width: 542px;
      width: 100%;

      text-align: center;

      z-index: 1;

      @media (max-width: $minTablet) {
        padding: 0 14px;
      }
    }

    &__title {
      margin-bottom: 40px;

      font-family: $MinionProDisp;
      font-size: 50px;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;

      color: #fff;

      @media (max-width: $minTablet) {
        margin-bottom: 21px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #fff;
    }

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
      margin-left: -14px;
    }
  }
</style>
