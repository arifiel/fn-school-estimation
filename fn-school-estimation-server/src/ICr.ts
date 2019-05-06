import {CrStatus} from './CrStatus';
import {IProject} from './IProject';
import {IAssignee} from './IAssignee';

export interface ICr {
    id: string;
    title: string;
    status: CrStatus;
    project: IProject;
    owner: IAssignee;
    created_at: Date;
    assigned: Array<IAssignee>;
}
