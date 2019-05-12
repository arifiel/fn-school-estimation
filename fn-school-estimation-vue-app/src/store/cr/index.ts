// profile/index.ts
import { Module } from 'vuex';
//import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CrState } from './types';
import { RootState } from '../types';

export const state: CrState = {
  data: undefined,
  loading: false,
  error: false
};

const namespaced: boolean = true;

export const cr: Module<CrState, RootState> = {
  namespaced,
  state,
  //getters,
  actions,
  mutations
};