import {IUser} from '@/common/interfaces/IUser';

let loggedIn: boolean = false;
let user: IUser | null = null;

export class AuthService {

    public static isLoggedIn(): boolean {
        return loggedIn;
    }

    public static login(login: string, password: string) {
        loggedIn = true;
        if (login === '' && password === '') {
            // do nothing
        } else if (login === 'manager') {
            user =  {id: '1', name: 'admin', roles: ['manager']};
        } else {
            user =  {id: '2', name: 'user', roles: ['worker']};
        }
    }

    public static logout() {
        loggedIn = false;
        user = null;
    }

    public static getUser(): IUser | null {
        return user;
    }
}
