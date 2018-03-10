<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__cnt
      h1.SectionMain__title {{ p.title }}
      p.SectionMain__desc(v-html="p.descriptionMain")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['p'])
  })
  export default class SectionMain extends Vue {
    /**
     * Animate main screen.
     */
    revealSection() {
      TweenMax.to(this.$el, 1, { opacity: 1, ease: Power1.easeOut });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    margin-bottom: 50px;
    margin-top: 106px;
    padding-left: 40px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-top: 94px;
      margin-bottom: 49px;
      padding-left: 0;
    }

    @media (max-width: $minTablet) {
      margin-top: 43px;
      margin-bottom: 45px;
    }

    &__cnt {
      max-width: 468px;
      width: 100%;

      @media (max-width: $minTablet) {
        text-align: center;
        margin: 0 auto;
      }
    }

    &__title {
      margin-bottom: 32px;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      letter-spacing: 1.25px;

      color: #736d7b;

      text-transform: uppercase;

      @media (max-width: $minTablet) {
        margin-bottom: 20px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;
      }
    }

    &__desc {
      margin-bottom: 34px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }
  }
</style>
