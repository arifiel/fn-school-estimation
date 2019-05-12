import { ActionTree, ActionContext } from 'vuex';
import { UserListState } from './types';
import { RootState } from '../types';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<UserListState, RootState> = {
    load(store: ActionContext<UserListState, RootState>) {
      loadUserList(store);
    },
};

function loadUserList(store : ActionContext<UserListState, any>) {
  axios.get(API_URLS.USER_LIST, {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
    .then((response: any) => {
      store.commit('data', response.data);
      store.commit('error', false);
    }, (error: any) => {
        console.log(error);
        store.commit('error', true);
  });
}