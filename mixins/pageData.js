import bus from '../plugins/event-bus';
import { SET_FOOTER_STATE } from '../modules/_events';
import { mapGetters } from 'vuex';
import { getGlobalData } from '../api/globalData';
import { getLayoutData } from '../api/layoutData';

/**
 * - set 'getPageData' middleware
 * - set-up transition (with scrollTo behaviour and footer bus events)
 * - check and update head (head() hook)
 * - update page data on route change and layout data on language change
 */
export default {
  computed: mapGetters(['head', 'currentLang']),

  middleware: 'getPageData',

  transition: {
    name: 'fade',
    mode: 'out-in',
    beforeLeave() {
      bus.$emit(SET_FOOTER_STATE, true);
    },
    afterLeave() {
      window.scroll(0, 0);
    },
    enter() {
      bus.$emit(SET_FOOTER_STATE, false);
    }
  },

  head() {
    // no head found
    if (!this.head) {
      // 404 page
      if (this.$route.fullPath.includes('error')) return { title: '404' };
      return;
    }

    // generate new 'lang' attr (based on store current lang)
    const htmlAttrs = { lang: this.currentLang };

    // get new head details from store
    let { meta, title } = this.head;

    // generate new meta tags
    meta = meta && meta.length
      ? meta.map(({ name, content }) => ({ name, content, hid: name }))
      : [];

    return { title, meta, htmlAttrs };
  },

  async fetch({ route, redirect, isServer, store: { dispatch, getters } }) {
    if (isServer) return;

    try {
      // get new page data
      const getDataPromises = [getGlobalData({ route, webp: getters.webpIsSupported })];

      // language was changed, update layout data
      if (getters.languageChanged) {
        getDataPromises.push(getLayoutData(route.params.lang));

        dispatch('setLanguageChangedFlag', false);
      }

      const [pageData, layoutData] = await Promise.all(getDataPromises);

      // save collected data to buffer (will be applied on route change - layout.vue)
      dispatch('updateGlobalDataBuffer', { ...pageData, ...layoutData });
    } catch (e) {
      redirect('/error');
    }
  }
};
