import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgroupsComponent } from './viewgroups.component';

describe('ViewgroupsComponent', () => {
  let component: ViewgroupsComponent;
  let fixture: ComponentFixture<ViewgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
