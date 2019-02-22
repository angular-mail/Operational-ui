export interface Metadata {
    Build: number;
    Comment: string;
    Version: string;
}

export interface DBSizeLimit {
    MaxRows: number;
    MaxTime: number;
    RowsToDelete: number;
    TimeToDelete: number;
}

export interface ActivityRecognition {
    Active: boolean;
    DBSizeLimit: DBSizeLimit;
    Notify: boolean;
    Report: any;
}

export interface Report2 {
    Active: boolean;
    Interval: number;
    MaxRetryTime: number;
    Unmetered: number;
    Url: string;
}

export interface Analytics {
    Active: boolean;
    Report: Report2;
}

export interface JedAI {
    Active: boolean;
}

export interface DBSizeLimit2 {
    MaxRows: number;
    MaxTime: number;
    RowsToDelete: number;
    TimeToDelete: number;
}

export interface Locations {
    DBSizeLimit: DBSizeLimit2;
    Notify: boolean;
    Report: any;
}

export interface Historical {
    Interval: number;
    MaxRetryTime: number;
    Unmetered: number;
    Url: string;
}

export interface Realtime {
    Url: string;
}

export interface Operational {
    ActivityRecognition: ActivityRecognition;
    Analytics: Analytics;
    JedAI: JedAI;
    Locations: Locations;
    Historical: Historical;
    Mode: string;
    Realtime: Realtime;
}

export interface AnagogDefaultConfig {
    Metadata: Metadata;
    Operational: Operational;
}

export interface AppConfigurationResponse {
    AnagogDefaultConfig: AnagogDefaultConfig;
}
