import {IUser} from '@/common/interfaces/IUser';
import {ICr} from '@/common/interfaces/ICr';
import {ITask} from '@/common/interfaces/ITask';

export interface RootState {
  loggedIn: boolean;
  token?: string;
  crList?: Array<ICr>;
  loginError: boolean;
}

export interface Credentials {
  username: string;
  password: string;
  shouldStayLoggedIn: boolean;
  email?: string;
}

