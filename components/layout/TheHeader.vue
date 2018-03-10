<template lang="pug">
  header.TheHeader(:class="cssClassesObject")
    .TheHeader__inner
      TheMenu(
        ref="AppMenuRef",
        :indexRouteUrl="indexRouteUrl",
        :isShortVersion="isShortVersion"
      )
      nuxt-link.TheHeader__logo(
        :to="indexRouteUrl",
        ref="TheHeaderLogoRef",
        aria-label="Home page"
      )
        BaseSvgIcon(
          icon="Oberig_logo",
          id="TheHeaderLogo",
          width="132px",
          height="22px",
          :fill="false"
        )
      .TheHeader__cart(:class="cartClassesObject")
        nuxt-link.TheHeader__cart-icon(:to="formalizationUrl")
          img#TheHeaderCartIcon(src="~/static/img/Symbol_Oberig_gradient.svg", alt="Oberig cart")
          BaseSvgIcon.TheHeader__cart-icon-circles(
            icon="socials-hover",
            width="60",
            height="58",
            :fill="false"
          )
        .TheHeader__cart-line
        .TheHeader__cart-text {{ cartText }}
      BaseLanguageSwitcher(ref="AppLanguageSwitcherRef", v-if="!isShortVersion")
</template>

<script>
  /**
   * @TODO: refactoring
   */

  import '~/assets/svg/dist/Oberig_logo';
  import '~/assets/svg/dist/Symbol_Oberig_gradient';
  import '../../assets/svg/dist/socials-hover';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { throttle } from 'lodash';
  import bus from '../../plugins/event-bus';
  import {
    SHOW_HEADER,
    HIDE_HEADER,
    PRELOADER_FINISHED,
    ANIMATION_FINISHED
  } from '../../modules/_events';
  import { css, generateUrl, Resp } from '../../modules/_helpers';
  import TheMenu from './TheMenu';
  import BaseSvgIcon from '../ui/BaseSvgIcon';
  import BaseLanguageSwitcher from '../ui/BaseLanguageSwitcher';

  @Component({
    components: { BaseLanguageSwitcher, TheMenu, BaseSvgIcon },
    computed: mapGetters(['animationIsFinished', 'philosophyVideoWasShown', 'cartText', 'cartHasProducts']),
    watch: {
      $route(next, prev) {
        const prevPageIsPersonal = prev.name.includes('personal');
        const nextPageIsCollection = next.name.includes('collection-');
        const nextPageIsFormalization = next.name.includes('formalization');
        const nextPageIsPhilosophy = next.name.includes('philosophy');

        if (nextPageIsPhilosophy) {
          this.hasGradient = false;
        }

        if (prevPageIsPersonal && !this.revealed) {
          setTimeout(this.revealHeader, 0);
        }

        if (nextPageIsCollection) {
          this.hasGradient = true;
          this.hideHeader();
        }

        if (nextPageIsFormalization && !this.cartTooltipWasShown) {
          this.showCartTooltip();
        }
      }
    }
  })
  export default class TheHeader extends Vue {
    /**
     * White gradient visibility indicator
     *
     * @type {Boolean}
     */
    hasGradient = false;

    /**
     * Header reveal state (shown or hidden)
     *
     * @type {Boolean}
     */
    revealed = false;

    /**
     * Cart one-time tooltip indicator
     *
     * @type {Boolean}
     */
    cartTooltipWasShown = false;

    /**
     * @return {String}
     */
    get formalizationUrl() {
      return generateUrl(this.$route.params.lang, 'formalization');
    }

    /**
     * @return {String}
     */
    get indexRouteUrl() {
      return this.$route.name.includes('lang') ? { name: 'lang' } : '/';
    }

    /**
     * @return {Object}
     */
    get cssClassesObject() {
      return {
        [css.gradient]: this.hasGradient,
        [css.fixed]: this.isFixed,
        [css.white]: this.isWhite
      };
    }

    /**
     * @return {Object}
     */
    get cartClassesObject() {
      return {
        [css.active]: this.cartHasProducts
      };
    }

    /**
     * Fixed state indicator
     *
     * @return {Boolean}
     */
    get isFixed() {
      const { name: route } = this.$route;
      const isHomePage = route === 'index' || route === 'lang';

      return isHomePage ? this.animationIsFinished : true;
    }

    /**
     * Show only header's logo ('personal' page)
     *
     * @return {Boolean}
     */
    get isShortVersion() {
      return this.$route.name.includes('personal');
    }

    /**
     * Paint every header's element in white color ('philosophy' page)
     *
     * @return {Boolean}
     */
    get isWhite() {
      const routeName = this.$route.name;
      const isPhilosophyPage = routeName.includes('philosophy');

      return (isPhilosophyPage && !this.philosophyVideoWasShown);
    }

    /**
     * Animate header when preloader is finished
     *
     * @return {Boolean}
     */
    get revealOnPreloaderFinish() {
      return !this.$route.name.includes('collection-');
    }

    mounted() {
      // run reveal animation after preloader (once)
      if (this.revealOnPreloaderFinish) bus.$on(PRELOADER_FINISHED, this.revealHeader);

      // set fixed position (index page animation is finished)
      bus.$on(ANIMATION_FINISHED, this.fixHeader);

      // apply/remove gradient on scroll
      window.addEventListener('scroll', throttle(() => {
        const isCollectionPage = this.$route.name.includes('collection-');
        const scrolledToFix = this.isFixed ? Resp.scrollTop > 0 : false;

        this.hasGradient = isCollectionPage || scrolledToFix;
      }, 100));

      // show/hide header
      bus.$on(SHOW_HEADER, this.showHeader);
      bus.$on(HIDE_HEADER, this.hideHeader);
    }

    /**
     * Set header's opacity to 1
     *
     * @param {Number} [delay]
     * @param {Number} [time]
     */
    showHeader(time = 1, delay = 0.5) {
      if (!this.revealed) return this.revealHeader();

      TweenMax.to(this.$el, time, { delay, autoAlpha: 1 });
    }

    /**
     * Set header's opacity to 0
     *
     * @param {Number} [time]
     */
    hideHeader(time = 0.4) {
      TweenMax.to(this.$el, time, { autoAlpha: 0 });
    }

    /**
     * Animate-in header elements.
     */
    revealHeader() {
      if (this.revealed) return;

      // set gradient immediately
      if (this.$route.name.includes('collection-')) this.hasGradient = true;

      const {
        AppMenuRef,
        TheHeaderLogoRef,
        AppLanguageSwitcherRef
      } = this.$refs;
      const reveal = (items, delay = 0, time = 1, y = 0) =>
        TweenMax.to(items, time, { delay, y, opacity: 1, force3D: true, rotation: 0.01 });

      // short version reveal
      if (this.isShortVersion) {
        TweenMax.set(this.$el, { opacity: 1 });
        !Resp.isDesk
          ? reveal(TheHeaderLogoRef.$el, 0, 1, '-50%')
          : reveal(AppMenuRef.icon, 0.1, 0.8);
        return;
      }

      // set revealed flag only when running desktop or mobile animation (not short)
      this.revealed = true;

      // mobile version reveal
      if (!Resp.isDesk) {
        TweenMax.set(this.$el, { opacity: 1 });
        reveal(TheHeaderLogoRef.$el, 0, 1, '-50%');
        reveal([AppLanguageSwitcherRef.$el, '.AppMenu']);
        return;
      }

      const appMenuLinks = AppMenuRef.linksDOM;
      const firstWave  = [appMenuLinks[2], appMenuLinks[3]];
      const secondWave = [appMenuLinks[1], appMenuLinks[4]];
      const thirdWave  = [appMenuLinks[0], AppLanguageSwitcherRef.$el];
      const animWaves  = [firstWave, secondWave, thirdWave];

      // start animation
      const revealHeader = new TimelineMax({ paused: true })
        .set(this.$el, { opacity: 1 });
      if (this.cartHasProducts) {
        TweenMax.set('.TheHeader__cart', { transition: 'none' });
        revealHeader.fromTo('.TheHeader__cart', 1,
          { autoAlpha: 0 },
          { autoAlpha: 1,
            onComplete() {
              const [cart] = [...this.target];
              cart.style = '';
            }
          },
          1
        );
      }
      revealHeader.play();
      reveal(AppMenuRef.icon, 0.1, 0.8);
      let staggerDelay = 0;
      animWaves.forEach((wave) => {
        reveal(wave, staggerDelay += 0.15, 0.65);
      });
    }

    /**
     * Fix header (animate-in and set fixed position + gradient).
     */
    fixHeader() {
      this.hasGradient = true;

      TweenMax.fromTo('.TheHeader__inner', 0.8, {
        y: '-110%',
        opacity: 0.6,
        rotation: 0.01,
        force3D: true
      }, {
        rotation: 0.01,
        delay: 0.3,
        y: '0%',
        opacity: 1
      });
    }

    /**
     * Show cart tooltip for user (for a few secs)
     */
    showCartTooltip() {
      this.cartTooltipWasShown = true;

      const elements = ['.TheHeader__cart-line', '.TheHeader__cart-text'];
      const onComplete = () => TweenMax.set(elements, { display: 'none' });

      new TimelineMax({ onComplete })
        .set(elements, { display: 'block' })
        // show elements
        .staggerFromTo(elements, 0.8,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, ease: Power1.easeOut },
          0.35,
          0
        )
        // hide after 5 sec
        .to(elements, 1, { autoAlpha: 0, ease: Power1.easeInOut }, 5.5);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';

  .TheHeader {
    position: absolute;
    height: 80px;
    width: calc(100% - 80px);

    opacity: 0;

    z-index: 6;

    @media (min-width: $largeDesktop) {
      width: calc(100% - 196px);
    }

    @media (min-width: 1896px) {
      width: 1700px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% - 68px);
      height: 92px;
    }

    @media (max-width: $minTablet) {
      width: calc(100% - 28px);
      height: 48px;
    }

    &.js-fixed {
      position: fixed;
    }

    &.js-gradient {
      &:before {
        opacity: 1;
        visibility: visible;

        transition: opacity 2s linear, visibility 0s ease 0s;
      }
    }

    &:before {
      content: '';

      width: 100vw;
      height: 100px;

      position: fixed;

      top: 0;
      left: 0;

      background: linear-gradient(180deg, white, rgba(255, 255, 255, 0.001));

      opacity: 0;
      visibility: hidden;

      transition: opacity 0.7s linear, visibility 0s ease 0.7s;

      @media (max-width: $minTablet) {
        height: 100px;

        @media (orientation: landscape) {
          height: 60px;
        }
      }
    }

    &__cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      position: absolute;
      right: 22px;
      top: 29.5px;

      width: 160px;

      text-decoration: none;

      opacity: 0;
      visibility: hidden;

      z-index: 3;

      transition: opacity 0.8s ease, visibility 0s ease .8s;

      &.js-active {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.8s ease;
      }

      @media (max-width: $minDesktop) {
        display: none;
      }

      &-line {
        width: 1px;
        height: 30px;
        background-color: #e1e0e4;
        margin: 33px 0;

        display: none;
      }

      &-text {
        width: 100%;
        color: #444344;
        font-family: $Calibri;
        font-size: 13px;
        line-height: 18px;
        text-align: center;

        display: none;
      }

      &-icon {
        position: relative;

        &-svg {
          position: relative;
          z-index: 3;
        }

        &-circles {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: 1px;
          transform: translate3d(-50%, -50%, 0);

          color: #cdcdcd;
          opacity: 0.24;

          z-index: 2;
        }
      }
    }

    &__inner {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      display: block;
      position: absolute;

      left: 50%;
      top: 50%;

      transform: translateY(40px) translateX(-50%) translateY(-50%);
      opacity: 0;

      @media (min-width: $desktop) {
        display: none;
      }

      &-single {
        transform: translateY(40px);
        opacity: 0;
      }
    }
  }
