import {IAssignee} from '@/common/interfaces/IAssignee';

export interface IUser extends IAssignee {
    roles: string[] | null;
}
