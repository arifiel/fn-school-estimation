import { ActionTree, ActionContext } from 'vuex';
import { TasksForCrState } from './types';
import { RootState } from '../types';
import {ITask} from '@/common/interfaces/ITask';
import axios, {API_URLS} from '@/axios';


export const actions: ActionTree<TasksForCrState, RootState> = {
    load(store: ActionContext<TasksForCrState, RootState>, crId: any) {
      loadTaskList(store, crId);
    },
    create(store: ActionContext<TasksForCrState, RootState>, taskData: any) {
      createTask(store, taskData);
    },
    remove(store: ActionContext<TasksForCrState, any>, taskId: string) {
      removeTask(store, taskId);
    },
    estimate(store: ActionContext<TasksForCrState, any>, data: any) {
      estimate(store, data);
    },
    mergeEstimation(store: ActionContext<TasksForCrState, any>, data: any) {
      mergeEstimation(store, data);
    },
};

function loadTaskList(store : ActionContext<TasksForCrState, any>, crId: any) {
  axios.get(API_URLS.TASK_LIST_FOR_CR.replace('${crId}', crId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
    .then((response: any) => {
      store.commit('data', response.data);
    }, (error: any) => {
        console.log(error);
        store.commit('error', true);
  });
}

function createTask(store : ActionContext<TasksForCrState, any> , taskData: any) {
  axios.post(API_URLS.CREATE_TASK, {body: taskData}, {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    loadTaskList(store, taskData.cr_id);
  }, (error: any) => {
      console.log(error);
  });
}

function removeTask(store : ActionContext<TasksForCrState, any> , taskId: string) {
  var crId = "-1";
  let tasks = store.state.data as Array<ITask>;
  if(!!tasks) {
    crId = tasks.filter(t => t.id === taskId).map(t => t.crId)[0];
  }
  axios.delete(API_URLS.DELETE_TASK.replace('${taskId}', taskId), {headers: {'Authorization': 'Bearer ' + store.rootState.token}})
  .then((response: any) => {
    loadTaskList(store, crId);
  }, (error: any) => {
      console.log(error);
  });
}

function estimate(store : ActionContext<TasksForCrState, any> , estimationData: any) {
  var crId = "-1";
  let tasks = store.state.data as Array<ITask>;
  if(!!tasks) {
    crId = tasks.filter(t => t.id === estimationData.taskId).map(t => t.crId)[0];
  }
  axios.post(API_URLS.ESTIMATE_TASK.replace('${taskId}', estimationData.taskId), {body: {'estimation': estimationData.estimation, }},
    {headers: {'Authorization': 'Bearer ' + store.rootState.token}
  })
  .then((response: any) => {
    loadTaskList(store, crId);
  }, (error: any) => {
      console.log(error);
  });
}

function mergeEstimation(store : ActionContext<TasksForCrState, any> , estimationData: any) {
  var crId = "-1";
  let tasks = store.state.data as Array<ITask>;
  if(!!tasks) {
    crId = tasks.filter(t => t.id === estimationData.taskId).map(t => t.crId)[0];
  }
  axios.post(API_URLS.MERGE_ESTIMATION.replace('${taskId}', estimationData.taskId), {body: {'estimation': estimationData.estimation, }},
    {headers: {'Authorization': 'Bearer ' + store.rootState.token}
  })
  .then((response: any) => {
    loadTaskList(store, crId);
  }, (error: any) => {
      console.log(error);
  });
}