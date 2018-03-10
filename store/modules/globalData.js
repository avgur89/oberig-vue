/* eslint-disable no-shadow, arrow-body-style, no-unused-vars, arrow-parens */

import * as types from '../mutation-types';
import { renameObjProp } from '../../modules/_helpers';

// initial state
// p - static page model
// m - regular model, is used in view page (e.g. post, article)
// t - translations
const state = {
  layoutData: {},
  pageData: {},
  p: {},
  m: {},
  t: {},
  user: null,
  head: {},
  globalDataBuffer: {}
};

// getters
const getters = {
  globalDataBuffer: state => state.globalDataBuffer,
  pageData: state => state.pageData,
  p: state => state.p,
  m: state => state.m,
  t: state => state.t,
  user: state => state.user,
  head: state => state.head,
  menu: state => state.layoutData.menu,
  footer: state => state.layoutData.footer,
  languages: state => state.layoutData.languages,
  cartText: state => state.layoutData.cartText
};

// actions
const actions = {
  updateGlobalDataBuffer({ commit }, data) {
    commit(types.SET_GLOBAL_DATA_BUFFER, data);
  },

  updateGlobalData({ commit }, data) {
    if (data && data.data) {
      renameObjProp(data, 'data', 'pageData');
    }

    commit(types.SET_GLOBAL_DATA, data);
  },

  updateModels({ commit }, models) {
    commit(types.UPDATE_MODELS, models);
  },

  updatePagination({ commit }, pagination) {
    commit(types.UPDATE_PAGINATION, pagination);
  }
};

// mutations
const mutations = {
  [types.SET_GLOBAL_DATA](state, data) {
    Object.assign(state, data);
  },

  [types.SET_GLOBAL_DATA_BUFFER](state, data) {
    state.globalDataBuffer = data;
  },

  [types.UPDATE_MODELS](state, models) {
    state.pageData.models = models;
  },

  [types.UPDATE_PAGINATION](state, pagination) {
    state.pageData.pagination = pagination;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
