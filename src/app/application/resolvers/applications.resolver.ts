import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {App} from '../models/application.model';
import {ApplicationService} from '../services/application.service';
import {Observable, throwError, of} from 'rxjs';
import {LoaderService} from 'src/app/core/services/loader.service';
import {catchError, map, finalize} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class ApplicationsResolver implements Resolve<App[]> {
    constructor(
        private applicationsService: ApplicationService,
        private loaderService: LoaderService,
        private router: Router,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<App[]> {
        if (this.applicationsService.apps) {
            return of(this.applicationsService.apps);
        }

        this.loaderService.show();
        return this.applicationsService.fetchApplications().pipe(
            map(appsResponse => appsResponse.Apps),
            finalize(() => this.loaderService.hide()),
            catchError(err => {
                this.authService.logout();
                this.router.navigate(['/login']);
                return throwError(err);
            })
        );
    }
}
