import {IAssignee} from './IAssignee';

export interface IUser extends IAssignee {
    roles: string[] | null;
}
