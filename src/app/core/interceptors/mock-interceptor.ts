import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockService} from '../services/mock.service';
import {of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    constructor(private mockService: MockService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const mockReponse = this.mockService.findMockToIntercept(req);
        if (mockReponse) {
            console.log(`find mock for url ${mockReponse.urls}`);
            const response = mockReponse.response(req.body);
            if (response instanceof HttpResponse) {
                return of(response);
            } else {
                return throwError(response);
            }
        }

        return next.handle(req).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}

export const mockBackendInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
};
