import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from 'src/app/shared/form-helpers/error-state-matcher';

@Component({
    selector: 'ag-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
    form: FormGroup;
    @Input()
    set pending(isPending: boolean) {
        if (!this.form) {
            return;
        }
        if (isPending) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    @Output() submitted = new EventEmitter<{appName: string}>();
    @Output() cancel = new EventEmitter<void>();
    appNameMatcher = new CustomErrorStateMatcher();

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            appName: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    get appName() {
        return this.form && this.form.get('appName');
    }

    onFocus(control: FormControl) {
        this.resetState(control);
    }

    resetState(control: FormControl) {
        control.markAsPristine();
        control.markAsUntouched();
    }

    onCancel() {
        this.cancel.emit();
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }
}
