import {AuthApiActions, AuthActions} from '@app/auth/actions';
import {User} from '../models/user.model';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null
};

export function reducer(
    state = initialState,
    action: AuthApiActions.AuthActions | AuthActions.AuthActionsUnion
): State {
    switch (action.type) {
        case AuthApiActions.AuthApiActionTypes.LoginSuccess: {
            return {
                ...state,
                user: action.payload.user
            };
        }

        case AuthActions.AuthActionTypes.Logout: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export const getUser = (state: State) => state.user;
