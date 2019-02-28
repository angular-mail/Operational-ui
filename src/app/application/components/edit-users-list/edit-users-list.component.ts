import {Component, OnInit, ViewChild, ElementRef, HostListener, Output, EventEmitter, Input} from '@angular/core';
import {KEYCODE} from 'src/app/core/models/keycode.enum';

import {AppUser} from '../../models/app-user';

@Component({
    selector: 'ag-edit-users-list',
    templateUrl: './edit-users-list.component.html',
    styleUrls: ['./edit-users-list.component.scss']
})
export class EditUsersListComponent implements OnInit {
    _activeItemId = null;
    @Output() selected = new EventEmitter<AppUser>();
    @Input() users: AppUser[];
    @ViewChild('container') usersContainer: ElementRef;

    @HostListener('window:click', ['$event.target'])
    onWindowClick(target: EventTarget) {
        if (!this.usersContainer.nativeElement.contains(target)) {
            this.activeItemId = null;
        }
    }

    @HostListener('document:keydown', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        let code;

        if (event.keyCode !== undefined) {
            // tslint:disable-next-line
            code = event.keyCode;
        }

        switch (code) {
            case KEYCODE.BOTTOM:
                event.preventDefault();
                this.setNext();
                break;
            case KEYCODE.UP:
                event.preventDefault();
                this.setPrevious();
                break;
            case KEYCODE.ESC:
                this.activeItemId = null;
                break;
        }
    }

    setNext() {
        if (!this.isActiveItemIdSetted) {
            return;
        }
        let activeItemIndex = this.users.findIndex(item => item.id === this.activeItemId);
        const nextIndex = activeItemIndex < this.users.length - 1 ? ++activeItemIndex : activeItemIndex;
        this.activeItemId = this.users[nextIndex].id;
    }

    setPrevious() {
        if (!this.isActiveItemIdSetted) {
            return;
        }
        let activeItemIndex = this.users.findIndex(item => item.id === this.activeItemId);
        const previousIndex = activeItemIndex ? --activeItemIndex : activeItemIndex;
        this.activeItemId = this.users[previousIndex].id;
    }

    get isActiveItemIdSetted(): boolean {
        if (typeof this.activeItemId === 'undefined') {
            return false;
        }

        return true;
    }

    get activeItemId() {
        return this._activeItemId;
    }

    set activeItemId(value) {
        this._activeItemId = value;
        this.selected.emit(this._activeItemId);
    }

    constructor() {}

    ngOnInit() {}

    onUserClick(id: string) {
        this.activeItemId = id;
    }
}
