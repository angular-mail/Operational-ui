import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {InformService} from './inform.service';

// TODO: add additional logic to handle errors

@Injectable({providedIn: 'root'})
export class ApiService {
    timeout = 200;
    formatErrors = this.formatErrorsFn.bind(this);
    constructor(private http: HttpClient, private informService: InformService) {}

    private formatErrorsFn(error: any) {
        const errorObj = (error && error.error) || {};
        this.informService.handleError(errorObj.error ? errorObj.error : error.error);
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, {params}).pipe(catchError(this.formatErrors), delay(this.timeout));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(`${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors), delay(this.timeout));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors), delay(this.timeout));
    }

    delete(path): Observable<any> {
        return this.http.delete(`${path}`).pipe(catchError(this.formatErrors), delay(this.timeout));
    }
}
