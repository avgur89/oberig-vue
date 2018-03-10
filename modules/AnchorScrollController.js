/**
 * Main section anchor scroll controller (animate scrolling to/from main section).
 *
 * @module AnchorScrollController
 */

import { Resp } from './_helpers';
import WheelIndicator from '../assets/js/wheel-indicator';

const DOWN = 'down';
const UP = 'up';

let listener;

let scrolling = false;
let isOnMain = true;

export default class AnchorScrollController {
  /**
   * Disable scrolling.
   *
   * @static
   * @param {Object} event
   */
  static preventScroll(event) {
    event.preventDefault();
  }

  /**
   * Enable/disable scrolling.
   *
   * @param {Boolean} toBlock
   */
  static block(toBlock) {
    window[toBlock ? 'addEventListener' : 'removeEventListener']('wheel', AnchorScrollController.preventScroll);
  }

  /**
   * Initialize anchor scroll module (apply event listeners).
   *
   * @static
   * @param {Boolean} [onTheMain=false]
   */
  static enable(onTheMain = false) {
    isOnMain = onTheMain;

    listener = WheelIndicator({
      preventMouse: false,
      callback: ({ direction }) => {
        switch (direction) {
          case DOWN: {
            AnchorScrollController.onScrolledToBottom();
            break;
          }
          case UP: {
            AnchorScrollController.onScrolledToTop();
            break;
          }
          default: break;
        }
      }
    });
  }

  /**
   * Set current position (main section or no)
   *
   * @static
   * @set
   * @param {Boolean} value
   */
  static set isOnMain(value) {
    isOnMain = value;
  }

  /**
   * Handle scrolling to top.
   *
   * @static
   */
  static onScrolledToTop() {
    if (isOnMain) return;

    if (Resp.scrollTop > 15) return;

    AnchorScrollController.handleScroll(true);
  }

  /**
   * Handle scrolling to bottom
   *
   * @static
   */
  static onScrolledToBottom() {
    if (!isOnMain) return;

    AnchorScrollController.handleScroll(false);
  }

  /**
   * Simulate scrolling with transform
   *
   * @param {Boolean} toTop
   * @static
   */
  static handleScroll(toTop) {
    if (scrolling) return;

    scrolling = true;

    AnchorScrollController.block(true);

    TweenMax.to('.page-view', 1, {
      ease: Power1.easeInOut,
      y: toTop ? 0 : -window.innerHeight,
      onComplete() {
        AnchorScrollController.block(false);

        isOnMain = toTop;

        scrolling = false;

        TweenMax.set('.TheFooter', { 'margin-top': toTop ? '60px' : 'calc(-100vh + 60px)' });

        // trigger header's 'WHITE GRADIENT' scroll listener
        if (toTop) TweenMax.to(window, 0, { scrollTo: { y: 0 } });
      }
    });
  }

  /**
   * Remove all event listeners.
   *
   * @static
   */
  static disable() {
    AnchorScrollController.block(false);

    listener && listener.destroy && listener.destroy();

    document.querySelector('.TheFooter').style.marginTop = '';
  }
}
