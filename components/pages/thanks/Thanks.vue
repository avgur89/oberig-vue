<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    BlockLinks#SectionLinks(
      :class="$style.sectionLinks",
      :urlLeft="homeLink",
      :urlRight="boutiquesLink",
      :textLeft="p.leftButtonLabel",
      :textRight="p.rightButtonLabel",
      :imgUrl="p.rightButtonImage",
      :reveal="revealSectionLinks"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../ui/BaseReveal.vue';
  import SectionMain from './sections/SectionMain.vue';
  import BlockLinks from '../../blocks/BlockLinks.vue';
  import { generateUrl } from '../../../modules/_helpers';

  @Component({
    components: {
      BaseReveal,
      SectionMain,
      BlockLinks
    },
    computed: mapGetters(['p'])
  })
  export default class Thanks extends Vue {
    /**
     * @return {String}
     */
    get homeLink() {
      return generateUrl(this.$route.params.lang, '');
    }

    /**
     * @return {String}
     */
    get boutiquesLink() {
      return generateUrl(this.$route.params.lang, 'boutiques');
    }

    /**
     * Reveal links block
     *
     * @param {HTMLElement} el
     */
    revealSectionLinks(el) {
      new TimelineMax()
        // links block
        .fromTo(
          el,
          1,
          { opacity: 0 },
          { opacity: 1 }
        );
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 50px;

    @media (max-width: $minTablet) {
      padding-top: 81px;
    }
  }

  .sectionLinks {
    opacity: 0;
  }
</style>
