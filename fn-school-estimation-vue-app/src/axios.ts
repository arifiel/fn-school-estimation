import axios from 'axios';

const API_URL = VUE_APP_API_URL || 'http://localhost:5000/api';

export enum API_URLS{ 
  LOGIN = '/aouth/token',
  LOGOUT = '/logout',
  SIGN_UP = '/signup',
  USER = '/user',
  USER_LIST = '/user_list',
  CR_LIST = '/cr',
  TASK_LIST_FOR_CR = '/cr/${crId}/tasks',
  CREATE_CR = '/add_cr',
  CREATE_TASK = '/add_task',
  CLOSE_CR = '/cr/${crId}/close',
  DELETE_TASK = '/task/${taskId}',
  ESTIMATE_TASK = '/task/${taskId}/estimate',
  MERGE_ESTIMATION = '/task/${taskId}/merge_estimation',
  APPROVE_CR = '/cr/${crId}/approve',
  REJECT_CR = '/cr/${crId}/reject',
  UPDATE_ASSIGNEE = '/cr/${crId}/assignee',
}

export default axios.create({
	baseURL: API_URL,
  headers: {
		'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
});