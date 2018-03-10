<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__cnt
      .SectionMain__cnt-desc
        h1.SectionMain__cnt-title {{ p.title }}
    BaseFilter.SectionMain__filter(
      :filtersData="pageData.filters",
      :toggleLabel="t.to_filter_label",
      :categoryTitle="t.filter_category",
      :stoneTitle="t.filter_stone",
      :metalTitle="t.filter_metal",
      :symbolTitle="t.filter_symbol",
      :applyFiltersLabel="t.apply_filter",
      :clearFiltersLabel="t.reset_filter",
      :selectedLabel="t.your_select_label"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseFilter from '../../../ui/BaseFilter.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseFilter, BaseReveal },
    computed: mapGetters(['p', 't', 'pageData'])
  })
  export default class SectionMain extends Vue {
    /**
     * Reveal list section
     */
    revealSection() {
      const { words: titleWords } = new SplitText('.SectionMain__cnt-title', {
        type: 'words'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(titleWords, 0.5,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // filter
        .to('.SectionMain__filter', 1, {
          opacity: 1,
          ease: Power1.easeOut
        }, 0.3);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    z-index: 1;

    opacity: 0;

    margin-top: 108px;

    @media (max-width: $minDesktop) {
      margin-top: 97px;
    }

    @media (max-width: $minTablet) {
      margin-top: 42px;
    }

    &__filter {
      opacity: 0;
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      margin-bottom: 30px;

      @media (max-width: $minDesktop) {
        margin-bottom: 84px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 33px;

        flex-direction: column;
        justify-content: flex-start;
      }

      &-desc {
        flex: 0 1 50%;

        max-width: 600px;
        width: 100%;
        padding-left: 40px;

        @media (max-width: $minDesktop) {
          padding-left: 0;
        }

        @media (max-width: $minTablet) {
          flex: 1 1 auto;
          max-width: none;
          width: 100%;
        }
      }

      &-title {
        margin-bottom: 37px;

        font-family: $MinionProDisp;
        font-size: 50px;
        line-height: 65px;
        letter-spacing: 1.25px;

        color: #736d7b;

        text-transform: uppercase;

        @media (max-width: $minDesktop) {
          margin-bottom: 0;
        }

        @media (max-width: $minTablet) {
          font-size: 35px;
          font-weight: 400;
          line-height: 45px;
          letter-spacing: 0.88px;

          text-align: center;
        }
      }
    }
  }
</style>
