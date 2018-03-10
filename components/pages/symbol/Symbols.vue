<template lang="pug">
  main.page-view(:class="$style.pageView")
    SectionMain
    SectionTabs
    SectionOrnament
    SectionUnique
    BlockImageItems(
      :items="p.images",
      pictureMode
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import SectionMain from './sections/SectionMain.vue';
  import SectionTabs from './sections/SectionTabs.vue';
  import SectionOrnament from './sections/SectionOrnament.vue';
  import SectionUnique from './sections/SectionUnique.vue';
  import BlockImageItems from '../../blocks/BlockImageItems.vue';

  @Component({
    components: {
      SectionMain,
      SectionTabs,
      SectionOrnament,
      SectionUnique,
      BlockImageItems
    },
    computed: mapGetters(['p'])
  })
  export default class Symbols extends Vue {}
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    padding-top: 133px;

    @media (max-width: $minDesktop) {
      padding-top: 138px;
    }

    @media (max-width: $minTablet) {
      padding-top: 110px;
    }
  }
</style>
