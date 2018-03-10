<template lang="pug">
  section.SectionLinks
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-50",
      :action="revealSection"
    )
    nuxt-link.SectionLinks__link(:to="collectionLink", :style="{ 'background-image' : `url(${m.collection.titleImage})` }")
      p.SectionLinks__link-desc.SectionLinks__link-desc--left {{ t.watch_collection }}
      p.SectionLinks__link-desc.SectionLinks__link-desc--left {{ m.collection.label }}
    nuxt-link.SectionLinks__link(:to="pageData.nextProductUrl")
      .SectionLinks__link-desc.SectionLinks__link-desc--right {{ t.next_product }}
      .SectionLinks__link-icon-wrapper
        BaseSvgIcon.SectionLinks__link-icon(
          icon="arrow_slider_right",
          id="link-next",
          width="31",
          height="11"
        )
        BaseSvgIcon.AppMenu__link-icon(
          icon="socials-hover",
          width="60",
          height="60",
          :fill="false"
        )
</template>

<script>
  import '../../../../assets/svg/dist/arrow_slider_right';
  import '../../../../assets/svg/dist/socials-hover';
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import { generateUrl } from '../../../../modules/_helpers';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import BaseSvgIcon from '../../../ui/BaseSvgIcon.vue';

  @Component({
    components: { BaseReveal, BaseSvgIcon },
    computed: mapGetters(['p', 't', 'm', 'pageData'])
  })
  export default class SectionLinks extends Vue {
    /**
     * @return {String}
     */
    get collectionLink() {
      return generateUrl(this.$route.params.lang, `collection/${this.m.collection.alias}`);
    }

    /**
     * Reveal links section
     */
    revealSection() {
      TweenMax.to(this.$el, 1, { opacity: 1 });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionLinks {
    position: relative;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    margin-bottom: 50px;

    width: calc(100% + 80px);
    margin-left: -40px;

    opacity: 0;

    @media (min-width: $largeDesktop) {
      width: calc(100% + 196px);
      margin-left: -98px;
    }

    @media (max-width: $minDesktop) {
      width: calc(100% + 68px);
      margin-left: -34px;
    }

    @media (max-width: $minTablet) {
      flex-direction: column;
      width: calc(100% + 28px);
      margin-left: -14px;
    }

    &__link {
      position: relative;

      flex: 0 1 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      color: #5b5f74;

      height: 200px;

      background-color: #fff;
      box-shadow: 0 16px 49px rgba(30, 75, 120, 0.09);
      text-decoration: none;

      &:last-child {
        flex-direction: row;
      }

      @media (max-width: $minDesktop) {
        height: 145px;
      }

      @media (max-width: $minTablet) {
        flex: 1 1 auto;
        width: 100%;
        height: 150px;
      }

      &-icon-wrapper {
        position: relative;

        margin-top: -4px;
        margin-left: 19px;
      }

      &:not(:last-child) {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        &:before,
        &:after {
          content: "";

          position: absolute;
          display: inline-block;

          top: 0;
          left: 0;

          width: 100%;
          height: 100%;

          background-image: linear-gradient(to right, #49546e 0%, #ba6946 100%);
          background-size: 100% auto;
          background-position: right center;
          opacity: 0.5;

          transition: opacity 1s ease;
        }

        &:after {
          background-image: linear-gradient(to right, #c95842 0%, #506a8c 100%);
          opacity: 0;
        }

        @media (min-width: $minDesktop) {
          &:hover {
            &:before {
              opacity: 0;
            }
            &:after {
              opacity: 0.5;
            }
          }
        }
      }

      &-desc {
        position: relative;
        z-index: 1;

        font-family: $CalibriBold;
        font-size: 14px;
        font-weight: 700;
        line-height: 24px;
        text-transform: uppercase;
        letter-spacing: 2.8px;

        text-align: center;

        color: #fff;

        &--right {
          @include gradient-text(false);
        }
      }
    }
  }

  #link-next {
    color: #736d7b;

    svg {
      width: 31px !important;
    }
  }
</style>

<style lang="scss">
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionLinks {
    .AppMenu__link-icon {
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

      path {
        opacity: 0;
        transform: scale(0.5);
        transform-origin: center center;

        transition: opacity .6s ease, transform 0s ease .6s;
      }
    }
  }

  @media (min-width: $desktop) {
    .SectionLinks__link:hover .AppMenu__link-icon path {
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
</style>
