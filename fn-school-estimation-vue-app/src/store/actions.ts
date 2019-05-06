// profile/actions.ts
import { ActionTree, ActionContext } from 'vuex';
import axios, {API_URLS} from '@/axios';
import {Credentials} from '@/store/types';
import {RootState} from '@/store/types';
import {IUser} from '@/common/interfaces/IUser';

export const actions: ActionTree<RootState, RootState> = {
    login(store: ActionContext<RootState, any>, credentials: Credentials) {
      getToken(store, credentials);
    },
    getUser(store: ActionContext<RootState, any>) {
      getUser(store);
    },
    loadCrList(store: ActionContext<RootState, any>) {
      loadCrList(store);
    },
    createUser(store: ActionContext<RootState, any>, credentials: Credentials) {
      createUser(store, credentials);
    },
    createCr(store: ActionContext<RootState, any>, crdata: any) {
      createCr(store, crdata);
    },
    loadTasksForCr(store: ActionContext<RootState, any>, crId: string) {
      loadTasksForCr(store, crId);
    },
    createTask(store: ActionContext<RootState, any>, taskData: any) {
      createTask(store, taskData, '123');
    },
};

function getToken(store: ActionContext<RootState, any>, credentials: Credentials) {
  axios.get(API_URLS.LOGIN, {params: {'login': credentials.username, 'password': credentials.password}})
  .then((response: any) => {
    store.commit('setToken', response.data);
    if(credentials.shouldStayLoggedIn) {
      localStorage.token = response.data;
    }
    getUser(store);
  }, (error: any) => {
      console.log(error);
      store.commit('loginError', true);
  });
}

function getUser(store : ActionContext<RootState, any>) {
  axios.get(API_URLS.USER, {headers: {'Authorization': 'Bearer ' + store.state.token}})
  .then((response: any) => {
    store.commit('setUser', response.data);
    store.commit('loginError', false);
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

function loadTasksForCr(store : ActionContext<RootState, any>, crId: string) {
  axios.get(API_URLS.TASK_LIST_FOR_CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.state.token}})
  .then((response: any) => {
    store.commit('tasksForCr', response.data);
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

function createCr(store : ActionContext<RootState, any> , crdata: any) {
  console.log(crdata);

  var headers = {
    'Authorization': 'Bearer ' + store.state.token
  };
  
  axios.post(API_URLS.CREATE_CR, {body: crdata}, {headers: {'Authorization': 'Bearer ' + store.state.token}})
  .then((response: any) => {
    loadCrList(store);
  }, (error: any) => {
      console.log(error);
  });
}

function createTask(store : ActionContext<RootState, any> , taskData: any, crId: string) {
  axios.post(API_URLS.CREATE_TASK, {body: {'crId': crId, 'title': taskData.title, 'description': taskData.description}})
  .then((response: any) => {
    //getToken(store, credentials);
  }, (error: any) => {
      console.log(error);
  });
}