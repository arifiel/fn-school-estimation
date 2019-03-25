import {ICr} from 'src/common/interfaces/ICr';
import {CrStatus} from '@/common/interfaces/CrStatus';

export const mocked_crs: ICr[] = [
    {
        id: "1",
        title: "Title 1",
        status: CrStatus.Approved,
        project: {
            id: "1",
            name: "Proj 1",
        },
        owner: {
            id: "1",
            name: "Person 1",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
    {
        id: "2",
        title: "Title 2",
        status: CrStatus.Assigned,
        project: {
            id: "1",
            name: "Proj 1",
        },
        owner: {
            id: "1",
            name: "Person 1",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
    {
        id: "3",
        title: "Title 3",
        status: CrStatus.WaitForApprove,
        project: {
            id: "2",
            name: "Proj 2",
        },
        owner: {
            id: "2",
            name: "Person 2",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
    {
        id: "4",
        title: "Title 4",
        status: CrStatus.WaitForMerge,
        project: {
            id: "2",
            name: "Proj 2",
        },
        owner: {
            id: "2",
            name: "Person 2",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
    {
        id: "5",
        title: "Title 5",
        status: CrStatus.Merged,
        project: {
            id: "1",
            name: "Proj 1",
        },
        owner: {
            id: "1",
            name: "Person 1",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
    {
        id: "6",
        title: "Title 6",
        status: CrStatus.Closed,
        project: {
            id: "2",
            name: "Proj 2",
        },
        owner: {
            id: "3",
            name: "Person 3",
            roles: [],
        },
        version: "1.0.0.0.0",
        created_at: new Date("2018-03-16"),
        tasks: [],
    },
]