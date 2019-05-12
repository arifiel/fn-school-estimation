import { MutationTree } from 'vuex';
import { CrState } from './types';
import {ICr} from '@/common/interfaces/ICr';
import router from '@/router/router';

export const mutations: MutationTree<CrState> = {
  data(state, payload: ICr) {
		state.data = payload;
		state.error = false;
  },
	clear(state) {
		state.data = undefined;
		state.error = false;
	},
	error(state) {
		state.error = true;
	},

};