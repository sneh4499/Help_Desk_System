import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpoliciesComponent } from './viewpolicies.component';

describe('ViewpoliciesComponent', () => {
  let component: ViewpoliciesComponent;
  let fixture: ComponentFixture<ViewpoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
