<template lang="pug">
  section.SectionTabsContent
    BaseReveal(
      :in-viewport-once="true",
      :action="revealSection"
    )

    .SectionTabsContent__item(id="TabsProductCategory")
      h2.SectionTabsContent__title {{ p.sizeSelectingTitle }}
      .SectionTabsContent__desc(v-html="p.sizeSelectingDescription")
      ul.SectionTabsContent__toggle(v-if="isMobile", :style="{ height: productsOpened ? 'auto' : '80px' }")
        li.SectionTabsContent__toggle-item(
          @click="(event) => { productsOpened = !productsOpened; rerender(event); }"
        ) {{ productsText }}
        li.SectionTabsContent__toggle-item(
          v-for="(tab, index) in pageData.productCategories",
          :class="{ 'js-active': productsIndex === index }",
          @click="setActiveTabIndex('#TabsProductCategory', index, tab.label)"
        ) {{ tab.label }}
      .SectionTabsDetails(
        v-for="(item, index) in pageData.productCategories",
        :key="item.id"
      )
        transition-group(name="slide-fade")
          template(v-if="index === productsIndex")
            .SectionTabsDetails__desc(:key="item.id", v-html="item.select_size_info")
            ButtonRainbowGradient(
              :key="item.id",
              :url="item.pdf",
              :text="p.downloadPdfButton",
              isHref,
              v-if="!isMobile"
            )
            a.SectionTabsDetails__pdf(
              v-if="isMobile",
              :key="item.id",
              :href="item.pdf",
              target="_blank",
              rel="noopener"
            )
              .SectionTabsDetails__pdf-icon
                BaseSvgIcon(
                  :key="item.id",
                  icon="pdf_icon"
                )
              .SectionTabsDetails__pdf-text {{ p.downloadPdfButton }}

    .SectionTabsContent__item(id="TabsStonesCategory")
      h2.SectionTabsContent__title {{ p.stonesLabel }}
      .SectionTabsContent__desc(v-html="p.stonesDescription")
      ul.SectionTabsContent__toggle(v-if="isMobile", :style="{ height: stonesOpened ? 'auto' : '80px' }")
        li.SectionTabsContent__toggle-item(
          @click="(event) => { stonesOpened = !stonesOpened; rerender(event); }"
        ) {{ stonesText }}
        li.SectionTabsContent__toggle-item(
          v-for="(tab, index) in pageData.stones",
          :class="{ 'js-active': stonesIndex === index }",
          @click="setActiveTabIndex('#TabsStonesCategory', index, tab.label)"
        ) {{ tab.label }}
      .SectionTabsDetails(
        v-for="(item, index) in pageData.stones",
        :key="item.id"
      )
        transition-group(name="slide-fade")
          template(v-if="index === stonesIndex")
            h3.SectionTabsDetails__title(:key="item.id") {{ item.label }}
            .SectionTabsDetails__image-wrapper(:key="item.id")
              img.SectionTabsDetails__image(:src="item.image", :key="item.id")
            .SectionTabsDetails__desc(v-html="item.description", :key="item.id")

    .SectionTabsContent__item(id="TabsGuaranteeCategory")
      h2.SectionTabsContent__title {{ p.guaranteeLabel }}
      .SectionTabsContent__desc(v-html="p.guaranteeDescription")
      ul.SectionTabsContent__toggle(v-if="isMobile", :style="{ height: servicesOpened ? 'auto' : '80px' }")
        li.SectionTabsContent__toggle-item(
          @click="(event) => { servicesOpened = !servicesOpened; rerender(event); }"
        ) {{ servicesText }}
        li.SectionTabsContent__toggle-item(
          v-for="(tab, index) in pageData.services",
          :class="{ 'js-active': servicesIndex === index }",
          @click="setActiveTabIndex('#TabsGuaranteeCategory', index, tab.label)"
        ) {{ tab.label }}
      .SectionTabsDetails(
        v-for="(item, index) in pageData.services",
        :key="item.id"
      )
        transition-group(name="slide-fade")
          template(v-if="index === servicesIndex")
            .SectionTabsDetails__title(:key="item.id") {{ item.label }}
            .SectionTabsDetails__desc(v-html="item.content", :key="item.id")
</template>

