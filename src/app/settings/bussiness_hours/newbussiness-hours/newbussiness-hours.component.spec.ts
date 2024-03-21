import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbussinessHoursComponent } from './newbussiness-hours.component';

describe('NewbussinessHoursComponent', () => {
  let component: NewbussinessHoursComponent;
  let fixture: ComponentFixture<NewbussinessHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbussinessHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbussinessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
