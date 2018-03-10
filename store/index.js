/* eslint-disable no-shadow, arrow-body-style, no-unused-vars, arrow-parens */

import { Store } from 'vuex';
import * as types from './mutation-types';
import { crawlersRegExp } from '../modules/_helpers';
import language from './modules/language';
import globalData from './modules/globalData';
import constructor from './modules/constructor';
import cart from './modules/cart';

// state
const state = {
  // philosophy video initial shown status
  philosophyVideoFlag: false,

  // preloader finished state
  preloaderIsFinished: false,

  // 0 - animation haven't started yet
  // 1 - animation is running
  // 2 - animation is finished
  homeAnimationPhase: 0,

  // flag to detect WebP support
  webp: false
};

// getters
const getters = {
  philosophyVideoWasShown: state => state.philosophyVideoFlag,
  preloaderIsFinished: state => state.preloaderIsFinished,
  animationIsFinished: state => state.homeAnimationPhase === 2,
  webpIsSupported: state => state.webp
};

// actions
const actions = {
  async nuxtServerInit({ commit }, { req: { headers } }) {
    try {
      const isCrawler = crawlersRegExp.test(headers['user-agent']);
      const webpSupport = isCrawler || headers.accept.includes('/webp');

      commit(types.SET_WEBP_SUPPORT, webpSupport);
    } catch (e) {
      console.log(`Error while detecting webp support, details: ${e.message}`);

      commit(types.SET_WEBP_SUPPORT, false);
    }
  },
  setVideoFlag({ commit }, flag) {
    commit(types.SET_VIDEO_FLAG, flag);
  },
  setPreloaderFinishedState({ commit }) {
    commit(types.SET_PRELOADER_FINISHED_STATE);
  },
  goToNextAnimationPhase({ commit, state }) {
    commit(types.SET_ANIMATION_PHASE, state.homeAnimationPhase + 1);
  }
};

// mutations
const mutations = {
  [types.SET_VIDEO_FLAG](state, flag) {
    state.philosophyVideoFlag = flag;
  },
  [types.SET_PRELOADER_FINISHED_STATE](state) {
    state.preloaderIsFinished = true;
  },
  [types.SET_ANIMATION_PHASE](state, phase) {
    state.homeAnimationPhase = phase;
  },
  [types.SET_WEBP_SUPPORT](state, flag) {
    state.webp = flag;
  }
};

export default () => new Store({
  state,
  getters,
  actions,
  mutations,

  // additional modules
  modules: {
    language,
    globalData,
    constructor,
    cart
  }
});
