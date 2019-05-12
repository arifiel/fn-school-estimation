import {IUser} from '@/common/interfaces/IUser';
import {ICr} from '@/common/interfaces/ICr';
import {MutationTree} from 'vuex';
import {RootState} from '@/store/types';
import router from '@/router/router';
import {ITask} from '@/common/interfaces/ITask';

export const mutations: MutationTree<RootState> = {
  setToken(state, payload: string) {
    state.loggedIn = true;
    state.token = payload;
  },
  setCrLisr(state, payload: Array<ICr>) {
    state.crList = payload;
  },
  tasksForCr(state, payload: Array<ITask>) {
    state.tasksForCr = payload;
  },
  logout(state) {
    state.loggedIn = false;
    //state.user = undefined;
    state.token = undefined;
    localStorage.removeItem('token');
    router.push('/login');
  },
  loginError(state, payload: boolean) {
    state.loginError = payload;
  },
};