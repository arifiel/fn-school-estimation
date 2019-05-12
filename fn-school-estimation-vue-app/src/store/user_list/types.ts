import {IUser} from '@/common/interfaces/IUser';

export interface UserListState {
    data: Array<IUser>;
    error: boolean;
}