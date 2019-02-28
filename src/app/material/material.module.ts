import {NgModule} from '@angular/core';

import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatRippleModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';

const MODULES = [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    ScrollingModule,
    MatCheckboxModule,
    MatRippleModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'standard'}
        }
    ]
})
export class MaterialModule {}
