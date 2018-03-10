/**
 * Home page scroll controller (animation in/out).
 *
 * @module ScrollController
 */

import Hammer, { DIRECTION_UP } from '../assets/js/hammer';
import AnchorScrollController from './AnchorScrollController';
import bus from '../plugins/event-bus';
import { Resp } from './_helpers';
import {
  ANIMATION_STARTED,
  ANIMATION_FINISHED
} from './_events';

let listener = null;
let firstScroll = false;
const SWIPEUP = 'swipeup';

export default class ScrollController {
  /**
   * Scroll button DOM element.
   *
   * @static
   * @get
   * @return {HTMLElement|Null|Element}
   */
  static get scrollButton() {
    return document.querySelector('.SectionMain__scrolldown');
  }

  /**
   * Current phase of animation.
   *
   * @static
   * @get
   * @return {Number}
   */
  static get animationPhase() {
    return $nuxt.$store.state.homeAnimationPhase;
  }

  /**
   * Prevent app from scrolling until animation is finished.
   *
   * @static
   * @param {Boolean} [disable=false] - if true, unlock screen
   */
  static lockScreen(disable) {
    document.body.style.overflow = disable ? 'visible' : 'hidden';
    document.body.style.height = disable ? 'auto' : (!Resp.isTouch ? '100vh' : `${window.innerHeight}px`);

    const method = disable ? 'removeEventListener' : 'addEventListener';
    const event = Resp.isTouch ? 'touchmove' : 'wheel';

    window[method](event, ScrollController.preventMove);
  }

  /**
   * Prevent event until animation is finished.
   *
   * @static
   * @param {Object} event
   */
  static preventMove(event) {
    if (ScrollController.animationPhase !== 2) event.preventDefault();
  }

  /**
   * Fire animation on scroll.
   *
   * @static
   * @param {Object} event
   */
  static handleMousewheel({ deltaY }) {
    if (deltaY > 0) {
      ScrollController.scrollToAnimation();

      window.removeEventListener('wheel', ScrollController.handleMousewheel);
    }
  }

  /**
   * Fire animation on swipe.
   *
   * @static
   */
  static handleTouch() {
    ScrollController.scrollToAnimation();

    document.getElementById('SectionMain').style.touchAction = '';
    listener.destroy();
  }

  /**
   * Scroll to animation section and dispatch animationStart event.
   *
   * @static
   * @param {Boolean} [unbindEvents=true]
   * @param {Function} [callback=undefined]
   */
  static scrollToAnimation(unbindEvents = true, callback) {
    const elements = !Resp.isTouch
      // leave header outside the screen (animation starts)
      ? (!firstScroll ? '.page-view, .TheHeader__inner' : '.page-view')
      : window;
    const settings = {
      ease: Power2.easeInOut,
      onComplete() {
        firstScroll = true;

        if (Resp.isDesk) {
          TweenMax.set('.TheFooter', { 'margin-top': 'calc(-100vh + 60px)' });
          AnchorScrollController.isOnMain = false;
        }
      }
    };

    if (Resp.isTouch) {
      settings.scrollTo = { y: window.innerHeight, autoKill: false };
    } else {
      settings.y = -window.innerHeight;
    }

    TweenMax.to(elements, 1, settings);

    if (typeof callback === 'function') callback.call();

    if (unbindEvents) {
      window.removeEventListener('wheel', ScrollController.handleMousewheel);
      window.removeEventListener('touchmove', ScrollController.handleTouch);

      if (ScrollController.animationPhase === 0) bus.$emit(ANIMATION_STARTED);
    }
  }

  /**
   * Activate event listeners.
   *
   * @static
   * @param {Boolean} [disable=false] - if true, deactivate event listeners
   */
  static activateEventListeners(disable = false) {
    const method = disable ? 'removeEventListener' : 'addEventListener';

    if (Resp.isTouch) {
      if (disable && listener) return listener.destroy();

      listener = Hammer(document.getElementById('SectionMain'));

      listener
        .get('swipe')
        .set({ direction: DIRECTION_UP });

      listener.on(SWIPEUP, ScrollController.handleTouch);
    } else {
      window[method]('wheel', ScrollController.handleMousewheel);
    }

    ScrollController.scrollButton[method]('click', ScrollController.scrollToAnimation);
  }

  /**
   * Bind event listeners for scrolling, lock screen scrolling.
   *
   * @static
   * @param {Boolean} [disable=false] - if true, remove event listeners, unlock screen
   */
  static initialization(disable = false) {
    // prevent scrolling and activate event listeners
    ScrollController.lockScreen(disable);
    ScrollController.activateEventListeners(disable);

    // enable scrolling after animation (home page) is finished
    bus[disable ? '$off' : '$on'](ANIMATION_FINISHED, ScrollController.lockScreen.bind(null, true));
  }

  /**
   * Bind event listener for button
   *
   * @static
   */
  static initBtn() {
    ScrollController.scrollButton.addEventListener('click', ScrollController.scrollToAnimation);
  }
}
