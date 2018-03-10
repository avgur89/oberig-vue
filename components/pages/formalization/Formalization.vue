<template lang="pug">
  main.page-view(:class="$style.pageView")
    BaseBreadcrumbs(
      :baseItemLabel="catalog.label",
      :baseItemUrl="catalog.url"
    )
    SectionMain
    SectionList(:opened="relatedOpened")
    transition(name="fade-y")
      SectionRelated(v-if="relatedOpened")
    BlockWishlist(
      ref="FormalizationBlockWishlistRef",
      :class="$style.blockWishlist",
      :wishTitle="p.wishesLabel",
      :wishDesc="p.wishesDescription",
      :wishPlaceholder="p.wishesPlaceholder",
    )
    BlockContacts(
      :class="$style.blockContacts",
      :onSubmitAction="collectDataAndSend"
    )
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import { mapGetters, mapActions } from 'vuex';
  import bus from '../../../plugins/event-bus';
  import {
    SHOW_RELATED,
    HIDE_RELATED
  } from '../../../modules/_events';
  import { generateUrl } from '../../../modules/_helpers';
  import { sendForm } from '../../../api/formalization';
  import BaseBreadcrumbs from '../../ui/BaseBreadcrumbs.vue';
  import SectionMain from './sections/SectionMain.vue';
  import SectionList from './sections/SectionList.vue';
  import SectionRelated from './sections/SectionRelated.vue';
  import BlockWishlist from '../../blocks/BlockWishlist.vue';
  import BlockContacts from '../../blocks/BlockContacts.vue';

  @Component({
    components: {
      BaseBreadcrumbs,
      SectionMain,
      SectionList,
      SectionRelated,
      BlockWishlist,
      BlockContacts
    },
    computed: mapGetters(['menu', 'p', 'cartProducts', 'pageData']),
    methods: mapActions(['getInitialProducts', 'clearCart']),
    watch: {
      relatedOpened(next) {
        if (next) {
          setTimeout(() => {
            TweenMax.to(window, 1, {
              scrollTo: {
                y: '.SectionRelated',
                offsetY: 80,
                autoKill: false
              },
              ease: Power1.easeInOut
            });
          }, 0);
        }
      }
    }
  })
  export default class Collection extends Vue {
    /**
     * Related section opened state indicator
     *
     * @type {Boolean}
     */
    relatedOpened = false;

    mounted() {
      bus.$on(HIDE_RELATED, this.closeRelated);
      bus.$on(SHOW_RELATED, this.openRelated);
    }

    destroyed() {
      bus.$off(HIDE_RELATED, this.closeRelated);
      bus.$off(SHOW_RELATED, this.openRelated);
    }

    /**
     * @return {Object}
     */
    get catalog() {
      return {
        url: generateUrl(this.$route.params.lang, 'catalog'),
        label: this.pageData.breadLabel
      };
    }

    /**
     * Show related items container
     */
    openRelated() {
      this.relatedOpened = true;
    }

    /**
     * Hide related items
     */
    closeRelated() {
      this.relatedOpened = false;
    }

    /**
     * Collect selected products, wishes message, form data and send
     *
     * @param {Object} formData
     */
    collectDataAndSend(formData) {
      const message = this.$refs.FormalizationBlockWishlistRef.$el.querySelector('textarea');
      const productAliases = [...this.cartProducts].map(product => product.alias);

      const pageUserData = {
        ...formData,
        productAliases,
        [message.name]: message.value
      };

      sendForm(pageUserData, this.$router, this.clearCart);
    }
  }
</script>

<style lang="scss" module>
  @import "../../../assets/scss/variables";

  .pageView {
    position: relative;
    z-index: 3;

    padding-top: 80px;

    max-width: 1220px;

    margin: 0 auto;

    @media (max-width: $minDesktop) {
      padding-top: 92px;
    }

    @media (max-width: $minTablet) {
      padding-top: 124px;
    }
  }

  .blockContacts {
    float: left;

    width: 100%;
  }

  .blockWishlist {
    margin: 18px 0 135px !important;
    border-top: 1px solid #e1e0e4;
    padding: 54px 48% 0 40px;

    @media (max-width: $minDesktop) {
      margin: 36px 0 130px !important;
      padding-left: 0;
      padding-right: 0;
    }

    @media (max-width: $minTablet) {
      margin-bottom: 96px;
    }
  }
</style>
