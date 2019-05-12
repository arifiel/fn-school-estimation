import {ICr} from '@/common/interfaces/ICr';

export interface CrListState {
    data: Array<ICr>;
    loading: boolean;
    error: boolean;
}