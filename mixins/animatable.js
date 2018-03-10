import { css } from '../modules/_helpers';

/**
 * Add 'hidden' data property,
 * which will be used as indicator to add/remove 'js-animatable' css class from elem
 *
 * Also, add 'initiallyHidden' prop to element, which defines 'hidden' initial value
 */
export default {
  props: {
    initiallyHidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { hidden: this.initiallyHidden };
  },
  computed: {
    cssClassesObject() {
      return {
        [css.animatable]: this.hidden
      };
    }
  }
};
