import { ActionTree, ActionContext } from 'vuex';
import { CrState } from './types';
import { RootState } from '../types';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<CrState, RootState> = {
    load(store: ActionContext<CrState, RootState>, crId: any) {
      loadCr(store, crId);
    },
};

function loadCr(store : ActionContext<CrState, any>, crId: any) {
  axios.get(API_URLS.CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
    .then((response: any) => {
      store.commit('data', response.data);
      store.commit('error', false);
    }, (error: any) => {
        console.log(error);
        store.commit('error', true);
  });
}