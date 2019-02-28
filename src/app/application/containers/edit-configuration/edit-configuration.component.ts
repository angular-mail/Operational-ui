import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import {AnagogDefaultConfig, Operational} from '../../models/application-configuration';
import {Router, ActivatedRoute} from '@angular/router';
import {BaseComponent} from 'src/app/core/components/base-component/base-component';
import {LoaderService} from 'src/app/core/services/loader.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {InformService} from 'src/app/core/services/inform.service';

@Component({
    selector: 'ag-edit-configuration',
    templateUrl: './edit-configuration.component.html',
    styleUrls: ['./edit-configuration.component.scss']
})
export class EditConfigurationComponent extends BaseComponent implements OnInit {
    configuration: Operational;
    title = this.route.snapshot.params.id;
    constructor(
        private applicationService: ApplicationService,
        private router: Router,
        private route: ActivatedRoute,
        loaderService: LoaderService,
        private informService: InformService
    ) {
        super(loaderService);
    }

    ngOnInit() {
        this.configuration =
            this.applicationService.activeConfiguration && this.applicationService.activeConfiguration.Operational;
    }

    onBackButtonClick() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    onSave(operational: Operational) {
        this.applicationService.downloadConfiguration(this.normalizeConfiguration(operational));
    }

    onUpload(operational: Operational) {
        this.isLoading = true;
        this.applicationService
            .uploadApplicationConfiguration(this.normalizeConfiguration(operational))
            .pipe(
                finalize(() => (this.isLoading = false)),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(() => {
                this.informService.showSuccessMessage('Successfully uploaded configuration');
            });
    }

    normalizeConfiguration(operational: Operational) {
        const configuration = {
            ...this.applicationService.activeConfiguration.Operational,
            ...operational
        };

        return {
            ...this.applicationService.activeConfiguration,
            Operational: configuration
        };
    }
}
