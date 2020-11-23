import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { GhostStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const GhostModule: Module<GhostStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default GhostModule;