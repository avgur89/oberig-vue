<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionPreview
    BaseBreadcrumbs(
      :baseItemLabel="collections.label",
      :baseItemUrl="collections.route"
    )
    .page-view__inner(:class="$style.pageViewInner")
      SectionMain
      SectionList
      BlockFeedback(
        :data="pageData.feedbackBlock",
        hasBorder
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseBreadcrumbs from '../../ui/BaseBreadcrumbs.vue';
  import SectionPreview from './sections/SectionPreview.vue';
  import SectionMain from './sections/SectionMain.vue';
  import SectionList from './sections/SectionList.vue';
  import BlockFeedback from '../../blocks/BlockFeedback.vue';

  @Component({
    components: {
      BaseBreadcrumbs,
      SectionPreview,
      SectionMain,
      SectionList,
      BlockFeedback
    },
    computed: mapGetters(['pageData', 'menu'])
  })
  export default class Collection extends Vue {
    /**
     * @return {Object}
     */
    get collections() {
      const [{ route, label }] = this.menu.filter(item => item.name === 'collections');
      return { route, label };
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    position: relative;
  }

  .pageViewInner {
    position: relative;
    z-index: 3;

    padding-top: 80px;

    max-width: 1220px;

    margin: 0 auto;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 124px;
    }
  }
</style>
