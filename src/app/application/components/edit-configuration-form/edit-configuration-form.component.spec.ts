import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigurationFormComponent } from './edit-configuration-form.component';

describe('EditConfigurationFormComponent', () => {
  let component: EditConfigurationFormComponent;
  let fixture: ComponentFixture<EditConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
