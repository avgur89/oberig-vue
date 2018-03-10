/* eslint-disable no-shadow, arrow-body-style, no-unused-vars */

import * as types from '../mutation-types';
import { sortBy } from 'lodash';

// initial state
// constructorSelected - user-selected items
const state = {
  constructorSelected: []
};

// getters
const getters = {
  constructorSelected: state => state.constructorSelected,
  constructorHasSelected: state => state.constructorSelected.length > 0
};

// actions
const actions = {
  addConstructorItem({ commit, state }, itemToAdd) {
    const newSelected = sortBy([...state.constructorSelected, itemToAdd], [
      'categoryId',
      'id'
    ]);

    commit(types.SET_CONSTRUCTOR_ITEMS, newSelected);
  },

  removeConstructorItem({ commit, state }, itemToRemove) {
    const newSelected = state.constructorSelected.filter(item => (
      (item.category === itemToRemove.category) ? item.id !== itemToRemove.id : true
    ));

    commit(types.SET_CONSTRUCTOR_ITEMS, newSelected);
  },

  clearConstructorItems({ commit }) {
    commit(types.SET_CONSTRUCTOR_ITEMS, []);
  }
};

// mutations
const mutations = {
  [types.SET_CONSTRUCTOR_ITEMS](state, newSelected) {
    state.constructorSelected = newSelected;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
