/**
 * Commonly used constants and functions.
 *
 * @module Helpers
 */

import isTouchDevice from 'is-touch-device';
import curry from 'ramda/src/curry';
import { split, map, chunk, join } from 'lodash';

/**
 * Default website language
 *
 * @constant
 * @type {String}
 */
export const defaultLang = 'uk';

/**
 * API url
 *
 * @constant
 * @type {String}
 */
export const baseUrl = 'https://api.oberig.com.dev11.vintagedev.com.ua';

/**
 * RegExp used to detect web-crawler
 *
 * @constant
 * @type {RegExp}
 */
export const crawlersRegExp = /bot|crawl|curl|dataprovider|search|get|spider|find|java|majesticsEO|google|yahoo|teoma|contaxe|yandex|libwww-perl|facebookexternalhit/i;

/**
 * CSS-based states
 *
 * @constant
 * @type {Object}
 */
export const css = {
  blocked: 'js-blocked',
  active: 'js-active',
  animatable: 'js-animatable',
  fixed: 'js-fixed',
  gradient: 'js-gradient',
  iefix: 'js-iefix',
  single: 'js-single',
  white: 'js-white',
  hidden: 'js-hidden',
  full: 'js-full',
  line: 'js-line',
  smaller: 'js-smaller',
};

/**
 * Get paths with specified id from array of paths.
 *
 * @param {Array} pathsArray
 * @param {Number|Function} pathFilter
 * @return {Array}
 */
export const getPaths = curry((pathsArray, pathFilter) => {
  const filterFunction = typeof pathFilter === 'number'
    ? path => +path.getAttribute('pid') === pathFilter
    : path => pathFilter(+path.getAttribute('pid'));

  return pathsArray.filter(filterFunction);
});

/**
 * Generate array of axios params with webp headers
 *
 * @param {String} url
 * @param {Boolean} webp
 * @return {Array}
 */
export const setupWebp = (url, webp) => {
  const dummyArray = [url];

  if (webp) {
    dummyArray.push({
      headers: {
        common: {
          Accept: 'image/webp'
        }
      }
    });
  }

  return dummyArray;
};

/**
 * Swap the elements in an array at indexes x and y.
 *
 * @param {Array} a - The array.
 * @param {Number} x - The index of the first element to swap.
 * @param {Number} y -  The index of the second element to swap.
 * @param {Boolean} [immutable=false] - Will not mutate the target array, when set to true
 * @return {Array} A new array with the elements swapped.
 */
export const swapArrayElements = curry((a, x, y, immutable = false) => {
  if (a.length === 1) return a;

  if (immutable) a = [...a];

  let temp = a[x];
  a[x] = a[y];
  a[y] = temp;

  return a;
});

/**
 * Rename object's property.
 *
 * @param {Object} obj
 * @param {String} propName
 * @param {String} renameTo
 * @return {Undefined}
 */
export const renameObjProp = curry((obj, propName, renameTo) => {
  if (!obj[propName]) throw new Error(`Object doesn't have "${propName}" property`);

  if (obj[renameTo]) throw new Error(`Object already has "${renameTo}" property`);

  obj[renameTo] = obj[propName];

  delete obj[propName];
});

/**
 * TweenMax animation wrapped in promise.
 *
 * @TODO: fromTo etc. methods support
 * @param {HTMLElement|String} target
 * @param {Number} time
 * @param {Object} params
 * @param {String} [method='to']
 * @return {Promise}
 */
export const animation = curry((target, time, params, method = 'to') => (
  new Promise((resolve) => {
    const onComplete = params.onComplete;
    params.onComplete = typeof onComplete === 'function'
      ? async () => { await onComplete(); resolve(); }
      : resolve;
    TweenMax[method](target, time, params);
  })
));


/**
 * Change (remove / add) css class to a set of elements.
 *
 * @param {Array} elements
 * @param {String} method
 * @param {String} className
 */
export const changeClass = (elements, method, className = css.active) => {
  elements.forEach((el) => {
    if (el instanceof Array) {
      changeClass(el, method, className);
    } else {
      el.classList[method](className);
    }
  });
};

/**
 * Process template literal with words and fill it with slashes
 *
 * Example
 *
 * const linkPartOne = 'collections';
 * const linkPartTwo = 'id1';
 * const result = url`${linkPartOne}${linkPartTwo}`;
 * // => '/collections/id1';
 *
 * @param template
 * @param expressions
 */
export const url = (template, ...expressions) => (
  template.reduce((acc, item, i) => `${acc}/${expressions[i - 1]}${item}`)
);

/**
 * Generate url based on language
 *
 * @param {String} lang
 * @param {String} [linkUrl]
 * @return {String}
 */
export const generateUrl = (lang, linkUrl = '') => {
  if (lang) return url`${lang}${linkUrl}`;

  return url`${linkUrl}`;
};

/**
 * Split word into array of chunk arrays or letters.
 *
 * Example:
 *
 * splitWordIntoChunks('hello');
 * // => [['h', 'e', 'l'], ['l', 'o']]
 *
 * splitWordIntoChunks('the');
 * // => 'the'
 *
 * @param {String} word
 * @return {Array|String}
 */
export const splitWordIntoChunks = (word) => {
  const letters = Array.from(word);
  const length = letters.length;

  if (length <= 3) return word;

  const chunkSize = length > 16
    ? Math.floor(length / 3)
    : length > 9
      ? 4
      : length >= 5
        ? 3
        : 2;
  const chunks = chunk(letters, chunkSize);

  if ((length % chunkSize) === 1) {
    chunks[chunks.length - 2].push(...chunks.pop());
  }

  return chunks;
};

