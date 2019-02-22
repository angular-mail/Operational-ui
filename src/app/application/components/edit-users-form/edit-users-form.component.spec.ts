import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditUsersFormComponent} from './edit-users-form.component';

describe('EditUsersFormComponent', () => {
    let component: EditUsersFormComponent;
    let fixture: ComponentFixture<EditUsersFormComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [EditUsersFormComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EditUsersFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
