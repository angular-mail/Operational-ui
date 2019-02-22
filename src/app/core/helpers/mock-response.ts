import {HttpResponse, HttpRequest, HttpErrorResponse} from '@angular/common/http';

interface MockConfig {
    urls: string[];
    match?: 'full' | 'include';
    response: (data?: any) => HttpResponse<any> | HttpErrorResponse;
    reqMethod?: string;
}

export class MockReponse {
    urls: string[];
    reqMethod?: string;
    match = 'full';
    response: (data: any) => HttpResponse<any> | HttpErrorResponse;

    constructor(config: MockConfig) {
        const {urls, match, response, reqMethod} = config;
        this.urls = urls;
        this.response = response;
        this.match = match || 'full';
        this.reqMethod = reqMethod;
    }

    checkRequest(req: HttpRequest<any>) {
        if (this.reqMethod && this.reqMethod !== req.method) {
            return undefined;
        }

        switch (this.match) {
            case 'full':
                return this.urls.some(url => req.url.endsWith(url));
            case 'include':
                return this.urls.some(url => req.url.includes(url));
            default:
                break;
        }
    }

    getResponse(req: HttpRequest<any>): HttpResponse<any> | HttpErrorResponse {
        return this.response(req.body);
    }
}
