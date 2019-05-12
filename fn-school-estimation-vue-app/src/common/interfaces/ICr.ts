import {CrStatus} from '@/common/interfaces/CrStatus';
import {IProject} from '@/common/interfaces/IProject';
import {IUserReference} from '@/common/interfaces/IUserReference';

export interface ICr {
    id?: string;
    title: string;
    status: CrStatus;
    project: IProject;
    owner: IUserReference;
    created_at: Date;
    assigned: Array<IUserReference>;
    jiraLink?: string;
}
