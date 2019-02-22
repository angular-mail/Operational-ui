import {Component, OnInit} from '@angular/core';
import {BaseComponent} from 'src/app/core/components/base-component/base-component';
import {LoaderService} from 'src/app/core/services/loader.service';
import {ApplicationService} from '../../services/application.service';
import {finalize} from 'rxjs/operators';
import {Router, ActivatedRoute} from '@angular/router';
import {AppResponse} from '../../models/application.model';

@Component({
    selector: 'ag-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
    constructor(
        loaderService: LoaderService,
        private applicationService: ApplicationService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        super(loaderService);
    }

    ngOnInit() {}

    onSubmit(formValues: {appName: string}) {
        this.isLoading = true;
        this.applicationService
            .addApp(formValues)
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe((newApps: AppResponse) => {
                this.applicationService.apps = newApps.Apps;
                this.router.navigate([`../${formValues.appName}`], {relativeTo: this.route});
            });
    }

    redirectToAppsPage() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onCancelClick() {
        this.redirectToAppsPage();
    }
}
