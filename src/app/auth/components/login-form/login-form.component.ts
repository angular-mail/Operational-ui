import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../../shared/form-helpers/error-state-matcher';

@Component({
    selector: 'ag-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
    @Input()
    set pending(isPending: boolean) {
        if (!this.loginForm) {
            return;
        }
        if (isPending) {
            this.loginForm.disable();
        } else {
            this.loginForm.enable();
        }
    }

    @Output() submitted = new EventEmitter<LoginFormValues>();

    loginForm: FormGroup;
    emailMatcher = new CustomErrorStateMatcher();
    passwordMatcher = new CustomErrorStateMatcher();

    constructor() {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    get email() {
        return this.loginForm && this.loginForm.get('email');
    }

    get password() {
        return this.loginForm && this.loginForm.get('password');
    }

    onFocus(control: FormControl | AbstractControl) {
        this.resetState(control);
    }

    resetState(control: FormControl | AbstractControl) {
        control.markAsPristine();
        control.markAsUntouched();
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.submitted.emit(this.loginForm.value);
        }
    }
}
