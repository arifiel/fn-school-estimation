import {ITask} from '@/common/interfaces/ITask';

export interface TasksForCrState {
    data: Array<ITask>;
    error: boolean;
}