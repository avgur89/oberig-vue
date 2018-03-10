<template lang="pug">
  article.SectionListItem
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="index === 1 ? 0 : -160",
      :action="revealItem"
    )
    template(v-if="reverse")
      .SectionListItem__image-flex.SectionListItem__image-flex-reverse(ref="SectionListItemImage")
        .SectionListItem__image-wrapper-reverse
          img.SectionListItem__image(:src="imgUrl", alt="")
      .SectionListItem__cnt-flex.SectionListItem__cnt-flex-reverse
        .SectionListItem__cnt
          h3.SectionListItem__title(ref="SectionListItemTitle") {{ title }}
          .SectionListItem__desc(v-html="desc", ref="SectionListItemDesc")
    template(v-else)
      .SectionListItem__cnt-flex
        .SectionListItem__cnt
          h3.SectionListItem__title(ref="SectionListItemTitle") {{ title }}
          .SectionListItem__desc(v-html="desc", ref="SectionListItemDesc")
      .SectionListItem__image-flex(ref="SectionListItemImage")
        .SectionListItem__image-wrapper
          img.SectionListItem__image(:src="imgUrl", alt="")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    props: {
      title: {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: false
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
  export default class SectionListItem extends Vue {
    /**
     * Reveal list item
     */
    revealItem() {
      const {
        SectionListItemTitle,
        SectionListItemDesc,
        SectionListItemImage
      } = this.$refs;
      const { lines } = new SplitText(SectionListItemTitle, { type: 'lines' });

      new TimelineMax()
        .set(SectionListItemTitle, { opacity: 1 })
        .staggerFromTo(lines, 0.45,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0
        )
        .to(SectionListItemDesc, 1, {
          opacity: 1
        })
        .fromTo(SectionListItemImage, 0.7,
          { opacity: 0, y: 50, scale: 0.965 },
          { opacity: 1, y: 0, scale: 1, ease: Power1.easeOut },
          0.4
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionListItem {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $minDesktop) {
      align-items: flex-start;

      margin-bottom: 125px;
    }

    @media (max-width: $minTablet) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      margin-bottom: 82px;
    }

    &__cnt-flex {
      flex: 0 1 50%;

      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;

        margin-bottom: 36px;
      }

      &-reverse {
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

      opacity: 0;

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
      max-width: 288px;
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

      opacity: 0;
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      opacity: 0;
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
          width: 100%;
          max-width: none;
          max-height: none;
          height: 320px;
          @include object-fit(cover);
        }
      }
    }

    &__image {
      max-width: 69%;
      max-height: 69%;

      @media (max-width: $minTablet) {
        max-width: 127px;
        max-height: 127px;
      }
    }
  }
</style>
