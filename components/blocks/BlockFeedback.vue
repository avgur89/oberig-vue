<template lang="pug">
  section.BlockFeedback(:class="{ 'hasBorder': hasBorder }")
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealSection"
    )
    .BlockFeedback__list
      .BlockFeedbackItem
        .BlockFeedbackItem__title {{ data.boutiqueLabel }}
        p.BlockFeedbackItem__desc {{ data.boutiqueDescriptions }}
        nuxt-link.BlockFeedbackItem__link(:to="boutiqueUrl") {{ data.boutiqueLinkLabel }}
      .BlockFeedbackItem
        .BlockFeedbackItem__title {{ data.feedbackLabel }}
        p.BlockFeedbackItem__desc {{ data.feedbackDescription }}
        ButtonRainbowGradient(
          :url="`mailto:${data.feedBackEmail}`",
          :text="data.feedbackButtonLabel",
          isHref
        )
      .BlockFeedbackItem
        .BlockFeedbackItem__title {{ data.symbolsLabel }}
        p.BlockFeedbackItem__desc {{ data.symbolsDescriptions }}
        nuxt-link.BlockFeedbackItem__link(:to="symbolsUrl") {{ data.symbolsLinkLabel }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { Resp, generateUrl } from '../../modules/_helpers';
  import BaseReveal from '../ui/BaseReveal.vue';
  import ButtonRainbowGradient from '../ui/ButtonRainbowGradient.vue';

  @Component({
    components: { ButtonRainbowGradient, BaseReveal },
    props: {
      data: {
        type: Object,
        required: true
      },
      hasBorder: {
        type: Boolean,
        default: false
      }
    },
    computed: mapGetters(['menu'])
  })
  export default class BlockFeedback extends Vue {
    /**
     * @return {String}
     */
    get boutiqueUrl() {
      return generateUrl(this.$route.params.lang, 'boutiques');
    }

    /**
     * @return {String}
     */
    get symbolsUrl() {
      const [{ route }] = this.menu.filter(item => item.name === 'symbol');
      return route;
    }

    /**
     * Run reveal animation.
     */
    revealSection() {
      const feedBackBlockItemsQueue = !Resp.isDesk
        ? '.BlockFeedbackItem'
        : [
          '.BlockFeedbackItem:nth-child(2)',
          '.BlockFeedbackItem:not(:nth-child(2))'
        ];

      TweenMax.staggerFromTo(
        feedBackBlockItemsQueue,
        0.85,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.3
      );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BlockFeedback {
    position: relative;

    margin: 0 auto;
    margin-bottom: 60px;

    max-width: 1280px;

    @media (max-width: $minDesktop) {
      margin-bottom: 55px;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      padding-right: 26px;

      @media (max-width: $minDesktop) {
        flex-direction: column;
        justify-content: flex-start;

        padding-right: 0;
      }
    }
  }

  .BlockFeedbackItem {
    flex: 0 1 33%;
    margin-right: 42px;

    text-align: center;

    opacity: 0;

    &:last-child {
      margin-right: 0;
    }

    @media (max-width: $minDesktop) {
      flex: 1 1 auto;
      width: 100%;

      margin-bottom: 54px;
      margin-right: 0;

      &:first-child {
        margin-bottom: 42px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 24px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      letter-spacing: 1.5px;

      color: #3f4144;

      text-transform: uppercase;

      @media (max-width: $minTablet) {
        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__desc {
      margin-bottom: 32px;

      font-family: $Calibri;
      font-size: 16px;
      line-height: 26px;

      color: #444344;
    }

    &__link {
      @include gradient-text();

      display: inline-block;

      margin-top: 19px;

      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 2.8px;

      text-transform: uppercase;

      color: #fff;

      @media (max-width: $minDesktop) {
        margin-top: 0;
      }
    }
  }
</style>

<style lang="scss">
  .hasBorder {
    border-top: 1px solid #e1e0e4;
    margin-top: 60px;

    .BlockFeedback__list {
      margin-top: 49px;
    }
  }
</style>
