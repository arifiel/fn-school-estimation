import { ActionTree, ActionContext } from 'vuex';
import { UserState } from './types';
import { RootState } from '../types';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<UserState, RootState> = {
    load(store: ActionContext<UserState, RootState>) {
      loadUser(store);
    },
};

function loadUser(store : ActionContext<UserState, any>) {
  axios.get(API_URLS.USER, {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
    .then((response: any) => {
      store.commit('data', response.data);
    }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}