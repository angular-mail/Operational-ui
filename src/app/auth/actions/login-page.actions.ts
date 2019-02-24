import {Action} from '@ngrx/store';
import {LoginFormValues} from '../models/login-form-values.interface';

export enum LoginPageActionTypes {
    Login = '[Login Page] Login'
}

export class Login implements Action {
    readonly type = LoginPageActionTypes.Login;

    constructor(public payload: {credentials: LoginFormValues}) {}
}

export type LoginPageActionsUnion = Login;
