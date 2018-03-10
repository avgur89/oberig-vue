<template lang="pug">
  main.page-view
    SectionVideo(v-if="!philosophyVideoWasShown")
    .page-view__inner(:class="[$style.pageViewInner, translate]")
      SectionMain
      SectionTraditions
      SectionEmptyBanner
      SectionHistory
      SectionBanner
      SectionCreation
      SectionCombination
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import SectionVideo from './sections/SectionVideo';
  import SectionMain from './sections/SectionMain.vue';
  import SectionTraditions from './sections/SectionTraditions.vue';
  import SectionEmptyBanner from './sections/SectionEmptyBanner.vue';
  import SectionHistory from './sections/SectionHistory.vue';
  import SectionBanner from './sections/SectionBanner.vue';
  import SectionCreation from './sections/SectionCreation.vue';
  import SectionCombination from './sections/SectionCombination.vue';

  @Component({
    components: {
      SectionVideo,
      SectionMain,
      SectionTraditions,
      SectionEmptyBanner,
      SectionHistory,
      SectionBanner,
      SectionCreation,
      SectionCombination
    },
    computed: mapGetters(['philosophyVideoWasShown'])
  })
  export default class Philosophy extends Vue {
    /**
     * @return {Object}
     */
    get translate() {
      return {
        [this.$style.pageViewInnerTranslate]: !this.philosophyVideoWasShown
      };
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageViewInner {
    position: relative;
    z-index: 2;
    padding-top: 76px;

    @media (max-width: $minDesktop) {
      padding-top: 128px;
    }

    @media (max-width: $minTablet) {
      padding-top: 87px;
    }
  }

  .pageViewInnerTranslate {
    transform: translate3d(0, 100vh, 0);
  }
</style>
