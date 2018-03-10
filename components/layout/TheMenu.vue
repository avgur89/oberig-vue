<template lang="pug">
  nav.AppMenu(v-on-clickaway="closeMenu", :class="cssClassesObject")
    .AppMenu__open(@click="openMenu", v-if="!isShortVersion")
      span.show
      span.hide
      span.hide
    .AppMenu__inner
      .AppMenu__close(@click="closeMenu", v-if="!isShortVersion")
        span
        span
      // first 3 menu items (to the left from icon)
      nuxt-link.AppMenu__link(
        v-if="!isShortVersion",
        @click.native="closeMenu",
        v-for="(link, index) in linksAtLeft",
        :to="link.route",
        :key="index"
      )
        span.AppMenu__link-text.gradient-text-haswhite {{ link.label }}
        BaseSvgIcon.AppMenu__link-icon(
          icon="socials-hover",
          width="60",
          height="60",
          :fill="false"
        )
      // website logo
      nuxt-link.AppMenu__logo(
        :to="indexRouteUrl",
        ref="AppMenuIconRef"
      )
        BaseSvgIcon(
          icon="Oberig_logo",
          id="AppMenuLogo",
          width="132px",
          height="22px",
          :fill="false"
        )
      // the rest of menu items (to the right from icon)
      nuxt-link.AppMenu__link(
        v-if="!isShortVersion",
        @click.native="closeMenu",
        v-for="(link, index) in linksAtRight",
        :to="link.route",
        :key="index"
      )
        span.AppMenu__link-text.gradient-text-haswhite {{ link.label }}
        BaseSvgIcon.AppMenu__link-icon(
          icon="socials-hover",
          width="60",
          height="60",
          :fill="false"
        )
</template>

