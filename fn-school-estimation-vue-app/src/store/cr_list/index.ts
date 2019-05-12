// profile/index.ts
import { Module } from 'vuex';
//import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CrListState } from './types';
import { RootState } from '../types';

export const state: CrListState = {
  data: [],
  loading: false,
  error: false
};

const namespaced: boolean = true;

export const crList: Module<CrListState, RootState> = {
  namespaced,
  state,
  //getters,
  actions,
  mutations
};