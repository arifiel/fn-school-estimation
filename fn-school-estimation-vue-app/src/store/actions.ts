// profile/actions.ts
import { ActionTree, ActionContext } from 'vuex';
import axios, {API_URLS} from '@/axios';
import {Credentials} from '@/store/types';
import {RootState} from '@/store/types';
import {ITask} from '@/common/interfaces/ITask';

export const actions: ActionTree<RootState, RootState> = {
    login(store: ActionContext<RootState, any>, credentials: Credentials) {
      getToken(store, credentials);
    },
    loadCrList(store: ActionContext<RootState, any>) {
      loadCrList(store);
    },
    createUser(store: ActionContext<RootState, any>, credentials: Credentials) {
      createUser(store, credentials);
    },
    updateAssigneeList(store: ActionContext<RootState, any>, data: any) {
      updateAssigneeList(store, data);
    },
};

function getToken(store: ActionContext<RootState, any>, credentials: Credentials) {
  axios.get(API_URLS.LOGIN, {params: {'login': credentials.username, 'password': credentials.password}})
  .then((response: any) => {
    store.commit('setToken', response.data);
    if(credentials.shouldStayLoggedIn) {
      localStorage.token = response.data;
    }
  }, (error: any) => {
      console.log(error);
      store.commit('loginError', true);
  });
}

function loadCrList(store : ActionContext<RootState, any>) {
  axios.get(API_URLS.CR_LIST, {headers: {'Authorization': 'Bearer ' + store.state.token}})
  .then((response: any) => {
    store.commit('setCrLisr', response.data);
  }, (error: any) => {
      console.log(error);
  });
}

function createUser(store : ActionContext<RootState, any> , credentials: Credentials) {
  axios.post(API_URLS.SIGN_UP,
    {
      body: {'login': credentials.username, 'password': credentials.password, 'email': credentials.email},
    })
  .then((response: any) => {
    getToken(store, credentials);
  }, (error: any) => {
      console.log(error);
  });
}

function updateAssigneeList(store : ActionContext<RootState, any> , data: any) {
  axios.put(API_URLS.UPDATE_ASSIGNEE.replace('${crId}', data.crId), {body: data.assigned}, {headers: {'Authorization': 'Bearer ' + store.state.token}})
  .then((response: any) => {
    loadCrList(store);
  }, (error: any) => {
      console.log(error);
  });
}

