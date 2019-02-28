import {Action} from '@ngrx/store';
import {AppUser} from '../models/app-user';

export interface State {
    users: AppUser[];
}

export const initialState: State = {
    users: []
};

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        default:
            return state;
    }
}

// import {AuthApiActions, AuthActions} from '@app/auth/actions';
// import {User} from '../models/user.model';

// export interface State {
//     user: User | null;
// }

// export const initialState: State = {
//     user: null
// };

// export function reducer(
//     state = initialState,
//     action: AuthApiActions.AuthActions | AuthActions.AuthActionsUnion
// ): State {
//     switch (action.type) {
//         case AuthApiActions.AuthApiActionTypes.LoginSuccess: {
//             return {
//                 ...state,
//                 user: action.payload.user
//             };
//         }

//         case AuthActions.AuthActionTypes.Logout: {
//             return initialState;
//         }

//         default: {
//             return state;
//         }
//     }
// }

// export const getUser = (state: State) => state.user;
