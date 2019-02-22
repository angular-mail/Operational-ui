import {AbstractControl, ValidatorFn} from '@angular/forms';

export function matchNameValidator(name: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (!control.value) {
            return null;
        }
        const match = name.toLowerCase() === control.value.toLowerCase();
        return !match ? {matchName: {value: 'Name is not match'}} : null;
    };
}
