import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbussinessHoursComponent } from './viewbussiness-hours.component';

describe('ViewbussinessHoursComponent', () => {
  let component: ViewbussinessHoursComponent;
  let fixture: ComponentFixture<ViewbussinessHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbussinessHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbussinessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
