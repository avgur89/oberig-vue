import { extractStringChunks, Resp } from '../modules/_helpers';

/**
 * only for pages, whose data has 'p.title' field
 * title must have '.SectionMain__title' class
 *
 * mixin will split title into chunks on desktop and lines on mobile
 * and animate
 */
export default {
  data() {
    return {
      /**
       * @type {String}
       */
      mainTitle: ''
    };
  },

  beforeMount() {
    this.mainTitle = Resp.isMobile ? this.p.title : extractStringChunks(this.p.title);
  },

  methods: {

    revealMainTitle() {
      const titleSyllables = Resp.isMobile
        ? new SplitText('.SectionMain__title', { type: 'lines' }).lines
        : '.SectionMain__title .chunk';

      return new TimelineMax()
        .set('.SectionMain__title', { opacity: 1 })
        .staggerFromTo(
          titleSyllables,
          0.58,
          { y: Resp.isMobile ? -35 : 35, opacity: 0 },
          { y: 0, opacity: 1, ease: Power1.easeOut },
          0.1,
          0
        );
    }
  }
};
