import {MutationTree} from 'vuex';
import {RootState} from '@/store/types';
import router from '@/router/router';

export const mutations: MutationTree<RootState> = {
  setToken(state, payload: string) {
    state.loggedIn = true;
    state.token = payload;
  },
  logout(state) {
    state.loggedIn = false;
    state.token = undefined;
    localStorage.removeItem('token');
    router.push('/login');
  },
  loginError(state, payload: boolean) {
    state.loginError = payload;
  },
};