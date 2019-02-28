import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ApplicationService} from '../services/application.service';
import {InformService} from 'src/app/core/services/inform.service';

@Injectable({providedIn: 'root'})
export class ConfigurationGuard implements CanActivate {
    constructor(
        private router: Router,
        private applicationService: ApplicationService,
        private informService: InformService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.applicationService.activeConfiguration) {
            // configuration selected
            return true;
        }

        this.router.navigate([`/app/${route.params.id}`]).then(() => {
            this.informService.handleError('No such configuration');
        });
        return false;
    }
}
