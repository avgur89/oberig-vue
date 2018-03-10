<template lang="pug">
  section.SectionAnimation#SectionAnimation
    .SectionAnimation__section
      .SectionAnimation__icon
        BaseSvgIcon#SectionAnimationIcon1(
          icon="__pattern0",
          width="577",
          height="577",
          ref="SectionAnimationIconOneRef"
        )
      .SectionAnimation__text.SectionAnimation__text-1(
        ref="SectionAnimationTextOneRef",
        v-html="firstTitle"
      )
    .SectionAnimation__section
      .SectionAnimation__icon
        BaseSvgIcon#SectionAnimationIcon2(
          icon="_pattern2",
          width="748",
          height="545",
          ref="SectionAnimationIconTwoRef"
        )
      .SectionAnimation__text.SectionAnimation__text-2(
        ref="SectionAnimationTextTwoRef"
      ) {{ secondTitle }}
    .SectionAnimation__section
      .SectionAnimation__icon
        BaseSvgIcon#SectionAnimationIcon3(
          icon="_pattern3",
          width="559",
          height="559",
          ref="SectionAnimationIconThreeRef"
        )
      .SectionAnimation__text.SectionAnimation__text-3(
        ref="SectionAnimationTextThreeRef",
        v-html="thirdTitle"
      )
    .SectionAnimation__skip(@click.once="skipAnimation") {{ t.skip }}
</template>

<script>
  import '~/assets/svg/dist/__pattern0';
  import '~/assets/svg/dist/_pattern2';
  import '~/assets/svg/dist/_pattern3';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import bus from '../../../../plugins/event-bus';
  import { mapGetters, mapActions } from 'vuex';
  import Animation from '../../../../modules/Animation';
  import { Resp, extractStringChunks } from '../../../../modules/_helpers';
  import {
    ANIMATION_STARTED,
    ANIMATION_FINISHED
  } from '../../../../modules/_events';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  @Component({
    components: { BaseSvgIcon },
    computed: mapGetters(['p', 'pageData', 't']),
    methods: mapActions(['goToNextAnimationPhase'])
  })
  export default class SectionAnimation extends Vue {
    /**
     * Animation instance
     *
     * @type {Object|Null}
     */
    animation = null;

    /**
     * @return {String}
     */
    get firstTitle() {
      return extractStringChunks(this.p.animationTitle1);
    }

    /**
     * @return {String}
     */
    get secondTitle() {
      return this.p.animationTitle2;
    }

    /**
     * @return {String}
     */
    get thirdTitle() {
      return extractStringChunks(this.p.animationTitle3);
    }

    mounted() {
      bus.$on(ANIMATION_STARTED, this.runAnimation);

      if (Resp.isMobile && (Resp.isIosChrome || !Resp.isIos)) {
        this.$el.style.height = '100vh';
        this.$el.style.top = '100vh';
      }
    }

    destroyed() {
      bus.$off(ANIMATION_STARTED, this.runAnimation);
    }

    /**
     * Run animation scene.
     *
     * @async
     * @return {Promise.<void>}
     */
    async runAnimation() {
      const {
        SectionAnimationTextOneRef: textOne,
        SectionAnimationTextTwoRef: textTwo,
        SectionAnimationTextThreeRef: textThree,
        SectionAnimationIconOneRef: { $el: iconOneContainer },
        SectionAnimationIconTwoRef: { $el: iconTwoContainer },
        SectionAnimationIconThreeRef: { $el: iconThreeContainer }
      } = this.$refs;
      const screen = this.$el;
      const iconOne = iconOneContainer.querySelector('svg');
      const iconTwo = iconTwoContainer.querySelector('svg');
      const iconThree = iconThreeContainer.querySelector('svg');
      const iconFinal = Resp.isMobile ? null : document.getElementById('AnimationSectionFinalImage');

      this.animation = new Animation({
        textOne,
        textTwo,
        textThree,
        iconOne,
        iconTwo,
        iconThree,
        screen,
        iconFinal
      });

      // change state 0 -> 1 'animation is running'
      this.goToNextAnimationPhase();

      await this.animation.run();

      // change state 1 -> 2 'animation is finished'
      this.goToNextAnimationPhase();

      // animation is finished
      bus.$emit(ANIMATION_FINISHED);
    }

    /**
     * Break animation and skip to the next section
     *
     * @async
     * @return {Promise.<void>}
     */
    async skipAnimation() {
      if (!this.animation) return;

      await this.animation.breakAnimation();

      // change state 1 -> 2 'animation is finished'
      this.goToNextAnimationPhase();

      // animation is finished
      bus.$emit(ANIMATION_FINISHED);
    }
  }
</script>

