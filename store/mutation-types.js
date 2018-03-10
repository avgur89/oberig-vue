/**
 * Set animation phase (0, 1, 2)
 * Index page, second section
 *
 * @constant
 * @type {String}
 */
export const SET_ANIMATION_PHASE = 'SET_ANIMATION_PHASE';

/**
 * Set preloader state to 'finished' (when it's finished)
 *
 * @constant
 * @type {String}
 */
export const SET_PRELOADER_FINISHED_STATE = 'SET_PRELOADER_FINISHED_STATE';

/**
 * Set video flag (true/false)
 * Philosophy page
 *
 * @constant
 * @type {String}
 */
export const SET_VIDEO_FLAG = 'SET_VIDEO_FLAG';

/**
 * Indicator for client's browser webp support
 * 'nuxtServerInit' - store index
 *
 * @constant
 * @type {String}
 */
export const SET_WEBP_SUPPORT = 'SET_WEBP_SUPPORT';

/**
 * Set current user locale
 *
 * @constant
 * @type {String}
 */
export const SET_LANGUAGE = 'SET_LANGUAGE';

/**
 * Set default website language
 *
 * @constant
 * @type {String}
 */
export const SET_DEFAULT_LANGUAGE = 'SET_DEFAULT_LANGUAGE';

/**
 * 'Changed' flag, used to detect whether to update layout-data or not
 *
 * @constant
 * @type {String}
 */
export const SET_LANGUAGE_CHANGED = 'SET_LANGUAGE_CHANGED';

/**
 * Update page data
 * Used in page middleware after fetching data
 *
 * @constant
 * @type {String}
 */
export const SET_GLOBAL_DATA = 'SET_GLOBAL_DATA';

/**
 * Update data in 'globalDataBuffer', performed right after page AJAX
 *
 * @constant
 * @type {String}
 */
export const SET_GLOBAL_DATA_BUFFER = 'SET_GLOBAL_DATA_BUFFER';

/**
 * Update page models (items etc.)
 * Collection, Catalog pages
 *
 * @constant
 * @type {String}
 */
export const UPDATE_MODELS = 'UPDATE_MODELS';

/**
 * Update models (items) pagination data
 * Collection, Catalog pages
 *
 * @constant
 * @type {String}
 */
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';

/**
 * Set selected products array
 * Product, Formalization pages
 *
 * @constant
 * @type {String}
 */
export const SET_PRODUCTS = 'SET_PRODUCTS';

/**
 * Set related to selected products array
 * Formalization page
 *
 * @constant
 * @type {String}
 */
export const SET_RELATED_PRODUCTS = 'SET_RELATED_PRODUCTS';

/**
 * Remove all products from cart
 * Formalization page
 *
 * @constant
 * @type {String}
 */
export const CLEAR_CART = 'CLEAR_CART';

/**
 * Set items (also known as filter) in selected items
 * Constructor page
 *
 * @constant
 * @type {String}
 */
export const SET_CONSTRUCTOR_ITEMS = 'SET_CONSTRUCTOR_ITEMS';
