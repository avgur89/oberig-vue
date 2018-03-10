<template lang="pug">
  section.SectionMain
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    .SectionMain__cnt
      .SectionMain__cnt-desc
        h1.SectionMain__cnt-title {{ p.title }}
        .SectionMain__cnt-subtitle {{ p.youSelectedLabel }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseFilter from '../../../ui/BaseFilter.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseFilter, BaseReveal },
    computed: mapGetters(['p', 'pageData'])
  })
  export default class SectionMain extends Vue {
    /**
     * Reveal list section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionMain__cnt-title', {
        type: 'lines'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.6,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15
        )
        // filter
        .fromTo('.SectionMain__cnt-subtitle', 0.6, { opacity: 0, y: 30 }, {
          opacity: 1,
          y: 0,
          ease: Power1.easeOut
        }, 0.4);
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
      margin-top: 93px;
    }

    @media (max-width: $minTablet) {
      margin-top: 44px;
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

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
        margin-bottom: 31px;

        font-family: $MinionProDisp;
        font-size: 50px;
        line-height: 65px;
        letter-spacing: 1.25px;

        color: #736d7b;

        text-transform: uppercase;

        @media (max-width: $minDesktop) {
          margin-bottom: 33px;
        }

        @media (max-width: $minTablet) {
          font-size: 35px;
          font-weight: 400;
          line-height: 45px;
          letter-spacing: 0.88px;

          margin-bottom: 42px;

          text-align: center;
        }
      }

      &-subtitle {
        font-family: $MinionProRegular;
        font-size: 18px;
        line-height: 28px;
        text-transform: uppercase;
        letter-spacing: 2.7px;

        @include gradient-text(false);

        @media (max-width: $minTablet) {
          font-size: 13px;
          line-height: 22px;
          letter-spacing: 1.95px;

          text-align: center;
        }
      }
    }
  }
</style>
