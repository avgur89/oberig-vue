<template lang="pug">
  section.SectionMain
    .SectionMain__cnt
      .SectionMain__cnt-desc
        h1.SectionMain__cnt-title {{ m.label }}
        .SectionMain__cnt-text(v-html="m.content")
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
  import bus from '../../../../plugins/event-bus';
  import {
    SET_LOCK,
    SHOW_HEADER,
    COLLECTION_PREVIEW_CLOSED
  } from '../../../../modules/_events';
  import BaseFilter from '../../../ui/BaseFilter.vue';

  @Component({
    components: { BaseFilter },
    computed: mapGetters(['m', 't', 'pageData'])
  })
  export default class SectionMain extends Vue {
    mounted() {
      bus.$on(COLLECTION_PREVIEW_CLOSED, this.revealSection);
    }

    destroyed() {
      bus.$off(COLLECTION_PREVIEW_CLOSED, this.revealSection);
    }

    /**
     * Reveal list section
     */
    revealSection() {
      bus.$emit(SET_LOCK, false);
      bus.$emit(SHOW_HEADER, 1, 0.15);

      const [{ lines: title }, { lines: desc }] = [
        '.SectionMain__cnt-title',
        '.SectionMain__cnt-text'
      ].map(el => new SplitText(el, { type: 'lines' }));

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(title, 0.6,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // desc
        .staggerFromTo(desc, 0.45,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.5
        )
        // filter
        .to('.SectionMain__filter', 1, {
          opacity: 1,
          ease: Power1.easeOut
        }, 0.5);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionMain {
    position: relative;

    margin-top: 336px;

    z-index: 1;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-top: 326px;
    }

    @media (max-width: $minTablet) {
      margin-top: 133px;
    }

    &__filter {
      opacity: 0;
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      margin-bottom: 56px;

      @media (max-width: $minTablet) {
        margin-bottom: 56px;
      }

      @media (max-width: $minTablet) {
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
        margin-top: 0;

        font-family: $MinionProDisp;
        font-size: 50px;
        line-height: 65px;
        letter-spacing: 1.25px;

        color: #736d7b;

        text-transform: uppercase;

        @media (max-width: $minDesktop) {
          margin-bottom: 29px;
        }

        @media (max-width: $minTablet) {
          margin-bottom: 19px;

          font-size: 35px;
          font-weight: 400;
          line-height: 45px;
          letter-spacing: 0.88px;

          text-align: center;
        }
      }

      &-text {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;

        @media (max-width: $minTablet) {
          text-align: center;
        }
      }
    }
  }
</style>
