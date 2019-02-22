import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';

const COMPONENTS = [BaseLayoutComponent];

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule];

@NgModule({
    declarations: COMPONENTS,
    imports: MODULES,
    exports: [...MODULES, ...COMPONENTS],
    providers: []
})
export class SharedModule {}
