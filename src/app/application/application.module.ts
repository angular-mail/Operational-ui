import {NgModule} from '@angular/core';

import {ApplicationRoutingModule} from './application-routing.module';
import {MainViewComponent} from './containers/main-view/main-view.component';
import {SharedModule} from '../shared/shared.module';
import {ApplicationFormComponent} from './components/application-form/application-form.component';
import {EditConfigurationComponent} from './containers/edit-configuration/edit-configuration.component';
import {EditUsersComponent} from './containers/edit-users/edit-users.component';
import {CreateComponent} from './containers/create/create.component';
import {CreateFormComponent} from './components/create-form/create-form.component';
import {DeleteDialogComponent} from './components/delete-dialog/delete-dialog.component';
import {EditUsersListComponent} from './components/edit-users-list/edit-users-list.component';
import {EditUsersFormComponent} from './components/edit-users-form/edit-users-form.component';
import {EditConfigurationFormComponent} from './components/edit-configuration-form/edit-configuration-form.component';
import {StoreModule} from '@ngrx/store';
import * as fromUsers from './reducers/users.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffects} from './effects/users.effects';

@NgModule({
    declarations: [
        MainViewComponent,
        ApplicationFormComponent,
        EditConfigurationComponent,
        EditUsersComponent,
        CreateComponent,
        CreateFormComponent,
        DeleteDialogComponent,
        EditUsersListComponent,
        EditUsersFormComponent,
        EditConfigurationFormComponent
    ],
    imports: [
        ApplicationRoutingModule,
        SharedModule,
        StoreModule.forFeature('users', fromUsers.reducer),
        EffectsModule.forFeature([UsersEffects])
    ],
    entryComponents: [DeleteDialogComponent]
})
export class ApplicationModule {}
