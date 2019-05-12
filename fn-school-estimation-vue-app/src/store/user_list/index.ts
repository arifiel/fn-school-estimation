// profile/index.ts
import { Module } from 'vuex';
//import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { UserListState } from './types';
import { RootState } from '../types';

export const state: UserListState = {
  data: [],
  error: false
};

const namespaced: boolean = true;

export const userList: Module<UserListState, RootState> = {
  namespaced,
  state,
  //getters,
  actions,
  mutations
};