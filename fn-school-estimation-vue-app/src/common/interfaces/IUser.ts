import {IUserReference} from '@/common/interfaces/IUserReference';

export interface IUser extends IUserReference {
    roles: string[] | null;
}
