import {Component, OnInit, Input, Inject} from '@angular/core';
import {FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {CustomErrorStateMatcher} from 'src/app/shared/form-helpers/error-state-matcher';
import {matchNameValidator} from '../../validators/match-name.validator';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'ag-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
    form: FormGroup;
    name: string;
    appNameMatcher = new CustomErrorStateMatcher();
    constructor(
        private dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public nameObj: {name: string} = {name: null}
    ) {}

    ngOnInit() {
        this.name = this.nameObj.name;
        this.form = new FormGroup({
            appName: new FormControl('', [Validators.required, matchNameValidator(this.name)])
        });
    }

    get appName() {
        return this.form && this.form.get('appName');
    }

    onFocus(control: FormControl | AbstractControl) {
        this.resetState(control);
    }

    resetState(control: FormControl | AbstractControl) {
        control.markAsPristine();
        control.markAsUntouched();
    }

    onSubmit() {
        if (this.form.valid) {
            this.dialogRef.close(true);
        }
    }
}
