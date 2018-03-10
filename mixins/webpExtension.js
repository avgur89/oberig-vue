import { mapGetters } from 'vuex';

/**
 * detect webp support and provide corresponding images extension
 */
export default {
  computed: {
    /**
     * @return {String}
     */
    webp_png() {
      return this.webpIsSupported ? 'webp' : 'png';
    },

    /**
     * @return {String}
     */
    webp_jpg() {
      return this.webpIsSupported ? 'webp' : 'jpg';
    },

    /**
     * @return {String}
     */
    webp_jpeg() {
      return this.webpIsSupported ? 'webp' : 'jpeg';
    },
    ...mapGetters(['webpIsSupported'])
  }
};
