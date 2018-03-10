<template lang="pug">
  section.SectionSymbol
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .SectionSymbol__cnt
      .SectionSymbol__main-desc
        .SectionSymbol__main-desc-inner
          h3.SectionSymbol__title {{ m.symbol.label }}
          p.SectionSymbol__subtitle {{ t.main_symbol }}
      .SectionSymbol__image-wrapper
        img.SectionSymbol__image(
          :src="m.symbol.patternImg",
          alt=""
        )
      .SectionSymbol__desc(v-html="m.symbol.content")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    computed: mapGetters(['m', 't'])
  })
  export default class SectionStar extends Vue {
    /**
     * Animate star section
     */
    revealSection() {
      const { lines: titleLines } = new SplitText('.SectionSymbol__desc p', {
        type: 'lines'
      });

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // image
        .fromTo('.SectionSymbol__image-wrapper', 1,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0 },
          0
        )
        // title and subtitle
        .staggerFromTo(['.SectionSymbol__title', '.SectionSymbol__subtitle'], 0.5,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.4,
          0.3
        )
        // description
        .staggerFromTo(titleLines, 0.5,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.3
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionSymbol {
    position: relative;
    width: 100%;

    margin-bottom: 140px;
    margin-top: 48px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-bottom: 135px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 95px;
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      @media (max-width: $minDesktop) {
        justify-content: center;
        flex-direction: column;
      }
    }

    &__main-desc {
      flex: 1 1 auto;
      width: 100%;
      text-align: center;

      margin-right: 110px;

      @media (max-width: $minDesktop) {
        max-width: 500px;
        width: 100%;

        margin: 0 auto 36px auto;
        text-align: center;
      }

      &-inner {
        display: inline-block;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 35px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 3px;

      color: #4d4d4d;

      @media (max-width: $minDesktop) {
        margin-bottom: 20px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 13px;

        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__subtitle {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      flex: 0 0 236px;
      height: 236px;

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        max-width: 140px;
        width: 100%;
        height: 140px;

        margin-bottom: 31px;
      }

      @media (max-width: $minTablet) {
        max-width: 125px;
        height: 125px;
      }
    }

    &__image {
      max-width: 236px;
      max-height: 236px;

      @media (max-width: $minDesktop) {
        max-width: 140px;
        max-height: 140px;
      }

      @media (max-width: $minTablet) {
        max-width: 125px;
        max-height: 125px;
      }
    }

    &__desc {
      flex: 1 1 auto;
      width: 100%;

      margin-left: 118px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      @media (max-width: $minDesktop) {
        max-width: 500px;
        width: 100%;

        margin: 0 auto;

        text-align: center;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";

  .SectionSymbol {
    &__desc {
      p {
        div {
          @media (max-width: $minDesktop) {
            text-align: center !important;
          }
        }
      }
    }
  }
</style>
