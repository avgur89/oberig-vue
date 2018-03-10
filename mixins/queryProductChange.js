import { mapGetters, mapActions } from 'vuex';
import { getProducts } from '../api/products';
import bus from '../plugins/event-bus';
import { QUERY_CHANGED } from '../modules/_events';

/**
 * @TODO:
 * We're using javascript's pushState API because of vue-router issue.
 * asyncData() is calling each time the query changes
 *
 * You should change it to this.$router.replace(...) when the issue
 * https://github.com/nuxt/nuxt.js/issues/1255
 * will be resolved
 */
export default {
  props: {
    container: {
      type: [String, Object],
      required: false
    },
    scrollTarget: {
      type: [String, Object, Number],
      required: false
    }
  },

  computed: mapGetters(['webpIsSupported']),

  methods: {
    ...mapActions(['updateModels', 'updatePagination']),

    /**
     * Change page's search query
     *
     * @async
     * @param {String} query
     * @param {Boolean} [updatePagination]
     */
    async changeQuery(query, updatePagination = false) {
      const queryPath = `${window.location.pathname}${query}`;

      // before page change callback
      await this.updateProductsList(queryPath, updatePagination);

      window.history.replaceState(
        '',
        '',
        query ? queryPath : `${location.protocol}//${location.host}${location.pathname}`
      );

      // emit global event
      setTimeout(() => bus.$emit(QUERY_CHANGED), 0);

      // after page change callback
      await this.showContainer();
    },

    /**
     * Update section list items with animations and href change
     *
     * @async
     * @param {String} url
     * @param {Boolean} [updatePagination]
     * @return {Promise.<Array>}
     */
    async updateProductsList(url, updatePagination) {
      const [data] = await Promise.all([
        getProducts(url, this.webpIsSupported),
        this.hideContainer()
      ]);

      // update items
      this.updateModels(data.models);

      // update pagination
      if (updatePagination) this.updatePagination(data.pagination);

      return data;
    },

    /**
     * Animate list opacity to 0
     *
     * @return {Promise.<*>}
     */
    hideContainer() {
      return new Promise((resolve) => {
        TweenMax.to(this.container || '.SectionList__inner', 0.4, {
          opacity: 0,
          ease: Power1.easeOut,
          onComplete: resolve
        });
      });
    },

    /**
     * Animate list opacity to 1
     *
     * @return {Promise.<*>}
     */
    showContainer() {
      if (this.scrollTarget) {
        TweenMax.to(window, 0.6, {
          scrollTo: {
            y: this.scrollTarget,
            autoKill: false,
            ease: Power1.easeOut
          }
        });
      }

      return new Promise((resolve) => {
        TweenMax.to(this.container || '.SectionList__inner', 0.5, {
          opacity: 1,
          ease: Power1.easeOut,
          onComplete: resolve
        });
      });
    }
  }
};
