import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {RootState} from '@/store/types';
import {mutations} from '@/store/mutations';
import {actions} from '@/store/actions';
import { user } from './user/index';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = ({
  state: {
    loggedIn: !!localStorage.token,
    token: localStorage.token,
    loginError: false,
    //user: undefined,
    userList: undefined,
    crList: undefined,
    tasksForCr: undefined,
  },
  mutations,
  actions,
  getters: {
    token: (aState) => aState.token,
  },
  modules: {
    user
  },
});

export default new Vuex.Store<RootState>(storeOptions);