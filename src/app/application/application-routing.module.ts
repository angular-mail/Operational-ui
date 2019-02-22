import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainViewComponent} from './containers/main-view/main-view.component';
import {EditConfigurationComponent} from './containers/edit-configuration/edit-configuration.component';
import {EditUsersComponent} from './containers/edit-users/edit-users.component';
import {CreateComponent} from './containers/create/create.component';
import { ConfigurationGuard } from './guards/configuration.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'create',
                component: CreateComponent
            },
            {
                path: '',
                component: MainViewComponent
            },
            {
                path: ':id',
                component: MainViewComponent
            },
            {
                path: ':id/configuration',
                component: EditConfigurationComponent,
                canActivate: [ConfigurationGuard]
            },
            {
                path: ':id/edit-users',
                component: EditUsersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {}
