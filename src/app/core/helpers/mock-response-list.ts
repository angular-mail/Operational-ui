import {MockReponse} from './mock-response';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {User} from 'src/app/auth/models/user.model';
import {applicationsResponse} from '../mock-data/applications-response';
import {configurationResponse} from '../mock-data/configuration-response';
import {LocalStorageKeys} from '../models/local-storage-keys.enum';
import {LocalStorageService} from '../services/local.storage.service';
import {AppResponse, DefaultApp} from 'src/app/application/models/application.model';
import {AppUser} from 'src/app/application/models/app-user';

const signInMock = new MockReponse({
    urls: ['/sign-in'],
    reqMethod: 'POST',
    response: (data: any) => {
        console.log('--signIn request', data);
        const email = JSON.parse(data).email;
        if (JSON.parse(data).email !== 'error@gmail.com') {
            return new HttpResponse({
                status: 200,
                body: {
                    token: btoa('user-token-agw'),
                    user: new User({
                        email,
                        firstName: email,
                        lastName: 'Doe'
                    } as User)
                }
            });
        } else {
            return new HttpErrorResponse({
                status: 401,
                error: {
                    error: 'Please, check your email or password'
                }
            });
        }
    },
    match: 'full'
});

const applicationMock = new MockReponse({
    urls: ['/apps'],
    reqMethod: 'GET',
    response: () => {
        console.log('--apps request');
        return new HttpResponse({
            status: 200,
            body: LocalStorageService.get(LocalStorageKeys.APPS) || applicationsResponse
        });
    },
    match: 'full'
});

const newApplicationMock = new MockReponse({
    urls: ['/apps'],
    reqMethod: 'POST',
    response: (app: string) => {
        console.log('--new app request', app);
        const appResponse: AppResponse = LocalStorageService.get(LocalStorageKeys.APPS) || applicationsResponse;
        const appName = JSON.parse(app).appName;
        if (!appResponse.Apps.some(appItem => appItem.AppName === appName)) {
            appResponse.Apps.push(new DefaultApp(appName));
            LocalStorageService.save(LocalStorageKeys.APPS, appResponse);
            return new HttpResponse({status: 200, body: appResponse});
        }

        return new HttpErrorResponse({
            status: 403,
            error: {
                error: 'This app name is already exists'
            }
        });
    },
    match: 'full'
});

const removeApplicationMock = new MockReponse({
    urls: ['/appsdelete'],
    reqMethod: 'POST',
    response: (app: string) => {
        console.log('--new app delete request', app);
        const appResponse: AppResponse = LocalStorageService.get(LocalStorageKeys.APPS) || applicationsResponse;
        const appName = JSON.parse(app).appName;
        const appIndex = appResponse.Apps.findIndex(appItem => appItem.AppName === appName);
        if (appIndex > -1) {
            appResponse.Apps.splice(appIndex, 1);
            LocalStorageService.save(LocalStorageKeys.APPS, appResponse);
            return new HttpResponse({status: 200, body: appResponse});
        }

        return new HttpErrorResponse({
            status: 409,
            error: {
                error: `No such app`
            }
        });
    },
    match: 'full'
});

const configurationMock = new MockReponse({
    urls: ['/configuration'],
    reqMethod: 'POST',
    response: (data: any) => {
        console.log('--configuration request', data);
        return new HttpResponse({status: 200, body: configurationResponse});
    },
    match: 'full'
});

const configurationSaveMock = new MockReponse({
    urls: ['/configuration/save'],
    reqMethod: 'POST',
    response: (data: any) => {
        console.log('--configuration request', data);
        return new HttpResponse({status: 200, body: {ok: true}});
    },
    match: 'full'
});

const mockRemoveUser = new MockReponse({
    urls: ['/user-remove'],
    reqMethod: 'POST',
    response: (data: '{ userlist: AppUser[], userId: number }') => {
        console.log('--new remove user request', data);
        const payload = JSON.parse(data);
        const userIndex = payload.userlist.find(item => item.id === payload.userId);
        payload.userlist.splice(userIndex, 1);
        return new HttpResponse({status: 200, body: payload.userlist});
    },
    match: 'full'
});

const mockAddUser = new MockReponse({
    urls: ['/user'],
    reqMethod: 'POST',
    response: (data: any) => {
        console.log('--new add user request', data);
        const user: AppUser = JSON.parse(data);
        return new HttpResponse({status: 200, body: user});
    },
    match: 'full'
});

export const mockResponseList = [
    signInMock,
    applicationMock,
    newApplicationMock,
    configurationMock,
    configurationSaveMock,
    removeApplicationMock,
    mockRemoveUser,
    mockAddUser
];
