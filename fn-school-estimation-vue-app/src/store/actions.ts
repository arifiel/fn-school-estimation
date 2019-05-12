// profile/actions.ts
import { ActionTree, ActionContext } from 'vuex';
import axios, {API_URLS} from '@/axios';
import {Credentials} from '@/store/types';
import {RootState} from '@/store/types';

export const actions: ActionTree<RootState, RootState> = {
    login(store: ActionContext<RootState, any>, credentials: Credentials) {
      getToken(store, credentials);
    },
    createUser(store: ActionContext<RootState, any>, credentials: Credentials) {
      createUser(store, credentials);
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

