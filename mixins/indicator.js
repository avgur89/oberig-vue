import WheelIndicator from '../assets/js/wheel-indicator';
import Hammer, { DIRECTION_UP } from '../assets/js/hammer';
import { Resp } from '../modules/_helpers';

const DOWN = 'down';
const SWIPEUP = 'swipeup';

/**
 * usage:
 * mixins: [indicator]
 * ...
 * methods: {
 *   indicatorEvent() {
 *     fired on user scrolls (mousewheel) down or swipes up
 *     bounds to 'this.$el'
 *     runs only once (unbinds after)
 *   }
 * }
 */
export default {
  data() {
    return {
      /**
       * Wheel/Swipe detector instance
       *
       * @private
       * @type {Object|Undefined}
       */
      $_indicator_listener: undefined,

      /**
       * Mousewheel/swipe listener is applied to element
       *
       * @private
       * @type {Boolean}
       */
      $_indicator_applied: false
    };
  },

  mounted() {
    this.$_indicator_applyListeners();
  },

  destroyed() {
    this.$_indicator_removeListeners();
  },

  methods: {
    /**
     * Detect device and set needed listeners
     *
     * @private
     */
    $_indicator_applyListeners() {
      if (this.$_indicator_applied) return;

      this.$_indicator_applied = true;

      if (Resp.isDesk) {
        this.$_indicator_listener = WheelIndicator({
          callback: ({ direction }) => direction === DOWN && this.$_indicator_action()
        });

        return;
      }

      this.$_indicator_listener = Hammer(this.$el);

      this.$_indicator_listener
        .get('swipe')
        .set({ direction: DIRECTION_UP });

      this.$_indicator_listener.on(SWIPEUP, this.$_indicator_action);
    },

    /**
     * Check and remove existent listeners
     *
     * @private
     */
    $_indicator_removeListeners() {
      if (!this.$_indicator_applied) return;

      this.$_indicator_applied = false;

      if (this.$_indicator_listener && this.$_indicator_listener.destroy) {
        this.$_indicator_listener.destroy();
      }
    },

    /**
     * Fired as main action
     *
     * @private
     */
    $_indicator_action() {
      this.indicatorEvent();
      this.$_indicator_removeListeners();
    }
  }
};
