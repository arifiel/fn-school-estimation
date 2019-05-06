import axios from 'axios';

const API_URL = VUE_APP_API_URL || 'http://localhost:5000/api';

export enum API_URLS{ 
  LOGIN = '/aouth/token',
  LOGOUT = '/logout',
  SIGN_UP = '/signup',
  USER = '/user',
  CR_LIST = '/cr',
  TASK_LIST_FOR_CR = '/cr/${crId}/tasks/',
  CREATE_CR = '/add_cr',
  CREATE_TASK = '/add_task',
}

export default axios.create({
	baseURL: API_URL,
  headers: {
		'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.token
  }
});