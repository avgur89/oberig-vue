<template lang="pug">
  main.page-view(:class="$style.pageView")
    .page-view__outer(:class="$style.pageViewOuter", data-sticky-container)
      .page-view__inner(:class="$style.pageViewInner")
        SectionMain
        SectionTabs(v-if="isMobile")
        SectionTabsContent(:isMobile="isMobile")
      SectionTabs(v-if="!isMobile")
    BlockLinks#SectionLinks(
      :class="$style.blockLinks",
      :urlLeft="symbolsLink",
      :urlRight="catalogLink",
      :textLeft="p.symbolsButtonLabel",
      :textRight="p.catalogButtonLabel",
      :imgUrl="p.catalogButtonImage",
      :reveal="revealLinks"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { Resp, generateUrl } from '../../../modules/_helpers';
  import SectionMain from './sections/SectionMain.vue';
  import SectionTabs from './sections/SectionTabs.vue';
  import SectionTabsContent from './sections/SectionTabsContent.vue';
  import BlockLinks from '../../blocks/BlockLinks.vue';

  @Component({
    components: {
      SectionMain,
      SectionTabs,
      SectionTabsContent,
      BlockLinks
    },
    computed: mapGetters(['pageData', 'p', 'menu'])
  })
  export default class Services extends Vue {
    /**
     * Mobile state indicator
     *
     * @type {Boolean}
     */
    isMobile = false;

    mounted() {
      this.isMobile = Resp.isMobile;
    }

    /**
     * @return {String}
     */
    get catalogLink() {
      return generateUrl(this.$route.params.lang, 'catalog');
    }

    /**
     * @return {String}
     */
    get symbolsLink() {
      const [{ route }] = this.menu.filter(item => item.name === 'symbol');
      return route;
    }

    /**
     * Reveal links section
     *
     * @param {HTMLElement} el
     */
    revealLinks(el) {
      TweenMax.to(el, 1, { opacity: 1, ease: Power1.easeOut });
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 177px;

    @media (max-width: $minDesktop) {
      padding-top: 187px;
    }

    @media (max-width: $minTablet) {
      padding-top: 117px;
    }
  }

  .pageViewOuter {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin-bottom: 132px;

    @media (max-width: $minTablet) {
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 45px;
    }
  }

  .pageViewInner {
    flex: 0 1 49%;
    padding-left: 40px;
    padding-top: 7px;

    @media (min-width: $largeDesktop) {
      flex: 0 1 65%;

      padding-right: 100px;
    }

    @media (max-width: $minDesktop) {
      flex: 0 1 58%;
      padding-left: 0;
      padding-top: 0;
    }

    @media (max-width: $minTablet) {
      order: 2;
      flex: 1 1 auto;
      width: 100%;
    }
  }

  .blockLinks {
    opacity: 0;
  }
</style>
