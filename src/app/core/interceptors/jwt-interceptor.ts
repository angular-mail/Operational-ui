import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from '../services/jwt-token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const jwtToken = this.jwtService.token;
        if (jwtToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('--added bearer to HEADERS', `Authorization: Bearer ${jwtToken}`);
        }

        return next.handle(request);
    }
}

export const jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
