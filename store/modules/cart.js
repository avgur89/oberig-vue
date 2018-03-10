/* eslint-disable no-shadow, max-len, arrow-body-style, no-unused-vars */

import * as types from '../mutation-types';
import { unionBy } from 'lodash';
import { getRelatedProducts } from '../../api/products';

// used as keys for state/localStorage fields
export const CART_PRODUCTS = 'CART_PRODUCTS';
export const CART_RELATED_PRODUCTS = 'CART_RELATED_PRODUCTS';

// initial state
// products - products added to cart
// relatedProducts - products related to products added to cart
const state = {
  [CART_PRODUCTS]: [],
  [CART_RELATED_PRODUCTS]: []
};

// getters
const getters = {
  cartProducts: state => state[CART_PRODUCTS],
  cartRelatedProducts: state => state[CART_RELATED_PRODUCTS],
  cartHasProducts: state => state[CART_PRODUCTS] && state[CART_PRODUCTS].length && state[CART_PRODUCTS].length > 0
};

// actions
const actions = {
  addToCart({ commit, state }, product) {
    const newProducts = unionBy(product, state[CART_PRODUCTS], 'id');

    window.localStorage.setItem(CART_PRODUCTS, JSON.stringify(newProducts));

    commit(types.SET_PRODUCTS, newProducts);
  },

  removeFromCart({ commit, state }, productId) {
    const newProducts = state[CART_PRODUCTS].filter(product => (
      product.id !== productId
    ));

    window.localStorage.setItem(CART_PRODUCTS, JSON.stringify(newProducts));

    commit(types.SET_PRODUCTS, newProducts);
  },

  async actualizeRelatedProducts({ commit, state, getters }, $router) {
    if (!state[CART_PRODUCTS] || !state[CART_PRODUCTS].length) return;

    const lang = $router.currentRoute.params.lang;
    const productAliases = [...state[CART_PRODUCTS]].map(product => product.alias);

    const newRelatedProducts = await getRelatedProducts(productAliases, lang, getters.webpIsSupported);

    window.localStorage.setItem(CART_RELATED_PRODUCTS, JSON.stringify(newRelatedProducts));

    commit(types.SET_RELATED_PRODUCTS, newRelatedProducts);
  },

  getInitialProducts({ commit }) {
    const cartProducts = window.localStorage.getItem(CART_PRODUCTS);
    const cartRelatedProducts = window.localStorage.getItem(CART_RELATED_PRODUCTS);

    if (cartProducts) {
      try {
        commit(types.SET_PRODUCTS, JSON.parse(cartProducts));
      } catch (e) {
        commit(types.SET_PRODUCTS, []);
      }
    }

    if (cartRelatedProducts) {
      try {
        commit(types.SET_RELATED_PRODUCTS, JSON.parse(cartRelatedProducts));
      } catch (e) {
        commit(types.SET_RELATED_PRODUCTS, []);
      }
    }
  },

  clearCart({ commit }) {
    window.localStorage.setItem(CART_PRODUCTS, []);
    window.localStorage.setItem(CART_RELATED_PRODUCTS, []);

    commit(types.CLEAR_CART);
  }
};

// mutations
const mutations = {
  [types.SET_PRODUCTS](state, products) {
    state[CART_PRODUCTS] = products;
  },

  [types.SET_RELATED_PRODUCTS](state, relatedProducts) {
    state[CART_RELATED_PRODUCTS] = relatedProducts;
  },

  [types.CLEAR_CART](state) {
    state[CART_PRODUCTS] = [];
    state[CART_RELATED_PRODUCTS] = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
