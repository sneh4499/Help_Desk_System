import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnresolvedTicketsComponent } from './unresolved-tickets.component';

describe('UnresolvedTicketsComponent', () => {
  let component: UnresolvedTicketsComponent;
  let fixture: ComponentFixture<UnresolvedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnresolvedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnresolvedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
