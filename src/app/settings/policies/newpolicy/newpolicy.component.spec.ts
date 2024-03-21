import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpolicyComponent } from './newpolicy.component';

describe('NewpolicyComponent', () => {
  let component: NewpolicyComponent;
  let fixture: ComponentFixture<NewpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
