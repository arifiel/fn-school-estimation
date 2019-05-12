import {IUser} from '@/common/interfaces/IUser';

export interface UserState {
    data?: IUser;
    error: boolean;
}