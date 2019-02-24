import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {LoginPageActions, AuthApiActions} from '../actions';
import {map, exhaustMap, catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginFormValues} from '../models/login-form-values.interface';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {JwtService} from '@app/core/services/jwt-token.service';

@Injectable()
export class AuthEffects {
    mainPageUrl = 'app';
    @Effect()
    login$ = this.actions$.pipe(
        ofType(LoginPageActions.LoginPageActionTypes.Login),
        map(action => action.payload.credentials),
        exhaustMap((auth: LoginFormValues) =>
            this.authService.signIn(auth).pipe(
                map(({user, token}) => new AuthApiActions.LoginSuccess({user, token})),
                catchError(error => of(new AuthApiActions.LoginFailure({error})))
            )
        )
    );

    @Effect({dispatch: false})
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
        map(action => action.payload),
        tap(({user, token}) => {
            this.jwtService.token = token;
            this.authService.user = user;
            this.router.navigate([this.mainPageUrl]);
        })
    );

    constructor(
        private actions$: Actions<LoginPageActions.LoginPageActionsUnion | AuthApiActions.AuthActions>,
        private authService: AuthService,
        private jwtService: JwtService,
        private router: Router
    ) {}
}
