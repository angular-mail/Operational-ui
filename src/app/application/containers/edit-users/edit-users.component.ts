import {Component, OnInit, ViewChild} from '@angular/core';
import { AppUser, BaseAppUser } from '../../models/app-user';
import { EditUsersFormComponent } from '../../components/edit-users-form/edit-users-form.component';
import { ApplicationService } from '../../services/application.service';
import { BaseComponent } from 'src/app/core/components/base-component/base-component';
import { LoaderService } from 'src/app/core/services/loader.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { InformService } from 'src/app/core/services/inform.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ag-edit-users',
    templateUrl: './edit-users.component.html',
    styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent extends BaseComponent implements OnInit {
    @ViewChild(EditUsersFormComponent) editUsersFormComponent: EditUsersFormComponent;
    users = Array.from({length: 5}).map((_, i) => {
        return new AppUser({
            id: i,
            name: `user${i}.anagog`,
            canDelete: false,
            canUpdate: false,
            canAddUsers: false
        })
    });
    activeItemId;
    appName = this.route.snapshot.params.id;

    constructor(private applicationService: ApplicationService, loaderService: LoaderService,
        private informService: InformService, private router: Router, private route: ActivatedRoute) {
        super(loaderService);
    }

    ngOnInit() {
    }

    onUserSelect(activeItemId: number) {
        this.activeItemId = activeItemId;
    }

    onBackButtonClick() {
        this.router.navigate(['../'], {relativeTo: this.route})
    }

    onUserAdd(user: BaseAppUser) {
        this.isLoading = true;
        this.applicationService.addUser(new AppUser({
            id: this.users.length,
            ...user
        })).pipe(
            finalize(() => this.isLoading = false),
            takeUntil(this.ngUnsubscribe)
        ).subscribe((newUser: AppUser) => {
            this.users = [...this.users, newUser];
            this.editUsersFormComponent.resetForm();
            this.informService.showSuccessMessage(`Successfully added user ${newUser.name}`);
        });
    }

    onUserDelete() {
        this.isLoading = true;
        this.applicationService.removeUser({
            userlist: this.users,
            userId: this.activeItemId
        }).pipe(
            finalize(() => this.isLoading = false),
            takeUntil(this.ngUnsubscribe)
        ).subscribe((userList: AppUser[]) => {
            this.users = [...userList];
            this.informService.showSuccessMessage('Successfully removed user');
        });
    }
}
