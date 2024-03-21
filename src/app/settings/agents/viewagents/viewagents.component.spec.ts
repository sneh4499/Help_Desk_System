import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewagentsComponent } from './viewagents.component';

describe('ViewagentsComponent', () => {
  let component: ViewagentsComponent;
  let fixture: ComponentFixture<ViewagentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewagentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