</style>

<style lang="scss">
  @import '../../assets/scss/variables';

  #TheHeaderCartIcon {
    height: 21px;
    width: 21px;
  }

  #TheHeaderLogo {
    fill: none;
    stroke: none;

    @media (max-width: $minTablet) {
      display: block;
      width: 122px !important;
    }

    .st0{fill:#444344;}
    .st1{fill:url(#XMLID_222_);}
    .st2{fill:url(#XMLID_333_);}
    .st3{fill:url(#XMLID_444_);}
    .st4{fill:url(#XMLID_555_);}
    .st5{fill:url(#XMLID_666_);}
    .st6{fill:url(#XMLID_777_);}
    .st7{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}

    .js-white & {
      .st0{fill:white;}
      .st1{fill:white}
      .st2{fill:white}
      .st3{fill:white}
      .st4{fill:white}
      .st5{fill:white}
      .st6{fill:white}
      .st7{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}
    }
  }

  .TheHeader__cart-icon-circles {
    path {
      opacity: 0;
      transform: scale(0.9);
      transform-origin: center center;

      transition: all .4s ease;

      .nuxt-link-active & {
        opacity: 1;
        transform: scale(1);

        &:nth-child(1) {
          transition: all .5s ease;
        }
        &:nth-child(2) {
          transition: all .5s ease 0.15s;
        }
        &:nth-child(3) {
          transition: all .5s ease 0.3s;
        }
      }
    }
  }
</style>
