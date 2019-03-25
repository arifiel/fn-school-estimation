import {CrStatus} from '@/common/interfaces/CrStatus';
import {IProject} from '@/common/interfaces/IProject';
import {IUser} from '@/common/interfaces/IUser';

export interface ICr {
    id: string;
    title: string;
    status: CrStatus;
    project: IProject;
    owner: IUser;
    version: string;
    created_at: Date;
    tasks: [];
}
