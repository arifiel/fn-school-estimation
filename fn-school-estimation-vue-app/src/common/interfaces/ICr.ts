import {CrStatus} from '@/common/interfaces/CrStatus';
import {IProject} from '@/common/interfaces/IProject';
import {IAssignee} from '@/common/interfaces/IAssignee';

export interface ICr {
    id?: string;
    title: string;
    status: CrStatus;
    project: IProject;
    owner: IAssignee;
    created_at: Date;
    assigned: Array<IAssignee>;
    jiraLink?: string;
}
