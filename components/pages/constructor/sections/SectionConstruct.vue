<template lang="pug">
  section.SectionConstruct
    BaseReveal(
      :in-viewport-once="true",
      :in-viewport-offset-top="-150",
      :action="revealSection"
    )
    .SectionConstruct__cnt
      h3.SectionConstruct__title {{ title }}
      p.SectionConstruct__desc {{ desc }}
    .SectionConstruct__list
      SectionConstructItem(
        v-for="item in activeItems",
        :key="item.id",
        :title="item.label",
        :imageUrl="item.image || item.icon",
        :data="item",
        :isSymbols="isSymbols"
      )
      SectionConstructItem(
        :title="otherText",
        :empty="true",
        :data="otherItem",
        :isSymbols="false"
      )
      .SectionConstruct__dummy
      .SectionConstruct__dummy
      .SectionConstruct__dummy
      .SectionConstruct__dummy
      .SectionConstruct__dummy
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { initial, takeRight } from 'lodash';
  import BaseReveal from '../../../ui/BaseReveal.vue';
  import SectionConstructItem from './SectionConstructItem.vue';

  @Component({
    components: { BaseReveal, SectionConstructItem },
    props: {
      title: {
        type: String,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      otherText: {
        type: String,
        required: true
      },
      isSymbols: {
        type: Boolean,
        required: false
      }
    }
  })
  export default class SectionConstruct extends Vue {
    /**
     * @return {Array}
     */
    get activeItems() {
      return initial(this.items);
    }

    /**
     * @return {Object}
     */
    get otherItem() {
      const [lastItem] = takeRight(this.items);
      return lastItem;
    }

    /**
     * Reveal section
     */
    revealSection() {
      TweenMax.to(this.$el, 1, { opacity: 1, ease: Power1.easeOut });
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../assets/scss/variables";
  @import "../../../../assets/scss/mixins";

  .SectionConstruct {
    position: relative;

    margin-bottom: 53px;
    border-bottom: 1px solid #e1e0e4;

    opacity: 0;

    @media (max-width: $minTablet) {
      margin-bottom: 55px;
    }

    &__cnt {
      max-width: 540px;
      width: 100%;

      margin-bottom: 37px;
      padding-left: 40px;

      @media (max-width: $minDesktop) {
        max-width: none;
        padding-left: 0;
      }

      @media (max-width: $minTablet) {
        text-align: center;
        margin: 0 auto 32px auto;
      }
    }

    &__title {
      @include gradient-text(false);

      margin-bottom: 24px;

      font-family: $MinionProDisp;
      font-size: 18px;
      font-weight: 400;
      line-height: 28px;
      text-transform: uppercase;
      letter-spacing: 3.5px;

      color: #3f4144;

      @media (max-width: $minTablet) {
        margin-bottom: 14px;

        font-size: 13px;
        line-height: 22px;
        letter-spacing: 1.95px;
      }
    }

    &__dummy {
      max-width: 208px;
      width: 100%;
      height: 0;

      @media (max-width: $minTablet) {
        max-width: 130px;
      }
    }

    &__desc {
      font-family: $Calibri;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      color: #444344;
    }

    &__list {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      @media (max-width: $minTablet) {
        justify-content: space-between;
      }
    }
  }
</style>
