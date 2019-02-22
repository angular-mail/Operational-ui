import {Injectable} from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {Observable, throwError} from 'rxjs';
import {AppResponse, App} from '../models/application.model';
import {tap} from 'rxjs/operators';
import {AppConfigurationResponse, AnagogDefaultConfig} from '../models/application-configuration';
import {ConfigurationRequest} from '../models/configuration-request.model';
import {DownloadService} from './download.service';
import {LocalStorageService} from 'src/app/core/services/local.storage.service';
import {LocalStorageKeys} from 'src/app/core/models/local-storage-keys.enum';
import { AppUser } from '../models/app-user';

@Injectable({providedIn: 'root'})
export class ApplicationService {
    static readonly appsUrl = '/apps';
    static readonly deleteApp = '/appsdelete';
    static readonly configurationUrl = '/configuration';
    static readonly configurationSaveUrl = '/configuration/save';
    static readonly removeUserUrl = '/user-remove';
    static readonly addUserUrl = '/user';
    private _apps: App[] = null;
    activeConfiguration: AnagogDefaultConfig = null;
    constructor(private apiService: ApiService, private downloadService: DownloadService) {}

    fetchApplications(): Observable<AppResponse> {
        return this.apiService
            .get(ApplicationService.appsUrl)
            .pipe(tap(appsResponse => (this.apps = appsResponse.Apps)));
    }

    fetchApplicationConfiguration(data: ConfigurationRequest): Observable<AppConfigurationResponse> {
        return this.apiService.post(ApplicationService.configurationUrl, data);
    }

    uploadApplicationConfiguration(configuration: AnagogDefaultConfig) {
        return this.apiService.post(ApplicationService.configurationSaveUrl, configuration);
    }

    addApp(app: {appName: string}): Observable<AppResponse> {
        return this.apiService.post(ApplicationService.appsUrl, app);
    }

    removeApp(appName: string): Observable<AppResponse> {
        return this.apiService.post(ApplicationService.deleteApp, {appName});
    }

    get apps(): App[] {
        return (
            (LocalStorageService.get(LocalStorageKeys.APPS) && LocalStorageService.get(LocalStorageKeys.APPS).Apps) ||
            this._apps
        );
    }

    set apps(apps: App[]) {
        this._apps = apps;
    }

    addUser(user: AppUser): Observable<AppUser> {
        return this.apiService.post(ApplicationService.addUserUrl, user);
    }

    removeUser(payload: { userlist: AppUser[], userId: number }): Observable<AppUser[]> {
        return this.apiService.post(ApplicationService.removeUserUrl, payload);
    }

    invalidateApps() {
        this.apps = null;
    }

    downloadConfiguration(configuration: AnagogDefaultConfig) {
        return this.downloadService.downloadAsZip(JSON.stringify(configuration));
    }
}
