import {CrStatus} from './CrStatus';
import {IProject} from './IProject';
import {IUserReference} from './IUserReference';

export interface ICr {
    id: string;
    title: string;
    status: CrStatus;
    project: IProject;
    owner: IUserReference;
    created_at: Date;
    assigned: Array<IUserReference>;
}
