import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {App} from '../../models/application.model';
import {FORM_BUTTON} from '../../models/form-button.enum';

@Component({
    selector: 'ag-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
    @Input() appForm: FormGroup;
    @Input() state;
    @Input() applications: App[];
    @Output() buttonClick = new EventEmitter<FORM_BUTTON>();
    @Output() upload = new EventEmitter<any>();
    constructor() {}

    ngOnInit() {}

    onButtonClick(type: FORM_BUTTON) {
        this.buttonClick.emit(type);
    }

    onFileChange(event) {
        const files = event.target.files;
        if (files && files.length > 0) {
            this.upload.emit(event.target.files[0]);
        }
    }
}
