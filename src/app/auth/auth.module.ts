import {NgModule} from '@angular/core';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './containers/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {LoginFormComponent} from './components/login-form/login-form.component';

const COMPONENTS = [LoginComponent, LoginFormComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
