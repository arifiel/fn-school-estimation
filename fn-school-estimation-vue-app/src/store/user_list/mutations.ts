import { MutationTree } from 'vuex';
import { UserListState } from './types';
import {IUser} from '@/common/interfaces/IUser';
import router from '@/router/router';

export const mutations: MutationTree<UserListState> = {
  data(state, payload: Array<IUser>) {
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