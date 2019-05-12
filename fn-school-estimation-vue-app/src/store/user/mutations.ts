import { MutationTree } from 'vuex';
import { UserState } from './types';
import {IUser} from '@/common/interfaces/IUser';
import router from '@/router/router';

export const mutations: MutationTree<UserState> = {
  data(state, payload: IUser) {
		state.data = payload;
		state.error = false;
    router.push('/');
	},
	clear(state) {
		state.data = undefined;
		state.error = false;
	},
	error(state) {
		state.error = true;
	},

};