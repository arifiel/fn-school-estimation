// profile/index.ts
import { Module } from 'vuex';
//import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { TasksForCrState } from './types';
import { RootState } from '../types';

export const state: TasksForCrState = {
  data: [],
  error: false
};

const namespaced: boolean = true;

export const tasksForCr: Module<TasksForCrState, RootState> = {
  namespaced,
  state,
  //getters,
  actions,
  mutations
};