<style lang="scss">
  @import '../../../../assets/scss/variables';

  .SectionAnimation {
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 100vh;

    opacity: 0;

    z-index: 4;

    @media (max-width: $minTablet) {
      height: 90vh;
      top: 90vh;
    }

    path, circle {
      stroke: #d2d0d4;
    }

    &__icon {
      position: absolute;
      left: 50%;
      top: 50%;

      transform: translate3d(-50%, -50%, 0);

      @media (max-width: $minTablet) {
        width: 100%;
        padding: 0 14px;

        > div {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }

    &__text {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate3d(-50%, -50%, 0);

      text-align: center;

      &-1 {
        max-width: 400px;

        @media (max-width: $minTablet) {
          width: 100%;
        }
      }

      &-2 {
        max-width: 330px;
        margin-top: -20px;

        @media (max-width: $minTablet) {
          margin-top: -5px;
        }
      }

      &-3 {
        max-width: 420px;

        @media (max-width: $minDesktop) and (min-width: $tablet) {
          width: 430px;
          max-width: none;
        }

        @media (max-width: $minTablet) {
          width: 100%;
        }
      }

      div {
        display: inline-block;
        position: relative;

        opacity: 0;
        transform: translateY(-50px);

        font-family: $MinionProRegular;
        font-size: 50px;
        line-height: 65px;
        text-transform: uppercase;
        letter-spacing: -0.5px;

        color: #736d7b;

        @media (max-width: $minTablet) {
          font-size: 35px;
          line-height: 45px;
        }
      }

      span {
        display: inline-block;
        position: relative;
      }

      > div, > span {
        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }

    &__final {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate3d(-50%, -50%, 0);

      opacity: 0;

      height: 555px;

      img {
        width: 555px;
      }

      @media (max-width: $minTablet) {
        height: 291px;

        img {
          width: 291px;
        }
      }
    }

    &__section {
      @media (max-width: $minTablet) {
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &__skip {
      position: absolute;

      left: 50%;
      bottom: 15px;

      transform: translateX(-50%);

      cursor: pointer;

      font-family: $MinionProRegular;
      font-size: 20px;
      line-height: 25px;
      text-transform: uppercase;
      letter-spacing: 0;

      color: #736d7b;
    }

    #SectionAnimationIcon1 {
      fill: none;
      overflow: visible;
      box-sizing: content-box;

      @media (max-width: $minTablet) {
        width: 100% !important;
        padding: 0;
      }

      .st0{fill:none;stroke:#6e545a;stroke-width:2.5;} // 1
      .st1{fill:none;stroke:#7f666b;stroke-width:2;} // 1
      .st2{fill:none;stroke:#7f666b;stroke-width:1.5} // 2
      .st3{fill:none;stroke:#9e7f88;stroke-width:1.2;} // 1
      .st4{fill:none;stroke:#a89198;stroke-width:1.2;} // 2
      .st5{
        fill:none;
        stroke:#b5a5aa;
        stroke-width:1;

        + .st5 + .st5 {
          stroke: #c0b6b9;
          + .st5 {
            stroke: #c0b6b9;
          }
        }
      } // 4
      .st6{
        fill:none;
        stroke:#ccc6c8;
        stroke-width: 1;

        + .st6 {
          stroke-width: 0.8;
        }
      } // 2
      .st8{
        fill:none;
        stroke:#d6d0d2;
        stroke-width:0.8 !important;

        + .st8 {
          stroke: #e1e0e4;
          stroke-width: 0.6 !important;
        }
      } // 2

      .st9{fill:none;stroke:#e1e0e4;stroke-width: 0.6 !important; // 2
        + .st9 {
          stroke-width: 0.4 !important;
        }
      }
    }

    #SectionAnimationIcon2 {
      fill: none;

      @media (max-width: $minTablet) {
        width: 100% !important;
      }

      .st0{fill:none;stroke:#E1E0E4;stroke-width:0.258;}
      .st1{fill:none;stroke:#E1E0E4;stroke-width:0.766;}
      .st2{fill:none;stroke:#E1E0E4;stroke-width:3.05;}
      .st3{fill:none;stroke:#E1E0E4;stroke-width:1.274;}
      .st4{fill:none;stroke:#E1E0E4;stroke-width:0.512;}
      .st5{fill:none;stroke:#E1E0E4;stroke-width:1.02;}
    }

    #SectionAnimationIcon3 {
      fill: none;

      @media (max-width: $minTablet) {
        width: 100% !important;
      }

      .st0{fill:none;stroke:#E1E0E4;stroke-width:1.524;}
      .st1{fill:none;stroke:#E1E0E4;stroke-width:2.032;}
      .st2{fill:none;stroke:#E1E0E4;stroke-width:0.762;}
      .st3{fill:none;stroke:#E1E0E4;stroke-width:0.254;}
      .st4{fill:none;stroke:#E1E0E4;stroke-width:0.508;}
      .st5{fill:none;stroke:#E1E0E4;stroke-width:1.016;}
      .st6{fill:none;stroke:#E1E0E4;stroke-width:2.54;}
      .st7{fill:none;stroke:#E1E0E4;stroke-width:1.27;}
    }
  }
</style>
