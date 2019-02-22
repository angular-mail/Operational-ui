import {Component, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {AuthService} from 'src/app/auth/services/auth.service';
import {LoaderService} from '../../services/loader.service';

@Component({
    selector: 'ag-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    user$ = this.authService.authorizedUser$();
    isShowLoader = false;

    constructor(
        private authService: AuthService,
        private loaderService: LoaderService,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit(): void {
        this.loaderService.getLoaderState$().subscribe(loaderState => {
            this.isShowLoader = loaderState;
            this.cdr.detectChanges();
        });
    }

    onLogout() {
        this.authService.logout();
    }
}
