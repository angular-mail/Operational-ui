import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { BaseAppUser } from '../../models/app-user';
import { CustomErrorStateMatcher } from 'src/app/shared/form-helpers/error-state-matcher';

@Component({
    selector: 'ag-edit-users-form',
    templateUrl: './edit-users-form.component.html',
    styleUrls: ['./edit-users-form.component.scss']
})
export class EditUsersFormComponent implements OnInit {
    form: FormGroup;
    @ViewChild('editNgForm') editNgForm: NgForm;
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

    @Output() submitted = new EventEmitter<BaseAppUser>();
    @Output() delete = new EventEmitter<void>();
    @Input() activeItemId: number;
    nameMatcher = new CustomErrorStateMatcher();

    constructor() {}

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            canUpdate: new FormControl(true),
            canDelete: new FormControl(true),
            canAddUsers: new FormControl(true)
        });
    }

    get name() {
        return this.form && this.form.get('name');
    }

    onFocus(control: FormControl | AbstractControl) {
        this.resetState(control);
    }

    resetState(control: FormControl | AbstractControl) {
        control.markAsPristine();
        control.markAsUntouched();
    }

    onDelete() {
        this.delete.emit();
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitted.emit(this.form.value);
        }
    }

    patchValue(formValues: BaseAppUser) {
        this.form.patchValue(formValues);
    }

    get canDelete(): boolean {
        return typeof this.activeItemId !== 'undefined' && this.activeItemId !== null;
    }

    resetForm() {
        this.editNgForm.resetForm();
        this.form.patchValue({
            name: '',
            canUpdate: true,
            canDelete: true,
            canAddUsers: true
        });
    }
}
