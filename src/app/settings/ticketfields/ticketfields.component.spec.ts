import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketfieldsComponent } from './ticketfields.component';

describe('TicketfieldsComponent', () => {
  let component: TicketfieldsComponent;
  let fixture: ComponentFixture<TicketfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketfieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
