import {ICr} from '@/common/interfaces/ICr';
import {mocked_crs} from '@/common/mocks/CrMock';


let CrList: ICr[] = [];

export class CrLoadService {

    public static load() {
        CrList = mocked_crs;
    }

    public static get(): ICr[] {
        if(CrList === []) {
            CrLoadService.load()
        }
        return CrList;
    }


}
