import {Action} from '@ngrx/store';

export enum AuthActionTypes {
    Logout = '[Auth] Logout'
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion = Logout;
