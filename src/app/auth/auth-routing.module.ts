import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthenticatedGuard],
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
