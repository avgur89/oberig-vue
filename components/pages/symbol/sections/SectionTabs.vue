<template lang="pug">
  section.SectionTabs
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )
    nav.SectionTabs__nav(:class="cssClassesObj")
      ul.SectionTabs__nav-list
        li.SectionTabs__nav-item.SectionTabs__nav-item-trigger(@click="toggleOpened", v-if="!isDesktop")
          .SectionTabs__nav-link {{ activeCategory.label }}
        li.SectionTabs__nav-item(
          v-for="(category, index) in symbolCategories",
          :key="index",
          :class="getActiveClass(category.alias)",
          @click="changeCategory(category)"
        )
          .SectionTabs__nav-link {{ category.label }}
    .SectionTabs__list(ref="SectionTabsListRef")
      nuxt-link.SectionTabs__item(
        v-for="symbol in symbols",
        :key="symbol.id",
        :to="generateSymbolUrl(symbol.alias)"
      )
        .SectionTabs__item-image-wrapper
          img.SectionTabs__item-image(:src="symbol.icon", alt="")
        .SectionTabs__item-title {{ symbol.label }}
        .SectionTabs__item-desc(v-html="symbol.content")
      .SectionTabs__item-dummy
      .SectionTabs__item-dummy
    .SectionTabs__load(v-if="hasMoreItems")
      ButtonRainbowGradient(
        @click.native="loadMoreSymbols",
        :text="t.load_more",
        isStatic
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl, Resp, css } from '../../../../modules/_helpers';
  import { getSymbols } from '../../../../api/symbols';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';

  @Component({
    components: { BaseReveal, ButtonRainbowGradient },
    computed: mapGetters(['p', 'pageData', 't', 'webpIsSupported'])
  })
  export default class SectionTabs extends Vue {
    /**
     * Opened state indicator (mobile)
     *
     * @type {Boolean}
     */
    opened = false;

    /**
     * Currently active category
     *
     * @type {Object}
     */
    activeCategory = {
      alias: '',
      label: ''
    };

    /**
     * Screen indicator
     *
     * @type {Boolean}
     */
    isDesktop = true;

    /**
     * Symbols in current category
     *
     * @type {Array}
     */
    symbols = [];

    /**
     * Upload more items button indicator (detects if there any items left on server)
     *
     * @type {Boolean}
     */
    hasMoreItems = false;

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.active]: this.opened && !this.isDesktop
      };
    }

    /**
     * @return {Array}
     */
    get symbolCategories() {
      return this.pageData.categories;
    }

    mounted() {
      this.isDesktop = Resp.isDesk;

      this.activeCategory = this.symbolCategories.find(category => (
        category.alias === this.$route.query.alias
      )) || {};

      this.symbols = this.pageData.models;

      this.hasMoreItems = this.symbols.length === 15;
    }

    /**
     * Close/open symbols menu (mobile)
     */
    toggleOpened() {
      this.opened = !this.opened;
    }

    /**
     * Creat route to category with selected symbol
     *
     * @param {String} alias
     * @return {String}
     */
    generateSymbolUrl(alias) {
      return generateUrl(this.$route.params.lang, `catalog?symbol=${alias}`);
    }

    /**
     * Detect active category
     *
     * @param {String} alias
     * @return {String}
     */
    getActiveClass(alias) {
      if (alias === this.activeCategory.alias) return css.active;
      return '';
    }

    /**
     * Change current symbols category
     *
     * @param {Object} category
     */
    changeCategory(category) {
      if (!Resp.isDesk) {
        this.opened = false;
      }

      if (category.alias === this.activeCategory.alias) return;

      this.activeCategory = category;

      this.loadCategorySymbols(category);
    }

    /**
     * Load specified category symbols
     *
     * @async
     * @param {Object} category
     * @param {String} category.alias
     */
    async loadCategorySymbols({ alias }) {
      const { lang } = this.$route.params;
      const { SectionTabsListRef } = this.$refs;
      const ease = Power1.easeOut;
      const animation = new Promise((onComplete) => {
        TweenMax.to(SectionTabsListRef, 0.4, { opacity: 0, ease, onComplete });
      });

      const [{ data, isEmpty }] = await Promise.all([
        getSymbols(lang, alias, false, this.webpIsSupported),
        animation
      ]);

      if (isEmpty) {
        this.hasMoreItems = false;
      }

      this.symbols = data;

      window.history.replaceState(
        '',
        '',
        `${window.location.pathname}?alias=${alias}`
      );

      TweenMax.to(SectionTabsListRef, 0.5, { opacity: 1, ease });
    }

    /**
     * Upload 3 more symbols
     *
     * @async
     */
    async loadMoreSymbols() {
      const { lang } = this.$route.params;
      const { alias } = this.activeCategory;
      const offset = this.symbols.length;

      const { data, isEmpty } = await getSymbols(lang, alias, offset, this.webpIsSupported);

      if (isEmpty) {
        this.hasMoreItems = false;
      }

      this.symbols.push(...data);
    }

    /**
     * Reveal tabs section
     */
    revealSection() {
      const settings = time => [
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: Power1.easeOut },
        time
      ];

      new TimelineMax()
        .set(this.$el, { opacity: 1 })
        // tabs
        .fromTo('.SectionTabs__nav', 0.8, ...settings(0))
        // tabs items
        .fromTo('.SectionTabs__item', 0.8, ...settings(0.25))
        // button
        .fromTo('.SectionTabs__load', 0.6, ...settings(0.25));
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionTabs {
    position: relative;

    margin-bottom: 140px;

    opacity: 0;

    @media (max-width: $minDesktop) {
      margin-bottom: 127px;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 89px;
    }

    &__nav {
      margin-bottom: 60px;

      @media (max-width: $minTablet) {
        width: calc(100% + 28px);

        margin-left: -14px;
      }

      &-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        padding: 0;
        margin: 0;

        list-style-type: none;

        @media (max-width: $minDesktop) {
          flex-direction: column;

          box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);
          background-color: #fff;
        }
      }

      &-item {
        position: relative;

        flex: 1 1 240px;
        height: 80px;

        display: flex;
        justify-content: center;
        align-items: center;

        box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);
        background-color: #fff;

        cursor: pointer;

        transition: background-color 0.5s ease, box-shadow .5s ease;

        @media (min-width: $desktop) {
          &.js-active {
            background-color: transparent;
            box-shadow: none;
          }
        }

        @media (max-width: $minDesktop) {
          flex: 1 1 auto;
          width: 100%;

          box-shadow: none;
          background-color: #fff;

          display: none;

          &-trigger {
            display: flex;
          }

          .SectionTabs__nav.js-active & {
            display: flex;

            .SectionTabs__nav-link:after {
              height: 100%;

              transition: height .45s ease-out;
            }
          }

          &:first-child {
            .SectionTabs__nav-link {
              //padding-right: 12px;

              &:after {
                content: '';
                display: block;

                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);

                width: 1px;
                height: 11px;
                background-color: #00ffff;
                background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);

                transition: height .25s ease-out;
              }
            }
          }
        }
      }

      &-link {
        @include gradient-text(false);
        display: inline-block;

        font-family: $Calibri;
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        color: #fff;
        text-decoration: none;
      }
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: $minTablet) {
        justify-content: center;
        align-items: center;
        flex-wrap: nowrap;
        flex-direction: column;
      }
    }

    &__item {
      flex: 0 1 33%;

      display: flex;
      flex-direction: column;
      align-items: center;

      margin-bottom: 55px;
      padding-right: 62px;

      text-align: center;
      text-decoration: none;

      &:nth-child(3n + 3) {
        padding-right: 0;
        flex: 0 1 calc(33% - 62px);
      }

      &:nth-last-of-type(-n + 3) {
        margin-bottom: 0;
      }

      @media (max-width: $minDesktop) {
        flex: 0 1 50%;

        &:nth-child(3n + 3) {
          padding-right: 42px;
          flex: 0 1 50%;
        }

        &:nth-child(even) {
          padding-right: 0;
          flex: 0 1 calc(50% - 42px);
        }

        &:nth-last-of-type(odd),
        &:nth-last-of-type(even) {
          margin-bottom: 55px;
        }

        &:nth-last-of-type(-n + 2) {
          margin-bottom: 0;
        }
      }

      @media (max-width: $minTablet) {
        &:nth-child(even),
        &:nth-child(odd) {
          flex: 1 1 auto;
          width: 100%;

          padding-right: 0;
          margin-bottom: 82px;
        }

        &:nth-last-of-type(odd),
        &:nth-last-of-type(even) {
          margin-bottom: 82px;
        }

        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
      }

      &-dummy {
        height: 0;
        flex: 0 1 33%;

        &:nth-child(3n + 3) {
          padding-right: 0;
          flex: 0 1 calc(33% - 62px);
        }

        @media (max-width: $minDesktop) {
          flex: 0 1 50%;

          &:nth-child(3n + 3) {
            padding-right: 62px;
            flex: 0 1 50%;
          }

          &:nth-child(even) {
            padding-right: 0;
            flex: 0 1 calc(50% - 62px);
          }
        }

        @media (max-width: $minTablet) {
          &:nth-child(even),
          &:nth-child(odd) {
            flex: 1 1 auto;
            width: 100%;

            padding-right: 0;
          }
        }
      }

      &-image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 160px;
        height: 160px;

        margin-bottom: 31px;
        border-radius: 100%;

        box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);
        background-color: transparent;
      }

      &-image {
        max-width: 58px;
        max-height: 58px;
      }

      &-title {
        @include gradient-text(false);

        margin-bottom: 23px;

        font-family: $MinionProDisp;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
        text-transform: uppercase;
        letter-spacing: 1.5px;

        color: #4d4d4d;

        @media (max-width: $minTablet) {
          margin-bottom: 16px;

          font-size: 25px;
          letter-spacing: 1.25px;
        }
      }

      &-desc {
        font-family: $Calibri;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;

        color: #444344;
      }
    }

    &__load {
      text-align: center;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";

  .ButtonRainbowGradient {
    @media (min-width: $desktop) {
      margin-top: 54px;
    }

    @media (max-width: $minDesktop) {
      margin-top: 54px;
    }

    @media (max-width: $minTablet) {
      margin-top: 54px;
    }
  }
</style>
