import { MutationTree } from 'vuex';
import { CrListState } from './types';
import {ICr} from '@/common/interfaces/ICr';
import router from '@/router/router';

export const mutations: MutationTree<CrListState> = {
	loading(state, value: boolean) {
		state.loading = value;
	},
  data(state, payload: Array<ICr>) {
		state.data = payload;
		state.error = false;
		state.loading = false;
  },
	clear(state) {
		state.data = [];
		state.error = false;
		state.loading = false;
	},
	error(state) {
		state.error = true;
		state.loading = false;
	},

};