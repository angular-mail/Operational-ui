export interface AppBuild {
    Build: number;
    Comment: string;
}

export interface AppVersion {
    Version: string;
    ActiveBuild: number;
    LastBuild: number;
    Builds: AppBuild[];
}

export interface App {
    AppName: string;
    Versions: AppVersion[];
}

export interface AppResponse {
    Apps: App[];
}

export class DefaultApp implements App {
    AppName: string;
    Versions: AppVersion[];
    constructor(name: string) {
        this.AppName = (name && name) || '';
        this.Versions = [
            {
                Version: new Date().toLocaleDateString(),
                ActiveBuild: 1,
                LastBuild: 1,
                Builds: [
                    {
                        Build: 1,
                        Comment: `${this.AppName} created from app #1`
                    }
                ]
            }
        ];
    }
}