<script>
  import '../../../../assets/svg/dist/pdf_icon';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import ScrollSpy from '../../../../modules/ScrollSpy';
  import bus from '../../../../plugins/event-bus';
  import { ACTIVE_TAB_INDEX, TAB_OPEN } from '../../../../modules/_events';
  import { Resp } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';

  @Component({
    props: {
      isMobile: {
        type: Boolean,
        required: true
      }
    },
    components: {
      ButtonRainbowGradient,
      BaseReveal,
      BaseSvgIcon
    },
    computed: mapGetters(['pageData', 'p'])
  })
  export default class SectionTabsContent extends Vue {
    /**
     * Active sections content
     */
    productsIndex = 0;
    stonesIndex = 0;
    servicesIndex = 0;

    /**
     * Mobile tabs opened indicator
     */
    productsOpened = false;
    stonesOpened = false;
    servicesOpened = false;

    /**
     * Active tab text
     */
    productsText = '';
    stonesText = '';
    servicesText = '';

    /**
     * ScrollSpy instance
     *
     * @type {Object}
     */
    ScrollSpy = undefined;

    mounted() {
      bus.$on(ACTIVE_TAB_INDEX, (value, label, text) => {
        switch (label) {
          case '#TabsProductCategory':
            this.productsIndex = value;
            this.productsText = text;
            break;
          case '#TabsStonesCategory':
            this.stonesIndex = value;
            this.stonesText = text;
            break;
          case '#TabsGuaranteeCategory':
            this.servicesIndex = value;
            this.servicesText = text;
            break;
          default: break;
        }
      });

      if (!Resp.isMobile && !Resp.isSafari) {
        this.ScrollSpy = new ScrollSpy((element) => {
          bus.$emit(TAB_OPEN, `#${element.id}`, true);
        }, ['#TabsProductCategory', '#TabsStonesCategory', '#TabsGuaranteeCategory']);
      }

      setTimeout(() => {
        this.productsText = this.pageData.productCategories[0].label;
        this.stonesText = this.pageData.stones[0].label;
        this.servicesText = this.pageData.services[0].label;
      }, 100);
    }

    destroyed() {
      !Resp.isMobile && this.ScrollSpy && this.ScrollSpy.destroy();
    }

    rerender({ target: { parentNode: sel } }) {
      sel.style.display = 'none';
      sel.offsetHeight;
      sel.style.display = '';
    }

    /**
     * Set active tab in content
     *
     * @param {String} label
     * @param {String|Number} value
     * @param {String} text
     */
    setActiveTabIndex(label, value, text) {
      bus.$emit(ACTIVE_TAB_INDEX, value, label, text);
    }

    /**
     * Reveal tabs content section
     */
    revealSection() {
      new TimelineMax()
        // tabs
        .fromTo('.SectionTabsContent', 1,
          { opacity: 0 },
          { opacity: 1, ease: Power1.easeOut },
          1
        );
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionTabsContent {
    position: relative;

    opacity: 0;

    @media (max-width: $minTablet) {
      margin-bottom: 82px;
    }

    &__item {
      margin-bottom: 126px;

      @media (max-width: $minTablet) {
        margin-bottom: 86px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 25px;

      font-family: $MinionProDisp;
      font-size: 30px;
      font-weight: 400;
      line-height: 40px;
      text-transform: uppercase;
      letter-spacing: 1.5px;

      color: #3f4144;

      @media (max-width: $minTablet) {
        font-size: 25px;
        letter-spacing: 1.25px;
      }
    }

    &__desc {
      margin-bottom: 50px;

      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;

      @media (max-width: $minTablet) {
        margin-bottom: 40px;
      }
    }

    &__toggle {
      width: calc(100% + 28px);
      margin-left: -14px;
      background-color: #ffffff;
      box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);

      list-style: none;

      margin-bottom: 58px;

      padding-top: 27px;
      padding-bottom: 27px;

      overflow: hidden;

      &-item {
        position: relative;

        @include gradient-text(false);

        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        text-align: left;

        padding-left: 55px;

        &.js-active {
          &:before {
            transform: rotate(90deg) translate3d(0, -50%, 0);
          }
        }

        &:not(:first-child) {
          margin-top: 17px;
        }

        &:first-child {
          margin-bottom: 23px;
        }

        &:before {
          content: '';

          position: absolute;

          top: 50%;
          left: 15px;

          transform: translate3d(0, -50%, 0);

          transition: transform .6s ease;

          width: 10px;
          height: 1px;
          box-shadow: -2px 1px 16px rgba(30, 75, 120, 0.22);
          background-color: #9f9f9f;
          background-image: linear-gradient(to right, rgba(33, 116, 183, 0.66) 0%, rgba(171, 140, 192, 0.66) 100%);
        }
      }
    }
  }

  .SectionTabsDetails {
    &__title {
      @include gradient-text(false);

      margin-bottom: 32px;

      font-family: $MinionProDisp;
      font-size: 18px;
      font-weight: 400;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 2.7px;

      color: #3f4144;

      @media (max-width: $minTablet) {
        font-size: 13px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 1.95px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__pdf {
      display: block;
      width: 100%;
      text-align: center;
      text-decoration: none;

      margin: 57px 0 10px;

      &-icon {
        width: 60px;
        height: 60px;

        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        border-radius: 50%;

        background: linear-gradient(to right, rgba(33, 116, 183, 0.66), rgba(171, 140, 192, 0.66));

        color: white;

        box-shadow: -2px 1px 16px rgba(30, 75, 120, 0.22);
      }

      &-text{
        margin-top: 21px;
        padding: 0 10px;

        font-family: $CalibriBold;
        font-size: 14px;
        line-height: 23.97px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        @include gradient-text(false);
      }
    }

    &__image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      max-width: 540px;
      width: 100%;
      height: 245px;

      margin-bottom: 32px;

      box-shadow: 0 30px 49px rgba(30, 75, 120, 0.15);
      background-color: #fff;

      @media (max-width: $minDesktop) {
        height: 200px;
      }

      @media (max-width: $minTablet) {
        height: 170px;
      }
    }

    &__image {
      max-width: 270px;
      max-height: 169px;
    }
  }

  .ButtonRainbowGradient {
    margin-top: 55px;
    overflow: hidden;
  }
</style>