<script>
  import '../../assets/svg/dist/socials-hover';
  import '../../assets/svg/dist/Oberig_logo';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { mixin as clickaway } from 'vue-clickaway';
  import { css, Resp } from '../../modules/_helpers';
  import { take, takeRight } from 'lodash';
  import BaseSvgIcon from '../ui/BaseSvgIcon.vue';

  @Component({
    mixins: [clickaway],
    components: { BaseSvgIcon },
    props: {
      indexRouteUrl: {
        type: [String, Object],
        required: true
      },
      isShortVersion: {
        type: Boolean,
        default: false
      }
    },
    computed: mapGetters(['menu'])
  })
  export default class TheMenu extends Vue {
    /**
     * @return {HTMLElement}
     */
    get icon() {
      return this.$refs.AppMenuIconRef.$el;
    }

    /**
     * @return {Array<Object>}
     */
    get linksAtLeft() {
      return take(this.menu, 3);
    }

    /**
     * @return {Array<Object>}
     */
    get linksAtRight() {
      return takeRight(this.menu, this.menu.length - 3);
    }

    /**
     * @return {Array<HTMLElement>}
     */
    get linksDOM() {
      return [...this.$el.querySelectorAll('.AppMenu__link')];
    }

    /**
     * @return {Object}
     */
    get cssClassesObject() {
      return {
        [css.active]: this.opened,
        [css.single]: this.isShortVersion
      };
    }

    /**
     * @static
     * @return {Number}
     */
    static get calculatedLineWidth() {
      const fullWidth  = document.querySelector('.AppMenu__inner').offsetWidth;
      const difference = Resp.isTablet ? 32 : 28;
      return fullWidth - difference;
    }

    /**
     * Opened state flag.
     *
     * @type {Boolean}
     */
    opened = false;

    /**
     * Run animation and show menu itself.
     */
    openMenu() {
      this.animation = new TimelineMax()
        .to('.AppMenu__open span.show', 0.6, {
          ease: Power1.easeInOut,
          width: TheMenu.calculatedLineWidth
        })
        .staggerTo('.AppMenu__open span.hide', 0.35, {
          ease: Power1.easeInOut,
          width: 0
        }, 0.1, '0')
        .staggerTo('.AppMenu__close span', 0.4, {
          ease: Power1.easeInOut,
          x: 0,
          y: 0
        }, 0.15, '0.2');

      this.opened = true;
    }

    /**
     * Reverse animation and hide menu.
     */
    closeMenu() {
      if (!this.opened) return;

      this.animation.reverse();

      this.opened = false;
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';
  @import '../../assets/scss/mixins';

  .AppMenu {
    height: 100%;
    width: calc(100% - 13.2vw);

    text-align: center;

    position: relative;

    z-index: 3;

    &.js-single {
      width: 100%;

      .AppMenu__inner {
        justify-content: center;
      }
    }

    @media (max-width: $minDesktop) {
      position: relative;
      width: auto;
      height: auto;

      transform: translateY(-40px);
      opacity: 0;
    }

    @media (max-width: $minTablet) {
      z-index: 5 !important;
    }

    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      height: 100%;

      @media (max-width: $minDesktop) {
        flex-wrap: wrap;
        justify-content: center;
        position: absolute;

        width: auto;
        height: auto;

        left: -16px;
        top: 0;

        padding: 65px 38px 33px;

        z-index: 1;

        opacity: 0;
        visibility: hidden;

        transition:
          box-shadow .4s ease-out .4s,
          background-color .4s ease-out .4s,
          opacity .4s ease-out .4s,
          visibility 0s ease-out .8s;

        .AppMenu.js-active & {
          box-shadow: 0 4px 6px rgba(30, 75, 120, 0.2);
          background-color: #ffffff;
          opacity: 1;
          visibility: visible;

          transition:
            box-shadow .4s ease-out,
            background-color .4s ease-out,
            opacity .4s ease-out,
            visibility 0s ease-out 0s;
        }
      }

      @media (max-width: $minTablet) {
        width: 100vw;
        left: -14px;

        @media (orientation: landscape) {
          height: calc(100vh - 17.5px);
          overflow-y: scroll;
        }
      }
    }

    &__open {
      @media (min-width: $desktop) {
        display: none;
      }

      position: relative;

      width: 42px;
      height: 9px;

      z-index: 2;

      span {
        display: inline-block;
        position: absolute;

        height: 1px;

        left: 0;

        background: #444344;

        .js-white & {
          background-color: white;
        }

        &:nth-child(1) {
          width: 42px;
          top: 0;

          @media (max-width: $minTablet) {
            width: 40px;
          }
        }
        &:nth-child(3) {
          width: 17px;
          top: 8px;
        }
        &:nth-child(2) {
          width: 26px;
          top: 4px;
        }
      }
    }

    &__close {
      position: absolute;

      width: 15px;
      height: 15px;

      left: 50%;
      top: 30px;

      transform: translateX(-50%);

      overflow: hidden;

      span {
        position: absolute;

        display: block;
        background-color: #444344;

        width: 18px;
        height: 1px;

        left: -2px;

        &:first-child {
          transform: rotate(45deg) translate3d(-18px, -1px, 0);
          bottom: 50%;
        }

        &:last-child {
          transform: rotate(-45deg) translate3d(-22px, -1px, 0);
          top: calc(50% - 1px);
        }
      }
    }

    &__logo {
      margin: 0 55px;

      transform: translateY(40px);
      opacity: 0;

      @media (max-width: $minDesktop) {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        z-index: -10;
        display: none;
      }
    }

    &__link {
      position: relative;
      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 24px;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: 2.8px;

      @media (min-width: $desktop) {
        transform: translateY(-40px);
        opacity: 0;
      }

      @media (max-width: $minDesktop) {
        display: block;
        white-space: nowrap;

        .gradient-text-haswhite {
          @include gradient-text();
        }

        &:not(:nth-child(2)) {
          margin-top: 22px;
        }
      }

      @media (max-width: $minTablet) {
        width: 100%;
      }

      &-text {
        position: relative;
        z-index: 2;

        .nuxt-link-active & {
          background-position: left 0;
        }
      }

      &-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);

        color: #cdcdcd;
        opacity: 0.3;

        z-index: 1;

        @media (max-width: $minDesktop) {
          display: none;
        }
      }
    }
  }
</style>

<style lang="scss">
  #AppMenuLogo {
    fill: none;
    stroke: none;

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

  .AppMenu__link-icon {
    path {
      opacity: 0;
      transform: scale(0.6);
      transform-origin: center center;

      transition: opacity .7s ease, transform 0s ease .7s;

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
