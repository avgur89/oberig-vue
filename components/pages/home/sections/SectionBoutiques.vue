<template lang="pug">
  section.SectionBoutiques#SectionBoutiques(:class="cssClassesObject")
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-100",
      :action="revealSection"
    )
    div(
      @mouseenter="onMouseouver(false)",
      @mouseleave="onMouseouver(true)"
    )
      nuxt-link.SectionBoutiques__link(:to="boutiqueUrl")
        .SectionBoutiques__link-text.gradient-text-nohover(
          ref="SectionBoutiquesLinkTextRef"
        ) {{ p.labelBoutiquesAddreses }}
        BaseSvgIcon.SectionBoutiques__link-icon(
          icon="boutiques-link",
          width="133",
          height="160",
          :fill="false"
        )
    nuxt-link.SectionBoutiques__city.gradient-text--bright(
      v-for="(city, index) in cities",
      :key="index",
      :to="boutiqueUrl"
      v-if="city.is_open === 1"
    ) {{ city.city_label }}
    .SectionBoutiques__city.SectionBoutiques__city-disabled(
      v-for="(city, index) in cities",
      :key="index",
      :title="t.open_soon_label",
      v-if="city.is_open === 0"
    ) {{ city.city_label }}
</template>

<script>
  /**
   * Was used after collections block (before instagram w/120px mt)
   * (removed because of 1 collections instead of 4)
   */

  import '../../../../assets/svg/dist/boutiques-link';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import animatable from '../../../../mixins/animatable';
  import { mapGetters } from 'vuex';
  import {
    getPaths,
    Resp,
    swapArrayElements,
    generateUrl
  } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  @Component({
    mixins: [animatable],
    components: { BaseReveal, BaseSvgIcon },
    computed: mapGetters(['p', 'pageData', 't'])
  })
  export default class SectionBoutiques extends Vue {
    /**
     * @return {String}
     */
    get boutiqueUrl() {
      return generateUrl(this.$route.params.lang, 'boutiques');
    }

    /**
     * @return {String}
     */
    get cities() {
      return this.pageData.boutiques;
    }

    /**
     * @return {Array<HTMLElement>}
     */
    get paths() {
      return [...this.$el.querySelectorAll('path')];
    }

    /**
     * @return {Array<HTMLElement>}
     */
    get innerPaths() {
      return getPaths(this.paths, id => id !== 2);
    }

    mounted() {
      // transform circles on mobile
      if (!Resp.isDesk) {
        TweenMax.staggerTo(this.innerPaths, 0, { cycle: { x: [35, 22.5, 12] } }, 0.1);
      }
    }

    /**
     * Animate-in boutiques screen (label, cities).
     */
    revealSection() {
      // link
      this.revealLink();

      // cities
      TweenMax.staggerFromTo('.SectionBoutiques__city', 0.65, {
        opacity: 0,
        y: -100
      }, {
        delay: 0.25,
        ease: Power1.easeOut,
        opacity: 1,
        y: 0
      }, 0.2);
    }

    /**
     * Animate (reveal) link.
     */
    revealLink() {
      const { paths, $refs: { SectionBoutiquesLinkTextRef } } = this;
      const revealLinkAnimation = new TimelineMax();

      revealLinkAnimation
        // text
        .fromTo(SectionBoutiquesLinkTextRef, 0.65, {
          opacity: 0,
          y: '-60px'
        }, {
          y: 0,
          opacity: 1
        }, 0)
        // circles
        .staggerFromTo(swapArrayElements(paths, 2, 3), 0.5, {
          scale: 0.4,
          opacity: 0
        }, {
          ease: Power1.easeOut,
          scale: 1,
          opacity: 1
        }, 0.15, 0.1);
    }

    /**
     * Animate in/out link.
     */
    onMouseouver(hide) {
      const { innerPaths, $refs: { SectionBoutiquesLinkTextRef } } = this;
      const onMouseoverAnimation = new TimelineMax();

      onMouseoverAnimation
        // circles
        .staggerTo(innerPaths, 0.5, hide ? { x: 0 } : { cycle: { x: [35, 22.5, 12] } }, 0.1, 0)
        // text
        .to(SectionBoutiquesLinkTextRef, 0.6, { x: hide ? '0%' : -20 }, 0);
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/mixins";
  @import "../../../../assets/scss/variables";

  #app:not(.js-iefix) {
    .SectionBoutiques.js-animatable {
      .SectionBoutiques__link-text {
        opacity: 0;
      }
      .SectionBoutiques__link-icon {
        path {
          opacity: 0;
        }
      }
      .SectionBoutiques__city {
        opacity: 0;
      }
    }
  }

  .SectionBoutiques {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 124px auto 0 auto;

    max-width: 1280px;

    @media (max-width: $minDesktop) {
      display: block;
      margin: 118px auto 0 auto;
    }

    @media (max-width: $minTablet) {
      margin-top: 96px;
    }

    .js-iefix & {
      > div:first-of-type {
        display: none;
      }
    }

    a {
      text-decoration: none;
    }

    &__link {
      display: flex;
      align-items: center;

      @media (max-width: $minDesktop) {
        justify-content: center;
      }

      &-text {
        position: relative;

        font-family: $MinionProRegular;
        font-size: 18px;
        font-weight: 400;
        line-height: 23px;
        text-transform: uppercase;
        letter-spacing: 2.7px;

        z-index: 1;

        @media (max-width: $minTablet) {
          font-size: 12px;
          line-height: 18px;
          letter-spacing: 2px;
        }
      }

      &-icon {
        position: absolute;

        left: -20px;
        top: 50%;

        transform: translate3d(0, -50%, 0);

        opacity: 0.6;

        path {
          stroke: #cdcdcd;
        }

        @media (max-width: $minDesktop) {
          left: calc(50% + 3px);
          top: 7px;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }

    &__city {
      font-family: $MinionProRegular;
      font-size: 50px;
      line-height: 65px;
      text-transform: uppercase;

      margin-top: 5px;

      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      color: #736d7b;

      &-disabled {
        cursor: default;
        color: #57525d;
      }

      @media (min-width: $desktop) {
        letter-spacing: -0.3px;
      }

      @media (min-width: $largeDesktop) {
        &:not(:last-child) {
          margin-right: -35px;
        }

        &:first-child {
          margin-left: 2.5vw;
        }
      }

      @media (max-width: $minDesktop) {
        position: relative;
        display: block;
        width: 100%;
        text-align: center;

        z-index: 2;

        &:nth-child(3) {
          margin-top: 47px;
        }

        &:not(:nth-child(3)) {
          margin-top: 8px;
        }
      }

      @media (max-width: $minTablet) {
        font-size: 35px;
        line-height: 45px;

        &:not(:nth-child(3)) {
          margin-top: 19px;
        }
      }
    }
  }
</style>
