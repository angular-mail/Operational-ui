import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ApplicationService} from '../../services/application.service';
import {BaseComponent} from 'src/app/core/components/base-component/base-component';
import {LoaderService} from 'src/app/core/services/loader.service';
import {takeUntil, distinctUntilChanged, debounceTime, finalize, mergeMap, tap, filter} from 'rxjs/operators';
import {App, AppVersion} from '../../models/application.model';
import {Router, ActivatedRoute} from '@angular/router';
import {FORM_BUTTON} from '../../models/form-button.enum';
import {UploadService} from '../../services/upload-service';
import {MatDialog} from '@angular/material';
import {DeleteDialogComponent} from '../../components/delete-dialog/delete-dialog.component';
import {InformService} from 'src/app/core/services/inform.service';

@Component({
    selector: 'ag-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent extends BaseComponent implements OnInit {
    private static baseState = {
        selectedApp: null,
        version: null,
        build: null
    };
    private _state = {
        ...MainViewComponent.baseState
    };

    constructor(
        loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
        private applicationService: ApplicationService,
        private uploadService: UploadService,
        private matDialogService: MatDialog,
        private informService: InformService
    ) {
        super(loaderService);
    }

    appForm = new FormGroup({
        selectedApp: new FormControl(undefined),
        version: new FormControl(undefined),
        build: new FormControl(undefined)
    });

    applications: App[] = [];

    ngOnInit() {
        this.setApplications();
        this.listenForAppChanges();
        this.listenFormChanges();
    }

    onButtonClick(type: FORM_BUTTON) {
        switch (type) {
            case FORM_BUTTON.DOWNLOAD:
                this.handleDownloadAction();
                break;
            case FORM_BUTTON.EDIT_USERS:
                this.router.navigate(['./edit-users'], {relativeTo: this.route});
                break;
            case FORM_BUTTON.DELETE:
                this.openDeleteDialog((this.state.selectedApp as App).AppName);
                break;
            case FORM_BUTTON.CREATE:
                this.router.navigate(['./create'], {relativeTo: this.route});
                break;
            case FORM_BUTTON.RESET:
                this.router.navigate(['../'], {relativeTo: this.route});
                break;
            default:
                break;
        }
    }

    openDeleteDialog(name) {
        this.matDialogService
            .open(DeleteDialogComponent, {
                height: '300px',
                width: '400px',
                data: {name}
            })
            .afterClosed()
            .pipe(
                filter(v => !!v),
                tap(() => (this.isLoading = true)),
                mergeMap(isShouldDelete => isShouldDelete && this.applicationService.removeApp(name)),
                finalize(() => (this.isLoading = false)),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe(() => {
                this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
                    this.informService.showSuccessMessage(`Removed app ${name}`);
                });
            });
    }

    handleDownloadAction() {
        const {selectedApp, build, version} = this.state;
        this.isLoading = true;
        this.applicationService
            .fetchApplicationConfiguration({
                appName: (selectedApp as App).AppName,
                build,
                version
            })
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe(configuration => {
                this.applicationService.activeConfiguration = configuration.AnagogDefaultConfig;
                this.applicationService.downloadConfiguration(configuration.AnagogDefaultConfig).then(() => {
                    this.goToConfiguration();
                });
            });
    }

    goToConfiguration() {
        this.router.navigate(['./configuration'], {relativeTo: this.route});
    }

    onUpload(file) {
        this.uploadService.readFile(file).then(receivedfile => {
            try {
                const configuration = JSON.parse(receivedfile.value);
                // TODO: validation needed
                this.applicationService.activeConfiguration = configuration;
                this.goToConfiguration();
            } catch (e) {
                console.log(e);
            }
        });
    }

    listenFormChanges() {
        const form$ = this.appForm.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.ngUnsubscribe));

        form$.subscribe(formValues => {
            const changedKey = Object.keys(this.state).find(key => this.state[key] !== formValues[key]);
            if (changedKey) {
                this.handleChange(changedKey, formValues);
            }
        });
    }

    listenForAppChanges() {
        this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(({id}) => {
            if (id) {
                this.setApp(id);
                return;
            }
            if (this.isSelectedState) {
                this.resetApp();
            }
        });
    }

    handleChange(prop: string, formValues) {
        switch (prop) {
            case 'selectedApp':
                this.router.navigate([`${this.isSelectedState ? '../' : ''}${formValues.selectedApp.AppName}`], {
                    replaceUrl: true,
                    relativeTo: this.route
                });
                break;
            case 'version':
                this.state = {
                    ...this.state,
                    ...this.onSelectVersion(formValues.version)
                };
                break;
            case 'build':
                this.state = {
                    ...this.state,
                    build: formValues.build
                };
                break;
        }
    }

    setApplications() {
        this.applications = this.applicationService.apps;
    }

    resetApp() {
        this.state = {
            ...MainViewComponent.baseState
        };
    }

    setApp(appName: string) {
        if (!appName) {
            return;
        }

        const app = this.applications.find(item => item.AppName === appName);

        if (!app) {
            this.router.navigate(['../'], {relativeTo: this.route}).then(() => {
                this.informService.handleError('No such app');
            });
            return;
        }

        this.state = {
            selectedApp: app,
            ...this.onSelectVersion(app.Versions[0])
        };
    }

    onSelectVersion(version: AppVersion) {
        const build = version.Builds[version.LastBuild - 1];
        return {
            build,
            version
        };
    }

    get title(): string {
        return this.isSelectedState ? 'Application Selected' : 'Select Application';
    }

    get isSelectedState(): boolean {
        return !!this.state.selectedApp;
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState;
        this.appForm.patchValue({...newState});
    }
}
