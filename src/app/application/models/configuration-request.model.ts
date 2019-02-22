import {AppVersion, AppBuild} from './application.model';

export interface ConfigurationRequest {
    appName: string;
    version: AppVersion;
    build: AppBuild;
}
