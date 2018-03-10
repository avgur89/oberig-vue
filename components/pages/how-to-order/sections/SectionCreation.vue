<template lang="pug">
  section.SectionCreation
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-250",
      :action="revealSection"
    )
    h2.SectionCreation__title(v-html="mainTitle")
    .SectionCreation__cnt
      .SectionCreation__column
        .SectionCreation__column-number {{ p.creationStageNumber1 }}
        h3.SectionCreation__column-title {{ p.creationStageTitle1 }}
        .SectionCreation__column-desc(v-html="p.creationStageDescription1")
      .SectionCreation__pattern
        BaseSvgIcon.SectionCreation__pattern-svg(
          icon="pattern__how-to-order",
          id="SectionCreationPattern",
          width="369",
          height="369"
        )
        img.SectionCreation__pattern-image(:src="`/img/pattern__how-to-order.${webp_png}`", alt="")
      .SectionCreation__column
        .SectionCreation__column-number {{ p.creationStageNumber2 }}
        h3.SectionCreation__column-title {{ p.creationStageTitle2 }}
        .SectionCreation__column-desc(v-html="p.creationStageDescription2")
</template>

<script>
  import '../../../../assets/svg/dist/pattern__how-to-order';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import webpExtension from '../../../../mixins/webpExtension';
  import { extractStringChunks } from '../../../../modules/_helpers';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseSvgIcon, BaseReveal },
    mixins: [webpExtension],
    computed: mapGetters(['p'])
  })
  export default class SectionCreation extends Vue {
    /**
     * @return {String}
     */
    get mainTitle() {
      return extractStringChunks(this.p.creationTitle, {
        scopeId: this.$options._scopeId
      });
    }

    /**
     * Reveal creation section
     */
    revealSection() {
      const ornamentPaths = document.querySelectorAll('.SectionCreation__pattern-svg path');
      const columns = [...this.$el.querySelectorAll('.SectionCreation__column')];
      const [subtitle1, subtitle2] = columns.map(el =>
        el.querySelectorAll('.SectionCreation__column-number, .SectionCreation__column-title')
      );
      const [{ lines: desc1 }, { lines: desc2 }] = columns.map(el =>
        new SplitText(el.querySelector('.SectionCreation__column-desc'), { type: 'lines' })
      );

      new TimelineMax()
        // title
        .set('.SectionCreation__title', { opacity: 1 })
        .set('.SectionCreation__column-desc', { opacity: 1 }, 0)
        .staggerFromTo('.SectionCreation__title .chunk', 0.55,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        // ornament
        .to('.SectionCreation__pattern-svg', 0.5, { opacity: 1 }, 0.75)
        .fromTo(ornamentPaths, 1.5,
          { drawSVG: '0%' },
          { drawSVG: '100%', ease: Power0.easeNone },
          0.75
        )
        // subtitle 1
        .to(subtitle1, 1, { opacity: 1 }, 0.75)
        // desc 1
        .staggerFromTo(desc1, 1,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.85
        )
        // image
        .to('.SectionCreation__pattern-image', 1.3, { opacity: 1, ease: Power0.easeNone }, 2.1)
        // subtitle 2
        .to(subtitle2, 1, { opacity: 1 }, 2.1)
        // desc 2
        .staggerFromTo(desc2, 1,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          2.2
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionCreation {
    position: relative;

    margin-bottom: 117px;

    @media (max-width: $minDesktop) {
      margin-bottom: 135px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 96px;
    }

    &__title {
      max-width: 380px;
      width: 100%;

      margin: 0 auto 46px auto;
      text-align: center;

      font-family: $MinionProDisp;
      font-size: 50px;
      font-weight: 400;
      line-height: 65px;
      text-transform: uppercase;
      letter-spacing: 2.5px;

      color: #736d7b;

      opacity: 0;

      @media (max-width: $minTablet) {
        margin-bottom: 41px;

        font-size: 35px;
        line-height: 45px;
        letter-spacing: 0.88px;

        .chunked_word {
          display: block;
        }
      }
    }

    &__cnt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;

      @media (max-width: $minDesktop) {
        flex-direction: column;
      }
    }

    &__column {
      flex: 1 1 calc(100% - 42px);

      margin-right: 42px;

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;

        max-width: 500px;
        width: 100%;

        margin: 0 auto 55px auto;
      }

      &:last-child {
        margin-right: 21px;
        margin-left: 42px;

        @media (max-width: $minDesktop) {
          margin: 55px auto 0 auto;
        }
      }

      &-number {
        @include gradient-text(false);

        margin-bottom: 14px;

        font-family: $MinionProDisp;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
        text-transform: uppercase;
        letter-spacing: 1.5px;

        color: #3f4144;

        opacity: 0;

        @media (max-width: $minTablet) {
          margin-bottom: 7px;

          font-size: 25px;
          line-height: 40px;
          letter-spacing: 1.25px;
        }
      }

      &-title {
        @include gradient-text(false);

        margin-bottom: 24px;

        font-family: $MinionProDisp;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
        text-transform: uppercase;
        letter-spacing: 1.5px;

        color: #3f4144;

        opacity: 0;

        @media (max-width: $minTablet) {
          margin-bottom: 19px;

          font-size: 25px;
          line-height: 40px;
          letter-spacing: 1.25px;
        }
      }

      &-desc {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;

        opacity: 0;
      }
    }

    &__pattern {
      position: relative;
      flex: 0 0 368px;

      @media (max-width: $minDesktop) {
        flex: 1 1 auto;
      }

      &-svg {
        position: relative;
        z-index: 0;
        fill: none;
        stroke: #3f4144;

        opacity: 0;
      }

      &-image {
        position: absolute;
        z-index: 1;

        top: 1px;
        width: 185px;
        left: 50%;
        height: 369px;

        opacity: 0;
      }
    }
  }
</style>

<style lang="scss">
  #SectionCreationPattern {
    .st0{fill:none;stroke:#E1E0E4;stroke-width:1.524;}
    .st1{fill:none;stroke:#E1E0E4;stroke-width:2.032;}
    .st2{fill:none;stroke:#E1E0E4;stroke-width:0.762;}
    .st3{fill:none;stroke:#E1E0E4;stroke-width:0.254;}
    .st4{fill:none;stroke:#E1E0E4;stroke-width:0.508;}
    .st5{fill:none;stroke:#E1E0E4;stroke-width:1.016;}
    .st6{fill:none;stroke:#E1E0E4;stroke-width:2.54;}
    .st7{fill:none;stroke:#E1E0E4;stroke-width:1.27;}
  }
</style>
