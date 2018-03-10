<template lang="pug">
  footer.TheFooter(
    :class="cssClassesObj",
    v-if="footerExists"
  )
    .TheFooter__links(v-if="hasLinks")
      .TheFooter__links-column
        .TheFooter__links-title {{ links.servicesLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.howToChooseSize") {{ links.howToChooseSizeLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.howToChooseJewel") {{ links.howToChooseJewelLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.warranty") {{ links.warrantyLabel }}
      .TheFooter__links-column
        .TheFooter__links-title {{ links.boutiquesLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.findBoutique") {{ links.findBoutiqueLabel }}
      .TheFooter__links-column
        .TheFooter__links-title {{ links.orderOnlineLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.howToOrder") {{ links.howToOrderLable }}
      .TheFooter__links-column
        .TheFooter__links-title {{ links.policiesLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.customerCare") {{ links.customerCareLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.privacyPolicy") {{ links.privacyPolicyLabel }}
        nuxt-link.TheFooter__links-item.gradient-text(:to="linkUrls.cookies") {{ links.cookiesLabel }}
      .TheFooter__links-column
        .TheFooter__links-title {{ links.followUsLabel }}
        a.TheFooter__links-item.gradient-text(
          v-for="(social, index) in socials",
          :key="index",
          :href="social.link",
          target="_blank",
          rel="noopener"
        ) {{ social.label }}
    .TheFooter__left
      div(@click="handleLogoClick")
        IconOberig.TheFooter__icon(
          width="54",
          height="54"
        )
      .TheFooter__copyright {{ copyright }}
    .TheFooter__center(v-if="!hasLinks")
      a.TheFooter__social(
        v-for="(social, index) in socials",
        :key="index",
        :href="social.link",
        target="_blank",
        rel="noopener",
        @mouseenter="socialMouseover($event, false)",
        @mouseleave="socialMouseover($event, true)"
      )
        .TheFooter__social-long {{ social.label }}
        // TEMPORARY
        BaseSvgIcon.TheFooter__social-short(
          :icon="index === 0 ? 'facebook' : index === 1 ? 'youtube' : 'instagramm'"
        )
        BaseSvgIcon.TheFooter__social-icon(
          icon="socials-hover",
          width="60",
          height="60",
          :fill="false"
        )
    .TheFooter__right
      .TheFooter__madeBy {{ madeBy }}
      a.TheFooter__vintage(
        href="https://vintage.agency/",
        target="_blank",
        rel="noopener",
        aria-label="Vintage Web Production",
        @mouseenter="vintageMouseover(false)",
        @mouseleave="vintageMouseover(true)"
      )
        svg(style="position: absolute;", height="0", width="0", viewbox="0 0 70 15")
          defs
            linearGradient(id="vintageGradient")
              stop(offset="0%", stop-color="#ab8cc0")
              stop(offset="0%", stop-color="#2174b7")
              stop(offset="0%", stop-color="#444344")
        BaseSvgIcon(
          icon="Vintage_logo",
          id="Vintage_logo",
          width="69",
          height="15",
          :fill="false"
        )
        BaseSvgIcon(
          icon="Vintage_logo",
          width="69",
          height="15",
          id="Vintage_logo_safari",
          :fill="false"
        )
</template>

<script>
  /**
   * @TODO: social items: rework API and rewrite component
   */

  import '../../assets/svg/dist/Vintage_logo';
  import '../../assets/svg/dist/socials-hover';
  import '../../assets/svg/dist/facebook';
  import '../../assets/svg/dist/youtube';
  import '../../assets/svg/dist/instagramm';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import bus from '../../plugins/event-bus';
  import { mapGetters } from 'vuex';
  import { reverse, isEqual } from 'lodash';
  import AnchorScrollController from '../../modules/AnchorScrollController';
  import { Resp, generateUrl, css } from '../../modules/_helpers';
  import {
    PRELOADER_FINISHED,
    SET_FOOTER_STATE
  } from '../../modules/_events';
  import IconOberig from '../ui/IconOberig.vue';
  import BaseSvgIcon from '../ui/BaseSvgIcon.vue';

  @Component({
    components: { IconOberig, BaseSvgIcon },
    computed: mapGetters(['footer', 'preloaderIsFinished'])
  })
  export default class TheFooter extends Vue {
    /**
     * Remove links from footer (when set to true)
     *
     * @type {Boolean}
     */
    linksRemoved = false;

    /**
     * Header opacity status
     *
     * @type {Boolean}
     */
    hidden = true;

    /**
     * @return {String}
     */
    get copyright() {
      return this.footer.copyright;
    }

    /**
     * @return {String}
     */
    get links() {
      return this.footer.items;
    }

    /**
     * @return {Array<Object>}
     */
    get socials() {
      return this.footer.socialNetworks;
    }

    /**
     * @return {String}
     */
    get madeBy() {
      return this.footer.madeBy;
    }

    /**
     * @return {Object}
     */
    get linkUrls() {
      const [
        howToOrder,
        findBoutique,
        howToChooseSize,
        howToChooseJewel,
        warranty,
        customerCare,
        privacyPolicy,
        cookies
      ] = [
        'how-to-order',
        'boutiques',
        'services#TabsProductCategory',
        'services#TabsStonesCategory',
        'services#TabsGuaranteeCategory',
        'cookies#CookiesCustomerCare',
        'cookies#CookiesPrivacyPolicy',
        'cookies#CookiesCookie'
      ].map(link => generateUrl(this.$route.params.lang, link));

      return {
        howToOrder,
        findBoutique,
        howToChooseSize,
        howToChooseJewel,
        warranty,
        customerCare,
        privacyPolicy,
        cookies
      };
    }

    /**
     * @return {Boolean}
     */
    get isIndexPage() {
      const routeName = this.$route.name;
      return isEqual(routeName, 'index') || isEqual(routeName, 'lang');
    }

    /**
     * @return {Boolean}
     */
    get hasLinks() {
      if (this.linksRemoved) return false;

      return !this.isIndexPage;
    }

    /**
     * @return {Boolean}
     */
    get hasLine() {
      const routeName = this.$route.name;

      return routeName && [
        'boutiques',
        'collections',
        'collection',
        'product',
        'symbol',
        'personal',
        'catalog',
        'cookies'
      ].some(route => routeName.includes(route));
    }

    /**
     * @return {Boolean}
     */
    get footerExists() {
      const routeName = this.$route.name;

      return routeName && ![
        'formalization',
        'constructor'
      ].some(route => routeName.includes(route));
    }

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.full]: this.hasLinks,
        [css.line]: this.hasLine,
        [css.hidden]: this.hidden
      };
    }

    mounted() {
      // detect screen and remove links if needed
      if (!Resp.isDesk) this.linksRemoved = true;

      // safari hacks for logo hover animation
      if (Resp.isSafari) {
        new TimelineMax()
          .set('#vintageGradient stop:nth-child(1)', { attr: { offset: '50%' } })
          .set('#vintageGradient stop:nth-child(2)', { attr: { offset: '100%' } })
          .set('.TheFooter .svg-icon:last-child', { display: 'block' })
          .set('.TheFooter .svg-icon:first-child', {
            fillOpacity: 0,
            stroke: 'transparent'
          });
      }

      if (Resp.isIos) {
        TweenMax.set('.TheFooter .svg-icon:last-child', { top: '4px' });
      }

      // reveal footer
      this.preloaderIsFinished
        ? this.toggleFooterVisibility()
        : bus.$on(PRELOADER_FINISHED, this.toggleFooterVisibility);

      bus.$on(SET_FOOTER_STATE, this.toggleFooterVisibility);
    }

    destroyed() {
      bus.$off(SET_FOOTER_STATE, this.toggleFooterVisibility);
      bus.$off(PRELOADER_FINISHED, this.toggleFooterVisibility);
    }

    /**
     * Change footer's opacity state to opposite
     *
     * @param {Boolean} [state=true]
     */
    toggleFooterVisibility(state = false) {
      this.hidden = state;
    }

    /**
     * Handle oberig icon click.
     * If the current route is 'home' - scroll to the top of the page.
     * Else - navigate to the home page.
     */
    handleLogoClick() {
      if (this.isIndexPage) {
        TweenMax.to(window, 1.5, { scrollTo: { y: 0, autoKill: false }, ease: Power3.easeInOut });
        if (Resp.isDesk) AnchorScrollController.swapListeners();
      } else {
        this.$router.push(generateUrl(this.$route.params.lang));
      }
    }

    /**
     * Animate social link (show/hide svg-ornament, change/restore text).
     *
     * @param {Object} event
     * @param {HTMLElement} event.target
     * @param {Boolean} hide - run 'hide' animation if set to 'true'
     */
    socialMouseover({ target }, hide) {
      if (Resp.isIE) return;

      const link      = target.closest('.TheFooter__social');
      const longText  = link.querySelector('.TheFooter__social-long');
      const shortText = link.querySelector('.TheFooter__social-short');

      let paths  = [...link.querySelectorAll('path')];
      let params = [
        { transformOrigin: 'center center', opacity: 0, scale: 0.4 },
        { transformOrigin: 'center center', opacity: 1, scale: 1 }
      ];

      if (hide) {
        paths = reverse(paths);
        params = reverse(params);
      }

      // animate circles
      TweenMax.killTweensOf(paths);
      TweenMax.staggerFromTo(paths, 0.2, ...params, 0.1);

      // animate text
      TweenMax.to(longText, 0.5, {
        opacity: hide ? 1 : 0,
        y: hide ? '0%' : '-150%'
      });
      TweenMax.to(shortText, 0.5, {
        opacity: hide ? 0 : 1,
        y: hide ? '50%' : '-50%'
      });
    }

    /**
     * Animate gradient group offset
     *
     * @param {Array} gradients
     * @param {Boolean} hide
     */
    animateGradient(gradients, hide) {
      gradients.forEach(({ id, percent }) => {
        TweenMax.to(`#vintageGradient stop:nth-child(${id})`, 0.6, {
          attr: { offset: hide ? '0%' : `${percent}%` },
          ease: Power1.easeInOut
        });
      });
    }

    /**
     * Animate in/out vintage logo gradient.
     *
     * @param {Boolean} hide - hide gradient if set to 'true'
     */
    vintageMouseover(hide) {
      if (Resp.isSafari) {
        TweenMax.to('#Vintage_logo', 0.75, {
          fillOpacity: hide ? 0 : 1
        });
        return;
      }

      const gradients = [
        { id: 1, percent: 50 },
        { id: 2, percent: 100 }
      ];
      this.animateGradient(gradients, hide);
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';
  @import '../../assets/scss/mixins';

  // IE fix
  #app.js-iefix .TheFooter__social-long {
    color: #50556b;

    transition: color 1s ease;

    @media (min-width: 1200px) {
      &:hover {
        color: #ab8cc0;
      }
    }
  }

  .TheFooter {
    position: relative;

    width: 1200px;
    margin: 60px auto;

    z-index: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 100%;

    transition: opacity 0.5s ease, padding 0s ease 0.5s;

    @media (min-width: $largeDesktop) {
      width: 1280px;
    }

    @media (max-width: $minDesktop) {
      display: block;
    }

    &.js-full {
      flex-wrap: wrap;

      .TheFooter {
        &__social {
          margin-left: 0;
          color: #575d71;
          margin-right: 60px;

          &:not(:first-child) {
            margin-top: 25.5px;
          }
        }
      }
    }

    &:not(.js-full) {
      .TheFooter {
        &__social {
          &-long {
            @include gradient-text(false);
          }
        }
      }
    }

    &:before {
      content: '';
      position: absolute;

      top: 0;
      left: 0;

      width: 100%;
      height: 1px;

      background-color: #575d71;

      opacity: 0;

      transition: opacity 0.1s ease 0.5s;
    }

    &.js-line {
      padding-top: 53px;

      &:before {
        opacity: 0.3;
      }
    }

    &.js-hidden {
      opacity: 0;
    }

    &__links {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 36px;

      width: 100%;

      &-column {
        display: inline-block;
      }

      &-title {
        color: #a5a5a5;
        font-family: $Calibri;
        font-size: 16px;
        line-height: 26px;
        margin-bottom: 13px;
      }

      &-item {
        display: block;

        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 49px;
        text-transform: uppercase;
        letter-spacing: 2.8px;
        text-decoration: none;
      }
    }

    &__icon {
      cursor: pointer;
      opacity: 1;

      .st0{fill:#434243;stroke:none;}
      .st1{fill:none;stroke:#444344;stroke-miterlimit:10;stroke-width: 2px;}
    }

    &__left,
    &__center,
    &__right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transform: translateZ(0);

      @media (max-width: $minDesktop) {
        justify-content: center;
        flex-wrap: wrap;
      }
    }

    &__center {
      @media (min-width: $minDesktop) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      @media (max-width: $minDesktop) {
        margin-top: 47px;
      }
      @media (max-width: $minTablet) {
        flex-wrap: nowrap;
        margin-top: 50px;
      }
    }

    &__right {
      @media (max-width: $minDesktop) {
        margin-top: 50px;
      }
    }

    &__copyright {
      color: #a5a5a5;
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      margin-left: 30px;

      @media (max-width: $minDesktop) {
        margin-left: 0;
        width: 100%;
        text-align: center;
        margin-top: 13px;
      }
    }

    &__social {
      position: relative;

      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      text-decoration: none;

      @media (max-width: $minDesktop) {
        letter-spacing: 2.7px;
        right: -2px;
      }

      &:not(:first-child) {
        margin-left: 58px;

        @media (max-width: $minDesktop) {
          margin-left: 57px;
        }

        @media (max-width: $minTablet) {
          margin-left: 20px;
        }
      }

      &-icon {
        position: absolute;

        left: 50%;
        top: 50%;

        padding: 1px;

        transform: translate3d(-50%, -50%, 0);

        stroke: #cdcdcd;

        opacity: 0.35;

        z-index: -1;
      }

      &-short {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-55%, 50%, 0) scale(0.9);
        opacity: 0;

        fill: #50556b;

        z-index: 1;
      }
    }

    &__vintage {
      position: relative;

      .svg-icon:last-child {
        display: none;
        position: absolute;
        top: 2px;
        left: 0;
        z-index: -1;
      }

      @media (max-width: $minDesktop) {
        margin-left: -2px;
      }
    }

    &__madeBy {
      color: #a5a5a5;
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      margin-right: 30px;

      @media (max-width: $minDesktop) {
        display: none;
      }
    }
  }
</style>

<style lang="scss">
  @import '../../assets/scss/variables';

  #Vintage_logo_safari {
    stroke: none;

    path {
      fill: #444344;
    }
  }
  #Vintage_logo {
    stroke: none;

    margin-top: -2px;

    path {
      fill: url(#vintageGradient);
    }
  }

  .TheFooter {
    &__social {
      &-icon {
        path {
          opacity: 0;
        }
      }
    }
  }
</style>
