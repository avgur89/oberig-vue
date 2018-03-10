<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    SectionList
    SectionCreation
    SectionBanner
    SectionGuarantee
    BlockLinks#SectionLinks(
      :urlLeft="constructorLink",
      :urlRight="catalogLink",
      :textLeft="p.leftButtonLabel",
      :textRight="p.rightButtonLabel",
      :imgUrl="p.rightButtonImage"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import SectionMain from './sections/SectionMain.vue';
  import SectionList from './sections/SectionList.vue';
  import SectionCreation from './sections/SectionCreation.vue';
  import SectionBanner from './sections/SectionBanner.vue';
  import SectionGuarantee from './sections/SectionGuarantee.vue';
  import BlockLinks from '../../blocks/BlockLinks.vue';

  @Component({
    components: {
      SectionMain,
      SectionList,
      SectionCreation,
      SectionBanner,
      SectionGuarantee,
      BlockLinks
    },
    computed: mapGetters(['p'])
  })
  export default class HowToOrder extends Vue {
    /**
     * @return {String}
     */
    get catalogLink() {
      return generateUrl(this.$route.params.lang, 'catalog');
    }

    /**
     * @return {String}
     */
    get constructorLink() {
      return generateUrl(this.$route.params.lang, 'constructor');
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 124px;

    @media (max-width: $minDesktop) {
      padding-top: 128px;
    }

    @media (max-width: $minTablet) {
      padding-top: 89px;
    }
  }
</style>
