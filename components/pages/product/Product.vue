<template lang="pug">
  main.page-view(:class="$style.pageView")
    BaseBreadcrumbs(
      :baseItemLabel="catalog.label",
      :baseItemUrl="catalog.url",
      :secondaryItemLabel="collection.label",
      :secondaryItemUrl="collection.url"
    )
    SectionMain
    SectionSlider
    SectionSymbol
    SectionModels
    SectionCombination
    SectionBanner
    SectionUnique
    SectionGuarantee
    SectionLinks
    BlockFeedback(:data="pageData.feedbackBlock")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import BaseBreadcrumbs from '../../ui/BaseBreadcrumbs.vue';
  import SectionMain from './sections/SectionMain.vue';
  import SectionSlider from './sections/SectionSlider.vue';
  import SectionSymbol from './sections/SectionSymbol.vue';
  import SectionModels from './sections/SectionModels.vue';
  import SectionCombination from './sections/SectionCombination.vue';
  import SectionBanner from './sections/SectionBanner.vue';
  import SectionUnique from './sections/SectionUnique.vue';
  import SectionGuarantee from './sections/SectionGuarantee.vue';
  import SectionLinks from './sections/SectionLinks.vue';
  import BlockFeedback from '../../blocks/BlockFeedback.vue';

  @Component({
    components: {
      BaseBreadcrumbs,
      SectionMain,
      SectionSlider,
      SectionSymbol,
      SectionModels,
      SectionCombination,
      SectionBanner,
      SectionUnique,
      SectionGuarantee,
      SectionLinks,
      BlockFeedback
    },
    computed: mapGetters(['pageData', 'm'])
  })
  export default class Product extends Vue {
    /**
     * @return {Object}
     */
    get catalog() {
      return {
        url: generateUrl(this.$route.params.lang, 'catalog'),
        label: this.pageData.breadLabel
      };
    }

    /**
     * @return {Object}
     */
    get collection() {
      return {
        url: generateUrl(this.$route.params.lang, `collection/${this.m.collection.alias}`),
        label: this.m.collection.label
      };
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    position: relative;
    padding-top: 80px;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 48px;
    }
  }
</style>
