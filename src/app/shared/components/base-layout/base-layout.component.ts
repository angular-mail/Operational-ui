import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'ag-base-layout',
    templateUrl: './base-layout.component.html',
    styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
    @Input() title: string;
    constructor() {}

    ngOnInit() {}
}
