import { ActionTree, ActionContext } from 'vuex';
import { CrState } from './types';
import { RootState } from '../types';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<CrState, RootState> = {
    load(store: ActionContext<CrState, RootState>, crId: any) {
      loadCr(store, crId);
    },
    create(store: ActionContext<CrState, any>, crdata: any) {
      createCr(store, crdata);
    },
    close(store: ActionContext<CrState, any>, crId: string) {
      closeCr(store, crId);
    },
    approve(store: ActionContext<CrState, any>, crId: string) {
      approveCr(store, crId);
    },
    reject(store: ActionContext<CrState, any>, crId: string) {
      rejectCr(store, crId);
    },
};

function loadCr(store : ActionContext<CrState, any>, crId: any) {
  store.commit('loading', true);
  axios.get(API_URLS.CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
    .then((response: any) => {
      store.commit('data', response.data);
    }, (error: any) => {
        console.log(error);
        store.commit('error', true);
  });
}

function createCr(store : ActionContext<CrState, any> , crdata: any) {
  store.commit('loading', true);
  axios.post(API_URLS.CREATE_CR, {body: crdata}, {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    store.commit('loading', false);
  }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}

function closeCr(store : ActionContext<CrState, any> , crId: string) {
  store.commit('loading', true);
  axios.patch(API_URLS.CLOSE_CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    store.commit('loading', false);
  }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}

function approveCr(store : ActionContext<CrState, any> , crId: string) {
  store.commit('loading', true);
  axios.patch(API_URLS.APPROVE_CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    store.commit('loading', false);
  }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}

function rejectCr(store : ActionContext<CrState, any> , crId: string) {
  store.commit('loading', true);
  axios.patch(API_URLS.REJECT_CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    store.commit('loading', false);
  }, (error: any) => {
      console.log(error);
      store.commit('error', true);
  });
}