import { MutationTree } from 'vuex';
import { CrState } from './types';
import {ICr} from '@/common/interfaces/ICr';
import router from '@/router/router';

export const mutations: MutationTree<CrState> = {
	loading(state, value: boolean) {
		state.loading = value;
	},
  data(state, payload: ICr) {
		state.data = payload;
		state.error = false;
		state.loading = false;
  },
	clear(state) {
		state.data = undefined;
		state.error = false;
		state.loading = false;
	},
	error(state) {
		state.error = true;
		state.loading = false;
	},

};