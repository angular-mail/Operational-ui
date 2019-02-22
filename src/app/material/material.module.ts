import {NgModule} from '@angular/core';

import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule
} from '@angular/material';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

const MODULES = [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    ScrollDispatchModule,
    MatCheckboxModule
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
