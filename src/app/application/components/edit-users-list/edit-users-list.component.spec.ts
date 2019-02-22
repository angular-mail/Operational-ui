import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditUsersListComponent} from './edit-users-list.component';

describe('EditUsersListComponent', () => {
    let component: EditUsersListComponent;
    let fixture: ComponentFixture<EditUsersListComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [EditUsersListComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUsersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
