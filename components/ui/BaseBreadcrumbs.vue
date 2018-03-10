<template lang="pug">
  .BaseBreadcrumbs
    BaseReveal(
      :in-viewport-once="true",
      :action="revealBreadcrumbs"
    )
    nuxt-link.BaseBreadcrumbs__item.BaseBreadcrumbs__item--clickable(
      :to="baseItemUrl",
    ) {{ baseItemLabel }}
    template(v-if="secondaryItemLabel && secondaryItemLabel.length")
      template(v-if="opened")
        .BaseBreadcrumbs__dot .
        nuxt-link.BaseBreadcrumbs__item.BaseBreadcrumbs__item--clickable(
          :to="secondaryItemUrl",
        ) {{ secondaryItemLabel }}
        .BaseBreadcrumbs__dot .
      .BaseBreadcrumbs__dots(v-else, @click.once="openBreadcrumbs") ...
    .BaseBreadcrumbs__dot(v-else) .
    .BaseBreadcrumbs__item {{ head.title }}
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters } from 'vuex';
  import bus from '../../plugins/event-bus';
  import {
    COLLECTION_PREVIEW_CLOSED,
    PRODUCT_PREVIEW_CLOSED
  } from '../../modules/_events';
  import BaseReveal from './BaseReveal.vue';

  @Component({
    components: { BaseReveal },
    props: {
      baseItemLabel: {
        type: String,
        required: true
      },
      baseItemUrl: {
        type: String,
        required: true
      },
      secondaryItemLabel: {
        type: String,
        default: () => ''
      },
      secondaryItemUrl: {
        type: String,
        required: false
      }
    },
    computed: mapGetters(['head'])
  })
  export default class BaseBreadcrumbs extends Vue {
    /**
     * Breadcrumbs opened state
     *
     * @type {Boolean}
     */
    opened = !(this.secondaryItemLabel && this.secondaryItemLabel.length);

    /**
     * Currently on 'Collection' page
     */
    get isCollectionPage() {
      return this.$route.name.includes('collection-');
    }

    /**
     * Currently on 'Product' page
     */
    get isProductPage() {
      return this.$route.name.includes('product-');
    }

    destroyed() {
      if (this.isCollectionPage) bus.$off(COLLECTION_PREVIEW_CLOSED, this.animateBreadcrumbs);
      if (this.isProductPage) bus.$off(PRODUCT_PREVIEW_CLOSED, this.animateBreadcrumbs);
    }

    /**
     * Show breadcrumbs
     */
    revealBreadcrumbs() {
      if (this.isCollectionPage) {
        return bus.$on(COLLECTION_PREVIEW_CLOSED, this.animateBreadcrumbs);
      }

      if (this.isProductPage) {
        return bus.$on(PRODUCT_PREVIEW_CLOSED, this.animateBreadcrumbs);
      }

      this.animateBreadcrumbs();
    }

    /**
     * Animate (opacity) of breadcrumbs
     */
    animateBreadcrumbs() {
      TweenMax.to(this.$el, 1.2, { opacity: 1 });
    }

    /**
     * Show all breadcrumbs items
     */
    openBreadcrumbs() {
      this.opened = true;
    }
  }
</script>

<style lang="scss">
  @import "../../assets/scss/variables";
  @import "../../assets/scss/mixins";

  .BaseBreadcrumbs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;

    opacity: 0;

    top: 83px;
    left: 0;

    z-index: 5;

    @media (max-width: $minTablet) {
      width: 100%;
      top: 68px;
      left: 0;
      justify-content: center;
      padding: 0 20px;
    }

    &__item {
      color: #a5a5a5;
      font-family: $Calibri;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: 0.65px;

      &--clickable {
        @include gradient-text();

        text-decoration: none;

        align-self: flex-start;
      }
    }

    &__dots,
    &__dot {
      margin: -4px 12px 0 12px;
      color: #a5a5a5;
      letter-spacing: 4px;
      align-self: flex-start;
    }

    &__dots {
      cursor: pointer;
    }
  }
</style>
