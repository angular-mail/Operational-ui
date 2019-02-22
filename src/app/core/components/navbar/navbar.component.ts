import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ag-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Input() user: boolean;
    @Output() logout = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}

    onLogout() {
        this.logout.emit();
    }
}
