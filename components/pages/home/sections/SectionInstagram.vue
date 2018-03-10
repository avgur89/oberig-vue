<template lang="pug">
  section.SectionInstagram#SectionInstagram(:class="cssClassesObject")
    a(href="https://instagram.com",
      target="_blank",
      rel="noopener",
      @mousemove="toggleState(false)",
      @mouseleave="toggleState(true)"
    )
      BaseReveal(
        :in-viewport-once="true",
        :in-viewport-offset-top="-320",
        :action="revealSection"
      )
      .SectionInstagram__photos
        img.SectionInstagram__photo(
          v-for="(photo, index) in photos",
          :key="index",
          :src="photo",
          alt=""
        )
      .SectionInstagram__iconBlock
        .SectionInstagram__logo
          IconOberig(
            ref="SectionInstagramIconRef",
            width="93",
            height="94"
          )
        .SectionInstagram__label {{ p.instagramLabel }}
      .SectionInstagram__bg(:style="{ background: `url(/img/insta-cover.${webp_png})` }")
      .SectionInstagram__overlay(@mousemove="animateBackground($event)")
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import animatable from '../../../../mixins/animatable';
  import webpExtension from '../../../../mixins/webpExtension';
  import { mapGetters } from 'vuex';
  import { throttle } from 'lodash';
  import IconOberig from '../../../ui/IconOberig.vue';
  import svgicon from '../../../ui/BaseSvgIcon.vue';
  import BaseReveal from '../../../ui/BaseReveal.vue';

  @Component({
    components: { svgicon, BaseReveal, IconOberig },
    mixins: [animatable, webpExtension],
    computed: mapGetters(['p'])
  })
  export default class SectionInstagram extends Vue {
    /**
     * Revealed flag.
     *
     * @type {Boolean|Undefined}
     */
    revealed = undefined;

    /**
     * First-time animation flag.
     *
     * @type {Boolean|Undefined}
     */
    firstRun = undefined;

    /**
     * @return {Array<String>}
     */
    get photos() {
      return this.p.instagramImages;
    }

    /**
     * Animate-in instagram screen (icon, label).
     */
    revealSection() {
      // icon
      this.$refs.SectionInstagramIconRef.startAnimation();

      // label
      TweenMax.fromTo('.SectionInstagram__label', 1.1, {
        opacity: 0,
        y: '-=85'
      }, {
        opacity: 1,
        y: '+=85',
        onComplete: () => { this.revealed = true; }
      });
    }

    /**
     * Animate in/out logo and text and bg.
     *
     * @param {Boolean} hide - animate out if set to 'true'
     */
    toggleState(hide) {
      // dont run until reveal animation is finished
      if (!this.revealed) return;

      // dont animate-out until first animate-in was made (visual bug issue)
      if (hide && !this.firstRun) return;

      // remember first animate-in
      if (!this.firstRun) this.firstRun = true;

      if (!this.$refs.SectionInstagramIconRef) return;

      const { $el: icon, animationTimeline } = this.$refs.SectionInstagramIconRef;

      // toggle icon
      TweenMax.to(icon, 0.25, { ease: Power1.easeOut, opacity: hide ? 1 : 0 });
      if (animationTimeline) {
        hide ? animationTimeline.restart() : animationTimeline.pause();
      }

      // toggle text
      TweenMax.to('.SectionInstagram__label', 0.6, {
        ease: Power1.easeOut,
        y: hide ? 0 : -60
      });

      // toggle background
      TweenMax.to('.SectionInstagram__overlay', 1, { opacity: hide ? 0 : 1 });
    }

    /**
     * Animate background gradient on mouseover.
     *
     * @param {Object} event
     * @param {HTMLElement} event.target
     * @param {Number} event.pageX
     */
    animateBackground = throttle(({ target, pageX }) => {
      const blockOffsetLeft = target.parentNode.parentNode.offsetLeft;
      const x = ((pageX - blockOffsetLeft) / 2) - 330;
      TweenMax.to('.SectionInstagram__overlay', 0.8, { ease: Power0.easeNone, x });
    }, 50);
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  .SectionInstagram {
    position: relative;

    height: 420px;
    width: 1280px;

    max-width: 100%;

    margin: 60px auto 0 auto;

    background-color: grey;

    overflow: hidden;

    @media (width: 1280px) {
      max-width: none;
      margin-left: -40px;
    }

    @media (max-width: $minDesktop) {
      margin: 99px auto 0 -34px;
      max-width: none;
      width: calc(100% + 68px);
    }

    @media (max-width: $minTablet) {
      margin-left: 0;
      width: 100%;
    }

    > a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &__bg {
      position: absolute;

      width: 100%;
      height: 100%;

      left: 0;
      top: 0;

      background-size: cover;

      z-index: 1;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: -640px;

      width: 200%;
      height: 100%;

      z-index: 2;

      background: radial-gradient(
          circle at 50% 135%,
          white 0%,
          rgba(255, 255, 255, 1) 10%,
          rgba(255, 255, 255, 0.99) 30%,
          rgba(255, 255, 255, 0.001) 100%
      );
      background-size: 100% 100%;

      opacity: 0;
    }

    &__iconBlock {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;

      top: 135px;
      left: 50%;

      text-decoration: none;

      transform: translate3d(-50%, 0, 0);

      z-index: 3;
    }

    &__photos {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;

      width: 100%;
      height: 100%;
    }

    &__photo {
      flex-basis: 20%;
      height: 50%;
      width: 20%;

      @include object-fit(cover);

      @media (max-width: $minDesktop) and (orientation: portrait) {
        flex-basis: calc(100% / 3);
        width: calc(100% / 3);
      }

      @media (max-width: $minTablet) {
        flex-basis: 50%;
        width: 50%;
      }
    }

    &__logo {
      .st0, .st1 {
        stroke: #444344;
      }
    }

    &__label {
      display: inline-block;

      padding-top: 29px;

      width: 100%;

      color: #444344;
      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 26px;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-align: center;
    }

    &.js-animatable {
      .SectionInstagram {
        &__label {
          opacity: 0;
        }
      }
    }
  }
</style>