/**
 * Generate HTML from chunked words.
 *
 * Example:
 *
 * extractHtmlFromChunks([['h', 'e', 'l'], ['l', 'o']]);
 * // => <span class="chunked_word">
 * //     <div class="chunk chunked_syllable">hel</div>
 * //     <div class="chunk chunked_syllable">lo</div>
 * //    </span>
 *
 * extractHtmlFromChunks('the');
 * // => <div class="chunk chunked_word--empty">the</div>
 *
 * @param {Array|String} splittedWord
 * @param {String} [wrapper='div']
 * @param {String} [scopeId]
 * @param {String} [className]
 * @return {String}
 */
export const extractHtmlFromChunks = (splittedWord, { scopeId, className } = {}, wrapper) => {
  if (splittedWord instanceof Array) {
    const wrappedChunks = map(splittedWord, wordChunk => (
      `<${wrapper} ${scopeId || ''} class="chunk chunked_syllable ${className || ''}">${join(wordChunk, '')}</${wrapper}>`
    ));
    const extractedChunk = join(wrappedChunks, '');
    return `<span ${scopeId || ''} class="chunked_word">${extractedChunk}</span>`;
  }

  return `<${wrapper} class="chunk chunked_word--empty">${splittedWord}</${wrapper}>`;
};

/**
 * Split words in string (sentence) into chunks and wrap them.
 *
 * @param {String} string
 * @param {String} [wrapper='div']
 * @param {Object} [scoped]
 * @return {String}
 */
export const extractStringChunks = (string, scoped, wrapper = 'div') => {
  const words = split(string, ' ');
  const splittedWords = map(words, word => splitWordIntoChunks(word));
  const chunkedWords  = map(splittedWords, word => extractHtmlFromChunks(word, scoped, wrapper));

  return join(chunkedWords, ' ');
};

/**
 * Force a style recalculation (for safari)
 *
 * @param {HTMLElement} clipPathBlock
 * @param {String} clipPathValue
 */
export const safariClipPathRerender = (clipPathBlock, clipPathValue) => {
  clipPathBlock.style.clipPath = 'none';
  clipPathBlock.offsetWidth;
  clipPathBlock.style.clipPath = clipPathValue;
};

/**
 * Force a layer redraw
 *
 * @param {HTMLElement} element
 */
export const redraw = (element) => {
  element.style.display = 'none';
  element.offsetHeight;
  element.style.display = '';
};

/**
 * Match media device indicator.
 */
export class Resp {
  /**
   * Get window's current width.
   *
   * @get
   * @static
   * @return {Number}
   */
  static get currWidth() {
    return window.innerWidth;
  }

  /**
   * Detect touch events.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTouch() {
    return isTouchDevice();
  }

  /**
   * Get current scrollTop position.
   *
   * @get
   * @static
   * @return {Number}
   */
  static get scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  /**
   * Detect mobile device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
  }

  /**
   * Detect tablet device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isTablet() {
    return window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
  }

  /**
   * Detect desktop device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isDesk() {
    return window.matchMedia('(min-width: 1200px)').matches;
  }

  /**
   * Detect large desktop device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isDeskL() {
    return window.matchMedia('(min-width: 1600px)').matches;
  }

  /**
   * Detect safari web-browser.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isSafari() {
    const ua = navigator.userAgent.toLowerCase();
    return !!window.safari || (ua.includes('safari') && !ua.includes('chrome'));
  }

  /**
   * Detect iOS device.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isIos() {
    return /iphone|ipod|ipad/i.test(navigator.userAgent);
  }

  /**
   * Detect iOS device on Chrome.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isIosChrome() {
    return /CriOS/i.test(navigator.userAgent) && Resp.isIos;
  }

  /**
   * Detect firefox web-browser.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isFirefox() {
    return typeof window.InstallTrigger !== 'undefined';
  }

  /**
   * Detect internet explorer web-browser.
   *
   * @get
   * @static
   * @return {Boolean}
   */
  static get isIE() {
    return navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;
  }
}

/**
 * Calculate scale parameters for item (for page transition)
 *
 * @param {HTMLElement} el
 * @param {Number} Xmultiply
 * @param {Number} Ymultiply
 * @return {Array.<scaleX, scaleY>}
 */
export const calculateScale = (el, Xmultiply = 1.9, Ymultiply = 2.5) => {
  const {
    top: offsetTop,
    left: offsetLeft,
    bottom,
    right,
    width,
    height
  } = el.getBoundingClientRect();
  const offsetRight = window.innerWidth - right;
  const offsetBottom = window.innerHeight - bottom;
  const scaleX = Resp.isMobile
    ? 2
    : (Math.max(offsetLeft, offsetRight) / (width / 2)) * Xmultiply;
  const scaleY = (Math.max(offsetTop, offsetBottom) / (height / 2)) * Ymultiply;

  return [scaleX, scaleY];
};

/**
 * Check if element is in viewport.
 *
 * @param {HTMLElement} element
 * @param {Boolean} [fullyInView = false] - element should be fully in viewport?
 * @param {Number} [offsetTop = 0]
 * @returns {Boolean}
 */
export const isScrolledIntoView = (element, offsetTop = 0, fullyInView = false) => {
  const { height: elHeight, top: elTop } = element.getBoundingClientRect();
  const pageTop = window.pageYOffset;
  const pageBottom = pageTop + window.innerHeight;
  const elementTop = elTop + offsetTop;
  const elementBottom = elementTop + elHeight;

  if (fullyInView === true) {
    return ((pageTop < elementTop) && (pageBottom > elementBottom));
  }

  return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
};

/**
 * Custom phone-number validation (vueliadate)
 *
 * @param {String} number
 * @return {Boolean}
 */
export const phoneValidation = (number) => {
  if (typeof number === 'undefined' || number === null || number === '') {
    return true;
  }
  return /^(?=.*[0-9])[- +()0-9]+$/.test(number);
};
