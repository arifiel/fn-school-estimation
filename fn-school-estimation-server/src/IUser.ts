import {IUserReference} from './IUserReference';

export interface IUser extends IUserReference {
    roles: string[] | null;
}
