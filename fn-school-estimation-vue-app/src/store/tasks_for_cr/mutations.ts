import { MutationTree } from 'vuex';
import { TasksForCrState } from './types';
import {ITask} from '@/common/interfaces/ITask';

export const mutations: MutationTree<TasksForCrState> = {
  data(state, payload: Array<ITask>) {
		state.data = payload;
		state.error = false;
  },
	clear(state) {
		state.data = [];
		state.error = false;
	},
	error(state) {
		state.error = true;
	},

};