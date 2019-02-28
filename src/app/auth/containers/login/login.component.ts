import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../core/components/base-component/base-component';
import {AuthService} from '../../services/auth.service';
import {LoaderService} from 'src/app/core/services/loader.service';
import {InformService} from 'src/app/core/services/inform.service';
import {LoginFormValues} from '../../models/login-form-values.interface';
import {Store, select} from '@ngrx/store';
import * as fromAuth from '@app/auth/reducers';
import {LoginPageActions} from '@app/auth/actions';

@Component({
    selector: 'ag-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
    pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
    constructor(loaderService: LoaderService, private store: Store<fromAuth.State>) {
        super(loaderService);
    }

    ngOnInit() {}

    onFormSubmit(credentials: LoginFormValues) {
        this.store.dispatch(new LoginPageActions.Login({credentials}));
    }
}
