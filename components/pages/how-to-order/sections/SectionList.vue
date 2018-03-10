<template lang="pug">
  section.SectionList
    SectionListItem(
      v-for="index in 3",
      :key="index",
      :index="index",
      :title="p[`stageTitle${index}`]",
      :desc="p[`stageDescription${index}`]",
      :imgUrl="p[`stageImage${index}`]",
      :reverse="index % 2 === 0"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import SectionListItem from './SectionListItem.vue';

  @Component({
    components: { SectionListItem },
    computed: mapGetters(['p'])
  })
  export default class SectionList extends Vue {}
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionList {
    position: relative;

    margin-bottom: 121px;

    @media (max-width: $minDesktop) {
      margin-bottom: 125px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 92px;
    }
  }
</style>
