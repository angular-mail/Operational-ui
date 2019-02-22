import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';
import {AuthGuard} from './auth/guards/auth.guard';
import {ApplicationsResolver} from './application/resolvers/applications.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadChildren: './application/application.module#ApplicationModule',
        canActivate: [AuthGuard],
        resolve: {
            apps: ApplicationsResolver
        }
    },
    {path: '**', component: NotFoundPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
