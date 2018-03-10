/* eslint-disable no-shadow, arrow-body-style, no-unused-vars, arrow-parens */

import * as types from '../mutation-types';

// initial state
const state = {
  language: '',
  defaultLanguage: '',
  languageChangedFlag: false
};

// getters
const getters = {
  currentLang: state => state.language,
  defaultLang: state => state.defaultLanguage,
  languageChanged: state => state.languageChangedFlag
};

// actions
const actions = {
  setLanguage({ commit }, language) {
    commit(types.SET_LANGUAGE, language);
  },

  setDefaultLanguage({ commit }, language) {
    commit(types.SET_DEFAULT_LANGUAGE, language);
  },

  setLanguageChangedFlag({ commit }, flag) {
    commit(types.SET_LANGUAGE_CHANGED, flag);
  }
};

// mutations
const mutations = {
  [types.SET_LANGUAGE](state, language) {
    state.language = language;
  },

  [types.SET_DEFAULT_LANGUAGE](state, language) {
    state.defaultLanguage = language;
  },

  [types.SET_LANGUAGE_CHANGED](state, flag) {
    state.languageChangedFlag = flag;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
