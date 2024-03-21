import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketVolumeComponent } from './ticket-volume.component';

describe('TicketVolumeComponent', () => {
  let component: TicketVolumeComponent;
  let fixture: ComponentFixture<TicketVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
