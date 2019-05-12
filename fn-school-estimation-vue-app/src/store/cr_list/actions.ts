import { ActionTree, ActionContext } from 'vuex';
import { CrListState } from './types';
import { RootState } from '../types';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<CrListState, RootState> = {
  load(store: ActionContext<CrListState, any>) {
    loadCrList(store);
  },
};

function loadCrList(store : ActionContext<CrListState, any>) {
  store.commit('loading', true);
  axios.get(API_URLS.CR_LIST, {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    store.commit('data', response.data);
  }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}