import {Action} from '@ngrx/store';
import {AppUser} from '../models/app-user';

export enum UsersActionTypes {
    LoadUsers = '[Users] Load Users',
    DeleteUser = '[Users] Delete User',
    AddUser = '[Users] Add User'
}

export class LoadUsers implements Action {
    readonly type = UsersActionTypes.LoadUsers;
}

export class DeleteUser implements Action {
    readonly type = UsersActionTypes.DeleteUser;
    constructor(payload: number) {}
}

export class AddUser implements Action {
    readonly type = UsersActionTypes.AddUser;
    constructor(payload: AppUser) {}
}

export type UsersActions = LoadUsers | DeleteUser | AddUser;
