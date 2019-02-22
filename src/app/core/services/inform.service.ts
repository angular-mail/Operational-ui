import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({providedIn: 'root'})
export class InformService {
    constructor(private snackBar: MatSnackBar) {}

    showSuccessMessage(message: string) {
        this.snackBar.open(message, 'Success', {duration: 3000});
    }

    handleError(error: string) {
        this.snackBar.open(error, 'Error', {duration: 3000});
    }
}
