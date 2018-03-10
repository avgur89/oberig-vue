<template lang="pug">
  article.SectionCreationItem
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-175",
      :action="revealItem"
    )
    template(v-if="!reverse")
      .SectionCreationItem__cnt-flex
        BaseSvgIcon.SectionCreationItem__line(
          ref="SectionCreationItemLineRef",
          icon="line_dot",
          width="340",
          height="140",
          :fill="false"
        )
        .SectionCreationItem__cnt
          .SectionCreationItem__title(ref="SectionCreationItemTitleRef") {{ title }}
          .SectionCreationItem__desc(v-html="desc", ref="SectionCreationItemDescRef")
      .SectionCreationItem__image-flex
        .SectionCreationItem__image-wrapper(ref="SectionCreationItemImageRef")
          img.SectionCreationItem__image(:src="imgUrl", alt="")
    template(v-else)
      .SectionCreationItem__image-flex.SectionCreationItem__image-flex-reverse
        .SectionCreationItem__image-wrapper-reverse(ref="SectionCreationItemImageRef")
          img.SectionCreationItem__image(:src="imgUrl", alt="")
      .SectionCreationItem__cnt-flex.SectionCreationItem__cnt-flex-reverse
        BaseSvgIcon.SectionCreationItem__line(
          ref="SectionCreationItemLineRef",
          icon="line_dot_2",
          width="340",
          height="140",
          :fill="false"
        )
        .SectionCreationItem__cnt
          .SectionCreationItem__title(ref="SectionCreationItemTitleRef") {{ title }}
          .SectionCreationItem__desc(v-html="desc", ref="SectionCreationItemDescRef")
</template>

<script>
  import '../../../../assets/svg/dist/line_dot';
  import '../../../../assets/svg/dist/line_dot_2';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import { Resp } from '../../../../modules/_helpers';

  @Component({
    components: { BaseReveal, BaseSvgIcon },
    props: {
      title: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      imgUrl: {
        type: String,
        required: true
      },
      reverse: {
        type: Boolean,
        default: false
      }
    }
  })
  export default class SectionCreationItem extends Vue {
    /**
     * Reveal creation section item
     */
    revealItem() {
      const {
        SectionCreationItemTitleRef,
        SectionCreationItemDescRef,
        SectionCreationItemImageRef,
        SectionCreationItemLineRef
      } = this.$refs;
      const animation = new TimelineMax();
      const ease = Power1.easeOut;
      const [dot, line] = [...SectionCreationItemLineRef.$el.querySelectorAll('path')];
      const { lines: titleLines } = new SplitText(SectionCreationItemTitleRef, {
        type: 'lines',
        linesClass: 'SectionCreationItem__title-line'
      });
      const { lines: descLines } = new SplitText(SectionCreationItemDescRef, {
        type: 'lines'
      });

      animation
        .set(this.$el, { opacity: 1 })
        // title
        .staggerFromTo(titleLines, 0.7,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, ease },
          0.15,
          Resp.isMobile ? 0 : 0.5
        )
        // desc
        .staggerFromTo(descLines, 0.5,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease },
          0.15,
          Resp.isMobile ? 0.2 : 1
        )
        // image
        .fromTo(SectionCreationItemImageRef, 1,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease },
          0.5
        );

      if (Resp.isDesk) {
        animation
          // dot
          .fromTo(dot, 0.7,
            { opacity: 0 },
            { opacity: 1, ease },
            0
          )
          // line
          .fromTo(line, Resp.isDeskL ? 1.3 : 1.9,
            { drawSVG: '0%' },
            { drawSVG: '100%', ease },
            0.2
          );
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionCreationItem {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 40px;

    opacity: 0;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $minDesktop) {
      margin-bottom: 140px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 80px;

      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }

    &__line {
      position: absolute;
      z-index: 1;

      left: calc(100% - 100px);
      top: 5px;

      @media (max-width: $minDesktop) {
        display: none !important;
      }
    }

    &__cnt-flex {
      position: relative;

      flex: 0 1 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;

        margin-bottom: 33px;
      }

      &-reverse {
        .SectionCreationItem__line {
          left: auto;
          right: calc(100% - 100px);
        }

        @media (max-width: $minTablet) {
          order: 1;
        }
      }
    }

    &__image-flex {
      flex: 0 1 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;
      z-index: 2;

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;
      }

      &-reverse {
        @media (max-width: $minTablet) {
          order: 2;
        }
      }
    }

    &__cnt {
      position: relative;
      z-index: 2;

      max-width: 299px;
      width: 100%;

      @media (max-width: $minTablet) {
        max-width: none;
        text-align: center;
      }
    }

    &__title {
      margin-bottom: 20px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;

      color: #736d7b;

      @media (max-width: $minTablet) {
        font-size: 25px;
        line-height: 40px;
        letter-spacing: 1.25px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__image-wrapper,
    &__image-wrapper-reverse {
      display: flex;
      justify-content: center;
      align-items: center;

      max-width: 380px;
      width: 100%;
      height: 500px;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);
      background-color: #ffffff;

      @media (max-width: $minDesktop) {
        max-width: 231px;
        height: 300px;
      }

      @media (max-width: $minTablet) {
        @include object-fit(cover);

        width: 100%;
        max-width: none;
        max-height: none;
        height: 320px;
      }

      &-reverse {
        max-width: 540px;
        height: 318px;

        @media (max-width: $minDesktop) {
          max-width: 331px;
          height: 200px;
        }

        @media (max-width: $minTablet) {
          @include object-fit(cover);

          width: 100%;
          max-width: none;
          max-height: none;
          height: 320px;
        }
      }
    }

    &__image {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/mixins";

  .SectionCreationItem__line {
    .st0{fill:#CDCDCD;stroke:none;}
    .st1{fill:none;stroke:#CDCDCD;stroke-width:0.35;stroke-miterlimit:10;}
  }
</style>
