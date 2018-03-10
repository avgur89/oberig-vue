<template lang="pug">
  section.SectionCreation
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealTitle"
    )
    h2.SectionCreation__title {{ p.creationTitle }}
    .SectionCreation__list
      SectionCreationItem(
        v-for="index in 7",
        :key="index",
        :title="p[`creationStageLabel${index}`]",
        :desc="p[`creationStageDescription${index}`]",
        :imgUrl="p[`creationStageImage${index}`]",
        :reverse="(index % 2) === 0"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import SectionCreationItem from './SectionCreationItem.vue';

  @Component({
    components: { BaseReveal, SectionCreationItem },
    computed: mapGetters(['p'])
  })
  export default class SectionCreation extends Vue {
    /**
     * Reveal creation section
     */
    revealTitle() {
      TweenMax.fromTo('.SectionCreation__title', 1,
        { opacity: 0 },
        { opacity: 1, ease: Power1.easeOut },
        0
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionCreation {
    position: relative;

    margin-bottom: 128px;

    @media (max-width: $minDesktop) {
      margin-bottom: 125px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 92px;
    }

    &__title {
      @include gradient-text(false);

      max-width: 470px;
      width: 100%;

      margin: 0 auto 49px auto;
      text-align: center;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 1.25px;

      color: #3f4144;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 67px;

        font-size: 35px;
        line-height: 50px;
        letter-spacing: 0.88px;
      }
    }
  }
</style>
