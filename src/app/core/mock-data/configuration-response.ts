export const configurationResponse = {
    AnagogDefaultConfig: {
        Metadata: {
            Build: 10,
            Comment: 'Update URLs to staging and change path of schedule and profile',
            Version: '2018-12-18 13:00'
        },
        Operational: {
            ActivityRecognition: {
                Active: true,
                DBSizeLimit: {
                    MaxRows: -1,
                    MaxTime: -1,
                    RowsToDelete: 0,
                    TimeToDelete: 0
                },
                Notify: true,
                Report: {}
            },
            Analytics: {
                Active: true,
                Report: {
                    Active: false,
                    Interval: 1440,
                    MaxRetryTime: 240,
                    Unmetered: 1,
                    Url: 'https://url/reports/analytics'
                }
            },
            JedAI: {
                Active: true
            },
            Locations: {
                DBSizeLimit: {
                    MaxRows: -1,
                    MaxTime: -1,
                    RowsToDelete: 0,
                    TimeToDelete: 0
                },
                Notify: false,
                Report: {}
            },
            Historical: {
                Interval: 1440,
                MaxRetryTime: 240,
                Unmetered: 1,
                Url: 'https://url/reports/locations/historical'
            },
            Mode: 'Off',
            Realtime: {
                Url: 'https://url/reports/locations/realtime'
            }
        }
    }
};
