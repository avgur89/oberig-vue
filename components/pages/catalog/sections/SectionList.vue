<template lang="pug">
  .SectionList(v-if="hasItems")
    .SectionList__inner
      BaseProduct(
        v-for="(item, index) in pageData.models",
        :key="item.id",
        :alias="item.alias",
        :code="item.code",
        :type="item.type",
        :imageUrl="item.titleImage",
        :delayIndex="index + 1",
        mode="goTo"
      )
      .SectionListDummyItem
    BasePagination(
      :data="pageData.pagination",
      :scrollTarget="scrollTarget"
    )
  .SectionList(v-else)
    .SectionList__empty(:style="{ opacity: preloaderIsFinished ? 1 : 0 }")
      .SectionList__empty-title {{ t.not_found_text }}
      ButtonRainbowGradient.SectionList__empty-button(
        :url="cnstructor.url",
        :text="cnstructor.text"
      )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../../../plugins/event-bus';
  import { PRELOADER_FINISHED } from '../../../../modules/_events';
  import BaseProduct from '../../../ui/BaseProduct.vue';
  import BasePagination from '../../../ui/BasePagination.vue';
  import ButtonRainbowGradient from '../../../ui/ButtonRainbowGradient.vue';
  import { generateUrl } from '../../../../modules/_helpers';

  @Component({
    components: {
      BaseProduct,
      BasePagination,
      ButtonRainbowGradient
    },
    computed: mapGetters(['pageData', 'm', 'preloaderIsFinished', 't'])
  })
  export default class SectionList extends Vue {
    /**
     * Scroll to this target on page change
     *
     * @type {Number|String}
     */
    scrollTarget = 0;

    /**
     * @return {boolean}
     */
    get hasItems() {
      return this.pageData.models.length && this.pageData.models.length > 0;
    }

    /**
     * @reutnr {Object}
     */
    get cnstructor() {
      return {
        url: generateUrl(this.$route.params.lang, 'constructor'),
        text: this.t.not_found_button_text
      };
    }

    mounted() {
      this.scrollTarget = this.$el.offsetTop - 50;

      if (!this.hasItems && !this.preloaderIsFinished) {
        bus.$on(PRELOADER_FINISHED, this.revealEmpty);
      }
    }

    destroyed() {
      bus.$off(PRELOADER_FINISHED, this.revealEmpty);
    }

    /**
     * Reveal 'no items found' section
     */
    revealEmpty() {
      TweenMax.to('.SectionList__empty', 1, {
        opacity: 1,
        ease: Power1.easeOut
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionList {
    position: relative;
    z-index: 5;

    margin-bottom: 195px;
    margin-top: 26px;

    @media (max-width: $minTablet) {
      margin-bottom: 100px;
      margin-top: 16px;
    }

    &__inner {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: 1279px) {
        justify-content: center;
      }
    }

    &__empty {
      margin-top: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      padding-right: 26px;

      &-title {
        @include gradient-text(false);

        margin-bottom: 24px;

        font-family: $MinionProDisp;
        font-size: 30px;
        font-weight: 400;
        line-height: 40px;
        letter-spacing: 1.5px;
        text-align: center;

        max-width: 80%;

        color: #3f4144;

        text-transform: uppercase;

        @media (max-width: $minTablet) {
          font-size: 25px;
          letter-spacing: 1.25px;

          max-width: 90%;
        }
      }

      &-button {
        margin-top: 10px;
      }
    }
  }

  .SectionListDummyItem {
    display: block;
    width: 373px;
    height: 0;

    @media (max-width: $minDesktop) {
      width: 330px;
    }

    @media (max-width: $minTablet) {
      display: none;
    }
  }
</style>
