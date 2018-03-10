/**
 * Detect elements appearance on the screen.
 *
 * @module ScrollSpy
 */

import { throttle, bind } from 'lodash';
import { isScrolledIntoView } from './_helpers';

export default class ScrollSpy {
  /**
   * @constructor
   * @param {Function} callback
   * @param {Array<String>} selectors
   * @return {ScrollSpy}
   */
  constructor(callback, selectors) {
    this.elements = selectors.map(selector => document.querySelector(selector));

    this.callback = callback;

    this.init();

    return this;
  }

  /**
   * Detect element appearance and fire callback
   *
   * @this {ScrollSpy}
   */
  scrollListener = bind(throttle(() => {
    this.elements.some((el) => {
      if (isScrolledIntoView(el, 300)) {
        this.callback(el);
        return true;
      }
    });
  }, 100), this);

  /**
   * Bind event listener
   */
  init() {
    window.addEventListener('scroll', this.scrollListener);
  }

  /**
   * Remove event listener
   */
  destroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }
}
