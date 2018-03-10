<template lang="pug">
  .TabsItem(:class="[cssTabActive]")
    ButtonTabsIcon(
      :toggleTab="toggleTab",
      :icon="iconName",
      :width="iconWidth",
      :height="iconHeight",
      :text="tabTitle"
    )
    ul.TabsItem__list(
      :style="{ height: isActive ? 'auto' : 0, 'margin-top': isActive ? '30px' : '0' }",
      ref="TabsItemListRef"
    )
      li.TabsItem__item(v-for="(tab, index) in tabs", :key="tab.id")
        span.TabsItem__link(
          @click="toggleClass(index)",
          :class="[activeIndicator(index, tab.label)]"
        ) {{ tab.label }}
        span.TabsItem__stripe
</template>

<script>
  import '~/assets/svg/dist/size_icon';
  import '~/assets/svg/dist/stones_icon';
  import '~/assets/svg/dist/Symbol_Oberig';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import Scrollbar from 'smooth-scrollbar';
  import bus from '../../../../plugins/event-bus';
  import { ACTIVE_TAB_INDEX, TAB_OPEN } from '../../../../modules/_events';
  import { Resp, css } from '../../../../modules/_helpers';
  import { every } from 'lodash';
  import ButtonTabsIcon from '../../../ui/ButtonTabsIcon.vue';

  /**
   * Scrolling indicator, used to prevent multiple changes
   *
   * @type {Boolean}
   */
  let isScrolling = false;

  @Component({
    components: { ButtonTabsIcon },
    props: {
      tabs: {
        type: Array,
        required: true,
        validator: tabs => every(tabs, tab => !!tab.label)
      },
      iconName: {
        type: String,
        required: true
      },
      iconWidth: {
        type: String,
        required: true
      },
      iconHeight: {
        type: String,
        required: true
      },
      tabTitle: {
        type: String,
        required: true
      },
      tabActive: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        required: true
      },
      scrollTarget: {
        type: String,
        required: true
      }
    },
    computed: mapGetters(['pageData', 'p'])
  })
  export default class TabsItem extends Vue {
    /**
     * Active index indicator
     *
     * @type {Number}
     */
    activeIndex = 0;

    /**
     * Active state indicator
     *
     * @type {Boolean}
     */
    isActive = this.tabActive;

    /**
     * Currently scrolling to section
     *
     * @type {Boolean}
     */
    scrolling = false;

    /**
     * Smooth-scrollbar instance
     *
     * @type {Object}
     */
    scrollbar = {};

    /**
     * @return {Object}
     */
    get cssTabActive() {
      return { [css.active]: this.isActive };
    }

    mounted() {
      bus.$on(TAB_OPEN, this.tabEventListener);

      this.scrollbar = Scrollbar.init(this.$refs.TabsItemListRef);
    }

    destroyed() {
      bus.$off(TAB_OPEN, this.tabEventListener);

      this.scrollbar.destroy();
    }

    /**
     * Listen for tab-event ann open tab
     *
     * @param {String} label
     * @param {Boolean} [isScrollSpyEvent]
     */
    tabEventListener(label, isScrollSpyEvent = false) {
      if (isScrollSpyEvent && isScrolling) return;

      if (isScrollSpyEvent) {
        this.isActive = label === this.label;
      } else {
        this.isActive = !(label === this.label) ? false : !this.isActive;
      }

      setTimeout(() => this.scrollbar.update(), 0);
    }

    /**
     * Change active item index
     */
    toggleClass(index) {
      this.activeIndex = index;
    }

    /**
     * Open/close tab
     */
    toggleTab() {
      if (!this.isActive) {
        isScrolling = true;

        TweenMax.to(window, Resp.isSafari ? 0 : 1, {
          scrollTo: {
            y: this.scrollTarget,
            offsetY: 120,
            autoKill: false,
          },
          onComplete: () => { isScrolling = false; },
          ease: Power1.easeInOut
        });
      }

      if (!Resp.isMobile) bus.$emit(TAB_OPEN, this.label);
    }

    /**
     * @return {Object}
     */
    activeIndicator(index, text) {
      bus.$emit(ACTIVE_TAB_INDEX, this.activeIndex, this.label, text);

      return { [css.active]: index === this.activeIndex };
    }
  }
</script>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .TabsItem {
    margin-bottom: 36px;

    @media (max-width: $minTablet) {
      margin-bottom: 34px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &__list {
      padding: 0;
      margin: 0 0 0 15px;

      list-style-type: none;

      max-width: 235px;
      max-height: 200px;
      overflow: hidden;
    }

    &__item {
        position: relative;

        margin-bottom: 17px;

        &:last-child {
          margin-bottom: 0;
        }
      }

    &__link {
        @include gradient-text(false);

        display: inline-block;
        padding-left: 45px;

        font-family: $Calibri;
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        color: #ffffff;
        cursor: pointer;

        &.js-active + .TabsItem__stripe {
          transform: rotate(90deg);
        }

        &.js-active:hover + .TabsItem__stripe {
          width: 10px;

          &:after {
            opacity: 0;
          }
        }

        @media (min-width: $desktop) {
          &:hover + .TabsItem__stripe {
            width: 33px;

            &:after {
              opacity: 1;
            }
          }
        }
      }

    &__stripe {
        display: block;
        width: 10px;
        height: 1px;

        position: absolute;
        left: 0;
        top: 50%;

        transform: translateY(-50%);


        box-shadow: 1px -2px 16px rgba(30, 75, 120, 0.22);
        background-color: #9f9f9f;
        background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

        transition: all 0.4s ease;
        backface-visibility: hidden;

        &:after {
          content: '';

          display: block;
          width: 3px;
          height: 3px;

          position: absolute;
          right: 0;
          top: 50%;

          transform: translateY(-50%);

          border-radius: 100%;

          box-shadow: 0 2px 16px rgba(30, 75, 120, 0.22);
          background-color: #9f9f9f;
          background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);

          opacity: 0;
          transition: opacity 0.4s ease;
          backface-visibility: hidden;
        }
      }

    &.js-active {
      .ButtonTabs__icon {
        &:before {
          opacity: 0;
        }

        #icon {
          opacity: 0;
        }

        #icon-hover {
          opacity: 1;
        }
      }
    }

    // Vue animation from the box
    .fade-enter-active {
      transition: opacity .5s;
    }

    .fade-leave-active {
      transition: none;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .page-view .TabsItem {
    .scroll-content {
      padding-right: 15px;
    }

    .scrollbar-track-y {
      width: 2px;
      background-color: #e1e0e4;
      opacity: 1;
    }

    .scrollbar-thumb {
      width: 2px;
      background-color: #c4b4d2;
    }
  }
</style>
