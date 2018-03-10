<template lang="pug">
  section.SectionTabs
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    TabsItem(
      :tabs="pageData.productCategories",
      :tabTitle="p.sizeSelectingTitle",
      iconName="size_icon",
      iconWidth="20",
      iconHeight="8",
      label="#TabsProductCategory",
      scrollTarget="#TabsProductCategory",
      ref="TabsProductCategory"
    )
    TabsItem(
      :tabs="pageData.stones",
      :tabTitle="p.stonesLabel",
      iconName="stones_icon",
      iconWidth="19",
      iconHeight="13",
      label="#TabsStonesCategory",
      scrollTarget="#TabsStonesCategory",
      ref="TabsStonesCategory"
    )
    TabsItem(
      :tabs="pageData.services",
      :tabTitle="p.guaranteeLabel",
      iconName="Symbol_Oberig",
      iconWidth="20",
      iconHeight="21",
      label="#TabsGuaranteeCategory",
      scrollTarget="#TabsGuaranteeCategory",
      ref="TabsGuaranteeCategory"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import Sticky from '../../../../assets/js/sticky-js';
  import { replace } from 'lodash';
  import bus from '../../../../plugins/event-bus';
  import { PRELOADER_FINISHED } from '../../../../modules/_events';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import TabsItem from './TabsItem.vue';
  import { Resp } from '../../../../modules/_helpers';

  @Component({
    components: { BaseReveal, TabsItem },
    computed: mapGetters(['pageData', 'p', 'preloaderIsFinished']),
    watch: {
      $route(next) {
        if (next.hash) this.changeTabByHash();
      }
    }
  })
  export default class SectionTabs extends Vue {
    /**
     * Sticky.js instance
     *
     * @type {Object}
     */
    Sticky = {};

    /**
     * Reveal tabs section
     */
    revealSection() {
      new TimelineMax()
        // tabs
        .fromTo('.SectionTabs', 1.5,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeOut },
          0.5
        );
    }

    mounted() {
      if (!Resp.isMobile) {
        this.Sticky = new Sticky('.SectionTabs', {
          marginTop: 120,
          onReachBottom: el => TweenMax.to(el, 0.4, { opacity: 0, ease: Power1.easeOut }),
          onLeaveBottom: el => TweenMax.to(el, 0.4, { opacity: 1, ease: Power1.easeOut })
        });
      }

      this.changeTabByHash();
    }

    destroyed() {
      this.Sticky && this.Sticky.destroy && this.Sticky.destroy();
    }

    /**
     * Read URL's hash and activate corresponding tab
     */
    changeTabByHash() {
      if (!Resp.isMobile && this.$route.hash) {
        const hashCorrespondingTab = this.$refs[`${replace(this.$route.hash, '#', '')}`];

        if (!hashCorrespondingTab) return;

        this.preloaderIsFinished
          ? hashCorrespondingTab.toggleTab()
          : bus.$on(PRELOADER_FINISHED, hashCorrespondingTab.toggleTab);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionTabs {
    position: relative;

    flex: 0 1 38.5%;

    padding-top: 20px;

    opacity: 0;

    @media (min-width: $largeDesktop) {
      flex: 0 1 35%;
    }

    @media (max-width: $minDesktop) {
      padding-top: 17px;
      flex: 0 0 32.5%;
    }

    @media (max-width: $minTablet) {
      order: 1;
      flex: 1 1 auto;
      width: 100%;

      margin-left: 0;
      margin-bottom: 95px;
    }
  }
</style>
