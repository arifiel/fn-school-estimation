import {Estimation} from './Estimation';

export interface ITask {
    id: string;
    crId: string;
    title: string,
    description: string,
    mergedEstimation?: string;
    estimationList: Array<Estimation>;
}
