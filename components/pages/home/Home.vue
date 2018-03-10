<template lang="pug">
  main.page-view
    SectionMain
    SectionAnimation(v-if='!animationIsFinished')
    SectionSymbols
    SectionStages(:initiallyHidden="true")
    SectionSoulOfBrand(:initiallyHidden="true")
    BlockCollections#SectionCollections(
      :image="p.collectionsBgImage",
      :text="p.collectionsLabel",
      :url="collectionsUrl",
      :initiallyHidden="true"
    )
    SectionInstagram(:initiallyHidden="true")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import bus from '../../../plugins/event-bus';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import { PRELOADER_FINISHED } from '../../../modules/_events';
  import ScrollController from '../../../modules/ScrollController';
  import SectionMain from './sections/SectionMain.vue';
  import SectionAnimation from './sections/SectionAnimation.vue';
  import SectionSymbols from './sections/SectionSymbols.vue';
  import SectionStages from './sections/SectionStages.vue';
  import SectionSoulOfBrand from './sections/SectionSoulOfBrand.vue';
  import BlockCollections from '../../blocks/BlockCollections.vue';
  import SectionBoutiques from './sections/SectionBoutiques.vue';
  import SectionInstagram from './sections/SectionInstagram.vue';

  @Component({
    components: {
      SectionMain,
      SectionAnimation,
      SectionSymbols,
      SectionStages,
      SectionSoulOfBrand,
      BlockCollections,
      SectionBoutiques,
      SectionInstagram
    },
    computed: mapGetters(['p', 'preloaderIsFinished', 'animationIsFinished'])
  })
  export default class Home extends Vue {
    /**
     * @return {String}
     */
    get collectionsUrl() {
      return generateUrl(this.$route.params.lang, 'collections');
    }

    mounted() {
      const { animationIsFinished, preloaderIsFinished } = this;

      if (animationIsFinished) return ScrollController.initBtn();

      preloaderIsFinished
        ? ScrollController.initialization()
        : bus.$on(PRELOADER_FINISHED, ScrollController.initialization);
    }

    destroyed() {
      ScrollController.initialization(true);

      bus.$off(PRELOADER_FINISHED, ScrollController.initialization);
    }
  }
</script>
