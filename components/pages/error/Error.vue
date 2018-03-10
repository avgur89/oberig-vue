<template lang="pug">
  main.Error.page-view
    BaseReveal(
      :in-viewport-once="true",
      :action="revealPage"
    )
    .Error__bg(:style="{ 'background-image': `url(${pageData.image})` }")
    .Error__cnt
      h1.Error__title 404
      .Error__desc(v-html="pageData.label")
      RainbowButton.Error__button(
        :url="homePageUrl",
        :text="pageData.buttonLabel"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../modules/_helpers';
  import RainbowButton from '../../ui/ButtonRainbowGradient.vue';
  import BaseReveal from '../../ui/BaseReveal.vue';

  @Component({
    components: { RainbowButton, BaseReveal },
    computed: mapGetters(['pageData'])
  })
  export default class Error extends Vue {
    /**
     * @return {String}
     */
    get homePageUrl() {
      return generateUrl(this.$route.params.lang);
    }

    /**
     * Run error page reveal animation.
     */
    revealPage() {
      const { chars: titleLetters } = new SplitText('.Error__title', {
        type: 'chars'
      });
      const { lines: descLines } = new SplitText('.Error__desc', {
        type: 'lines'
      });

      new TimelineMax()
        .set('.Error', { opacity: 1 })
        // title
        .staggerFromTo(titleLetters, 0.55,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, ease: Power1.easeOut },
          0.25,
          0
        )
        // background image
        .to('.Error__bg', 1, { opacity: 1, ease: Power1.easeOut }, 0.7)
        // desc
        .staggerFromTo(descLines, 0.4,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, ease: Power1.easeOut },
          0.15,
          0.7
        )
        // button
        .fromTo('.Error__button', 0.8,
          { opacity: 0 },
          { opacity: 1 },
          1
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/variables';

  .Error {
    position: relative;

    width: calc(100% + 80px);
    height: 100vh;

    margin-left: -40px;

    background-repeat: no-repeat;
    background-size: cover;

    opacity: 0;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);
      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);
      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% + 28px);
      margin-left: -14px;
    }

    &__bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;

      opacity: 0;

      background-size: cover;
    }

    &__cnt {
      position: absolute;
      width: 100%;

      top: 50%;
      left: 94px;

      transform: translateY(-50%);

      z-index: 2;

      @media (max-width: $minDesktop) {
        left: 50%;

        transform: translate(-50%, -50%);

        text-align: center;
      }
    }

    &__title {
      margin-bottom: 4px;

      font-family: $MinionProDisp;
      font-size: 140px;

      color: #736d7b;

      text-transform: uppercase;
    }

    &__desc {
      max-width: 505px;

      margin-bottom: 34px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      @media (max-width: $minDesktop) {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
</style>
