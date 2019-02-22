import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../core/components/base-component/base-component';
import {AuthService} from '../../services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {LoaderService} from 'src/app/core/services/loader.service';
import {InformService} from 'src/app/core/services/inform.service';

@Component({
    selector: 'ag-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
    constructor(private authService: AuthService, loaderService: LoaderService, private informService: InformService) {
        super(loaderService);
    }

    ngOnInit() {}

    onFormSubmit(formValues: LoginFormValues) {
        console.log('--trying sign in with', formValues);

        this.authService
            .signIn(formValues)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe();
    }
}
