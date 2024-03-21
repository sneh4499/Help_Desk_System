import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupperformanceComponent } from './groupperformance.component';

describe('GroupperformanceComponent', () => {
  let component: GroupperformanceComponent;
  let fixture: ComponentFixture<GroupperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
