import {Action} from '@ngrx/store';
import {User} from '../models/user.model';

export enum AuthApiActionTypes {
    LoginSuccess = '[Auth/API] Login Success',
    LoginFailure = '[Auth/API] Login Failure'
}

export class LoginSuccess implements Action {
    readonly type = AuthApiActionTypes.LoginSuccess;

    constructor(public payload: {user: User; token: string}) {}
}

export class LoginFailure implements Action {
    readonly type = AuthApiActionTypes.LoginFailure;

    constructor(public payload: {error: any}) {}
}

export type AuthActions = LoginSuccess | LoginFailure;
