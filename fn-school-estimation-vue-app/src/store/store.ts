import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {RootState} from '@/store/types';
import {mutations} from '@/store/mutations';
import {actions} from '@/store/actions';
import { user } from './user/index';
import { userList } from './user_list/index';
import { cr } from './cr/index';
import { tasksForCr } from './tasks_for_cr/index';
import { crList } from './cr_list/index';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = ({
  state: {
    loggedIn: !!localStorage.token,
    token: localStorage.token,
    loginError: false,
  },
  mutations,
  actions,
  modules: {
    user,
    userList,
    cr,
    crList,
    tasksForCr,
  },
});

export default new Vuex.Store<RootState>(storeOptions);