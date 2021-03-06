import {ICr} from '@/common/interfaces/ICr';

export interface CrState {
    data?: ICr;
    loading: boolean;
    error: boolean;
}