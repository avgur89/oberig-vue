<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    BlockImageItems(
      :items="pageData.collections"
    )
    SectionSlider
    BlockCollections(
      :image="p.bannerImage",
      :text="p.bannerText",
      :url="bannerUrl",
      :initiallyHidden="true"
    )
    BlockFeedback(
      :class="$style.feedbackBlock",
      :data="pageData.feedbackBlock",
      hasBorder
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import SectionMain from './sections/SectionMain.vue';
  import BlockImageItems from '../../blocks/BlockImageItems.vue';
  import SectionSlider from './sections/SectionSlider.vue';
  import BlockCollections from '../../blocks/BlockCollections.vue';
  import BlockFeedback from '../../blocks/BlockFeedback.vue';

  @Component({
    components: {
      SectionMain,
      BlockImageItems,
      SectionSlider,
      BlockCollections,
      BlockFeedback
    },
    computed: mapGetters(['pageData', 'p'])
  })
  export default class Collections extends Vue {
    /**
     * @return {String}
     */
    get bannerUrl() {
      return generateUrl(this.$route.params.lang, 'catalog');
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    position: relative;
    padding-top: 80px;

    z-index: 3;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 48px;
    }
  }

  .feedbackBlock {
    margin-top: 60px;
  }
</style>
