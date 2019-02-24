import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './containers/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './reducers';

const COMPONENTS = [LoginComponent, LoginFormComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        AuthRoutingModule,
        SharedModule,
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature('auth', fromAuth.reducers)
    ]
})
export class AuthModule {}
