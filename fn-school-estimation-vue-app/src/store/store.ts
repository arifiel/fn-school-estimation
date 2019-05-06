import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {RootState} from '@/store/types';
import {mutations} from '@/store/mutations';
import {actions} from '@/store/actions';

Vue.use(Vuex);

const store: StoreOptions<RootState> = ({
  state: {
    loggedIn: !!localStorage.token,
    token: localStorage.token,
    user: undefined,
    crList: undefined,
    tasksForCr: undefined,
    loginError: false,
  },
  mutations,
  actions,
});

export default new Vuex.Store<RootState>(store);