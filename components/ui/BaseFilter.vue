<template lang="pug">
  .BaseFilter(:class="cssClassesObj")
    .BaseFilter__toggle(@click="toggleFilters")
      svg.BaseFilter__toggle-svg(
        xmlns="http://www.w3.org/2000/svg",
        viewBox="0 0 32.7 32.8",
        :class="noFilter ? '' : $style.filter"
      )
        linearGradient#BaseFilterGradient
          stop(offset="0%", stop-color="rgba(171, 140, 192, 0.75)")
          stop(offset="100%", stop-color="rgba(33, 116, 183, 0.75)")
        path(d="M23.8,2.7c10,3.4,7.9,17.1,6.9,20.6C29.8,26.8,25.4,35,11,30.6c-9.1-2.8-9.9-8.4-9.9-13.9 c0-5.5,4.1-12.1,11.1-14.5C17.8,0.2,18.5,0.9,23.8,2.7z")
      .BaseFilter__toggle-x
        span
        span
        span
      .BaseFilter__toggle-label {{ toggleLabel }}
    transition(name="fade")
      .BaseFilter__container(v-if="opened")
        .BaseFilter__container-inner
          .BaseFilter__column(
            v-for="(filterType, filterTypeName, index) in filterTypes",
            :key="index"
          )
            .BaseFilter__title(
              :class="[activeIndicator(index)]",
              @click="toggleCategory(index)"
            ) {{ filterType.title }}
            transition-group(name="fade")
              .BaseFilter__checkbox-wrapper(v-if="activeIndex === index || isMobile", :key="index")
                BaseCheckbox(
                  v-for="filter in filterType.items",
                  :key="filter.id",
                  :id="filter.label",
                  :value="filter.label",
                  :label="filter.label",
                  :isChecked="filter.active",
                  :action="handleFilterChange",
                  :actionArgs="[filter, filterTypeName]"
                )
        .BaseFilter__apply(@click="applyFilters(true)")
          ButtonRainbowGradient(
            :text="applyFiltersLabel",
            isHref
          )
        .BaseFilter__clear(@click="clearFilters") {{ clearFiltersLabel }}
    transition(name="fade")
      .BaseFilter__selected-container(v-if="appliedFilters.length > 0")
        .BaseFilter__selected-title {{ selectedLabel }}
        .BaseFilter__selected-inner
          .BaseFilter__selected(
            v-for="filter in appliedFilters",
            :key="filter.id",
            @click="handleFilterChange(filter, filter.filterTypeName, true)"
          )
            .gradient-text {{ filter.label }}
            .BaseFilter__selected-x
              span
              span
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import queryProductChange from '../../mixins/queryProductChange';
  import { Resp, css } from '../../modules/_helpers';
  import BaseCheckbox from './BaseCheckbox.vue';
  import ButtonRainbowGradient from './ButtonRainbowGradient.vue';

  @Component({
    components: { BaseCheckbox, ButtonRainbowGradient },
    props: {
      toggleLabel: {
        type: String,
        required: true
      },
      filtersData: {
        type: Object,
        required: true
      },
      categoryTitle: {
        type: String,
        required: true
      },
      stoneTitle: {
        type: String,
        required: true
      },
      metalTitle: {
        type: String,
        required: true
      },
      symbolTitle: {
        type: String,
        required: true
      },
      applyFiltersLabel: {
        type: String,
        required: true
      },
      clearFiltersLabel: {
        type: String,
        required: true
      },
      selectedLabel: {
        type: String,
        required: true
      }
    },
    mixins: [queryProductChange]
  })
  export default class BaseFilter extends Vue {
    /**
     * Filters split in columns
     *
     * @type {Object}
     */
    filterTypes = {};

    /**
     * Filters opened state
     *
     * @type {Boolean}
     */
    opened = false;

    /**
     * Active index indicator
     *
     * @type {Number}
     */
    activeIndex = 0;

    /**
     * Mobile indicator
     *
     * @type {Boolean}
     */
    isMobile = true;

    /**
     * Filter support indicator
     *
     * @type {Boolean}
     */
    noFilter = false;

    /**
     * Applied filters container
     *
     * @type {Array}
     */
    appliedFilters = [];

    /**
     * GSAP animation timeline
     *
     * @type {Object|Undefined}
     */
    filterAnimation = undefined;

    /**
     * @return {Object}
     */
    get cssClassesObj() {
      return {
        [css.active]: this.opened
      };
    }

    beforeMount() {
      const filtersDataCopy = { ...this.filtersData };

      this.filterTypes = {
        category: {
          title: this.categoryTitle,
          items: filtersDataCopy.categories
        },
        stone: {
          title: this.stoneTitle,
          items: filtersDataCopy.stones
        },
        metal: {
          title: this.metalTitle,
          items: filtersDataCopy.metals
        },
        symbol: {
          title: this.symbolTitle,
          items: filtersDataCopy.symbols
        }
      };
    }

    mounted() {
      this.appliedFilters = this.selectedFilters;

      this.noFilter = [
        'iPad',
        '9.1.3 Safari'
      ].some(v => navigator.userAgent.includes(v));
    }

    /**
     * Filters with 'active = true' field
     *
     * @return {Array}
     */
    get selectedFilters() {
      const selectedFilters = [];

      Object.keys(this.filterTypes).forEach((filterTypeName) => {
        const filterColumnFilters = this.filterTypes[filterTypeName].items;
        filterColumnFilters.forEach((filter) => {
          if (filter.active) selectedFilters.push({ ...filter, filterTypeName });
        });
      });

      return selectedFilters;
    }

    /**
     * Change filter value in specified column
     *
     * @param {Object} filter
     * @param {String} filter.alias
     * @param {String} filterTypeName
     * @param {Boolean} [immediate=false]
     */
    handleFilterChange({ alias }, filterTypeName, immediate = false) {
      const filterType = this.filterTypes[filterTypeName];

      filterType.items = filterType.items.map((filter) => {
        if (alias === filter.alias) {
          return {
            ...filter,
            active: !filter.active
          };
        }
        return filter;
      });

      if (immediate) this.applyFilters();
    }

    /**
     * Set all filters to false
     */
    clearFilters() {
      const filterTypesCopy = { ...this.filterTypes };

      Object.values(filterTypesCopy).forEach((filterType) => {
        filterType.items.forEach((filter) => {
          filter.active = false;
        });
      });

      this.filterTypes = filterTypesCopy;

      this.applyFilters(true);
    }

    /**
     * Generate query string, get new products and update DOM
     *
     * @param {Boolean} [close=false]
     */
    applyFilters(close = false) {
      let filtersQuery = '';

      this.appliedFilters = this.selectedFilters;

      // generate new filters query string
      Object.keys(this.filterTypes).forEach((filterTypeName) => {
        const filterColumnFilters = this.filterTypes[filterTypeName].items;
        let filterTypeQuery = '';

        if (filterColumnFilters.some(({ active }) => active)) {
          filtersQuery += filtersQuery ? `&${filterTypeName}=` : `${filterTypeName}=`;
        }

        filterColumnFilters.forEach(({ active, alias }) => {
          if (active) filterTypeQuery += filterTypeQuery ? `__${alias}` : alias;
        });

        filtersQuery += filterTypeQuery;
      });

      // load data and change items
      this.changeQuery(filtersQuery ? `?${filtersQuery}` : '', true);

      if (close) this.closeFilters();
    }

    /**
     * Open/close filters
     */
    toggleFilters() {
      this.opened ? this.closeFilters() : this.openFilters();
    }

    /**
     * Run filters open animation
     */
    openFilters() {
      this.opened = true;

      setTimeout(() => {
        TweenMax.to(window, 1, {
          scrollTo: {
            y: '.BaseFilter__container',
            offsetY: 80,
            autoKill: false
          },
          ease: Power1.easeInOut
        });
      }, 0);

      if (this.filterAnimation) return this.filterAnimation.play();

      this.filterAnimation = new TimelineMax()
        .to('#BaseFilterGradient stop', 0.6, {
          attr: {
            'stop-color': 'rgba(255, 255, 255, 1)'
          },
          ease: Power1.easeOut
        });
    }

    /**
     * Run filters close animation
     */
    closeFilters() {
      this.opened = false;

      this.filterAnimation.reverse();
    }

    /**
     * @return {Boolean}
     */
    toggleCategory(index) {
      if (Resp.isMobile) {
        this.activeIndex = index;
      }
    }

    /**
     * @return {Object}
     */
    activeIndicator(index) {
      if (Resp.isMobile) {
        this.isMobile = false;

        return { [css.active]: index === this.activeIndex };
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BaseFilter {
    @media (max-width: $minDesktop) {
      margin-bottom: 60px;
    }

    &__title {
      @include gradient-text(false);
      position: relative;

      margin-bottom: 29px;

      font-family: $MinionProDisp;
      font-size: 18px;
      font-weight: 400;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 2.7px;

      color: #3f4144;

      &:after {
        content: '';
        display: none;

        position: absolute;
        top: 5px;
        right: 0;

        width: 1px;
        height: 10px;

        box-shadow: inset 0 0 8px #5d6672;

        background-color: #00ffff;
        background-image: linear-gradient(to right, #506a8c 0%, #c95842 100%);

        @media (max-width: $minTablet) {
          display: block;
        }
      }

      &.js-active {
        padding-bottom: 35px;

        &:before {
          width: 100%;
        }
      }

      &:before {
        content: '';
        width: 0;

        position: absolute;
        bottom: 0;

        height: 1px;
        box-shadow: inset 0 0 8px #5d6672;
        background-color: #00ffff;
        background-image: linear-gradient(to right, #506a8c 0%, #c95842 100%);

        transition: width .3s ease-out;
        will-change: width;
      }

      @media (max-width: $minDesktop) {
        margin-bottom: 20px;
      }

      @media (max-width: $minTablet) {
        margin-bottom: 24px;

        font-size: 13px;
        line-height: 22px;
        letter-spacing: 1.99px;

        cursor: pointer;
      }
    }

    .BaseCheckbox__group {
      margin-bottom: 29px;

      @media (max-width: $minDesktop) {
        margin-right: 0;
      }
    }

    &.js-active {
      .BaseFilter {
        &__toggle:hover .BaseFilter__toggle-x span {
          &:nth-child(1) {
            transform: translate3d(4px, -7px, 0) rotate(-45deg);
          }
          &:nth-child(3) {
            transform: translate3d(-5px, -6px, 0) rotate(45deg);
          }
        }
      }
    }

    &__toggle {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;

      position: absolute;
      top: 11px;
      right: 142px;

      cursor: pointer;

      @media (min-width: $desktop) {
        &:hover {
          .BaseFilter {
            &__toggle {
              &-x {
                span {
                  &:nth-child(1) {
                    height: 8px;
                  }
                  &:nth-child(3) {
                    height: 16px;
                  }
                }
              }
              &-label {
                background-position: left 0;
              }
            }
          }
        }
      }

      @media (max-width: $minDesktop) and (min-width: $tablet) {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        right: 100px;

        .BaseFilter {
          &__toggle {
            &-x {
              top: 31px;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            &-label {
              width: 100%;
              margin-left: 0;
              margin-top: 21px;
            }
          }
        }
      }

      @media (max-width: $minTablet) {
        position: relative;
        z-index: 5;
        right: 0;

        width: calc(100% + 28px);
        margin-left: -14px;

        padding: 10px 15px;

        background-color: #ffffff;
      }

      .BaseFilter.js-active & {
        .BaseFilter {
          &__toggle {
            &-x {
              span {
                background: -webkit-linear-gradient(left, rgba(171, 140, 192, 0.75) 0%, rgba(33, 116, 183, 0.75) 65%);

                .js-iefix & {
                  background: rgba(171, 140, 192, 0.75) !important;
                }

                &:nth-child(1) {
                  height: 32px;
                  transform: translate3d(4px, -12px, 0) rotate(-45deg);
                }
                &:nth-child(2) {
                  opacity: 0;
                }
                &:nth-child(3) {
                  height: 32px;
                  transform: translate3d(-5px, -3px, 0) rotate(45deg);
                }
              }
            }
            &-label {
              background-position: left 0;
            }
          }
        }
      }

      &-svg {
        width: 61px;
        height: 62px;

        path {
          fill-rule: evenodd;
          clip-rule: evenodd;
          fill: url(#BaseFilterGradient);
        }
      }
      &-x {
        position: absolute;

        height: 16px;

        left: 27px;
        top: 51%;

        transform: translateY(-50%);

        font-size: 0;

        @media (max-width: $minTablet) {
          left: 42px;
        }

        span {
          display: inline-block;
          width: 1px;

          vertical-align: top;

          background-color: white;

          transform: translate3d(0, 0, 0);
          transition: height .4s ease-out, background .6s ease, transform .6s ease, opacity .1s ease;

          &:nth-child(1) {
            height: 16px;
          }
          &:nth-child(2) {
            height: 12px;
          }
          &:nth-child(3) {
            height: 8px;
          }
          &:not(:first-child) {
            margin-left: 3px;
          }
        }
      }
      &-label {
        font-family: $CalibriBold;
        font-size: 13px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.6px;

        margin-left: 30px;

        background: -webkit-linear-gradient(left, #50556b, #786266 33.3%, #786266 66.6%, #50556b 100%);
        background-size: 300% 100%;
        background-position: right 0;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        background-repeat: no-repeat;

        transition: background 1s ease;
      }
    }

    &__container {
      margin-bottom: 60px;
      padding: 52px 60px 60px 60px;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);
      background-color: #ffffff;

      @media (max-width: $minDesktop) {
        padding: 42px 50px 50px 50px;
      }

      @media (max-width: $minTablet) {
        width: calc(100% + 28px);
        margin-left: -14px;

        padding: 20px 15px 50px 15px;

        box-shadow: none;
      }

      &-inner {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        margin-bottom: 60px;

        @media (max-width: $minDesktop) {
          justify-content: flex-start;
          flex-direction: column;

          margin-bottom: 19px;
        }

        @media (max-width: $minTablet) {
          margin-bottom: 0;
        }
      }
    }

    &__column {
      @media (max-width: $minDesktop) {
        width: 100%;
        margin-bottom: 44px;

        &:last-child {
          margin-bottom: 40px;
        }
      }

      @media (max-width: $minTablet) {
        margin-bottom: 4px;

        &:last-child {
          .BaseFilter__checkbox-wrapper {
            margin-bottom: 0;
          }
        }
      }
    }

    &__checkbox-wrapper {
      @media (max-width: $minDesktop) {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
      }

      @media (max-width: $minTablet) {
        flex-direction: column;
        margin-bottom: 50px;
      }
    }

    .BaseCheckbox__group {
      @media (max-width: $minDesktop) {
        flex: 0 1 33%;
      }

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;
      }
    }

    &__apply,
    &__clear {
      display: inline-block;
    }

    &__apply {
      margin-right: 40px;

      @media (max-width: $minTablet) {
        display: block;
        width: 100%;

        margin-right: 0;
        text-align: center;
      }

      @media (max-width: $minTablet) {
        margin-top: 28px;
        margin-bottom: 31px;
      }
    }

    &__clear {
      @include gradient-text(false);

      font-family: $Calibri;
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      text-transform: uppercase;
      letter-spacing: 2.8px;

      cursor: pointer;

      @media (max-width: $minTablet) {
        display: block;
        width: 100%;

        margin-right: 0;
        text-align: center;
      }
    }

    &__selected {
      position: relative;
      display: inline-block;
      font-family: $CalibriBold;
      font-size: 14px;
      line-height: 30px;
      text-transform: uppercase;
      letter-spacing: 2.8px;

      cursor: pointer;

      padding-right: 20px;

      &:not(:last-child) {
        margin-right: 40px;
      }

      &-x {
        position: absolute;

        right: 0;
        top: 9px;

        transform: rotate(45deg);

        transition: transform .5s ease;

        span {
          position: absolute;
          display: inline-block;
          width: 1px;
          height: 15px;

          background: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

          &:first-child {
            transform: rotate(90deg);
          }

          &:last-child {
            left: -0.2px;
          }
        }
      }

      @media (min-width: $desktop) {
        &:hover {
          .BaseFilter__selected-x {
            transform: rotate(45deg) scale(1.3) translate3d(0px, -1.5px, 0);
          }
          .gradient-text {
            background-position: left 0;
          }
        }
      }

      &-title {
        font-family: $MinionProRegular;
        font-size: 18px;
        line-height: 28px;
        text-transform: uppercase;
        letter-spacing: 2.7px;

        margin-bottom: 24px;

        @include gradient-text(false);
      }

      &-container {
        margin-bottom: 56px;
        padding-left: 40px;

        @media (max-width: $minTablet) {
          margin-top: 56px;
          padding-left: 0;
        }
      }

      &-inner {
        max-height: 155px;

        @media (max-width: $minTablet) {
          max-height: none;
        }
      }
    }
  }

  // Vue animation from the box
  .fade-enter-active {
    transition: opacity .6s;
  }

  .fade-leave-active {
    transition: opacity .4s;

    @media (max-width: $minTablet) {
      transition: opacity 0s;
    }
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>


<style lang="scss" module>
  .filter {
    -webkit-filter: drop-shadow(1px -2px 16px rgba(30, 75, 120, 0.3));
    filter: drop-shadow(1px -2px 16px rgba(30, 75, 120, 0.3));
  }
</style>
