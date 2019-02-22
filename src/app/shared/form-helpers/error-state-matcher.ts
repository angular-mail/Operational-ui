import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, AbstractControl} from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.touched || isSubmitted));
    }
}
