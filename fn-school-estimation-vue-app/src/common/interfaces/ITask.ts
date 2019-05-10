import {Estimation} from '@/common/interfaces/Estimation';

export interface ITask {
    id: string;
    crId: string;
    title: string;
    decription: string;
    mergedEstimation?: string;
    estimationList: Array<Estimation>;
}
