import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewagentComponent } from './newagent.component';

describe('NewagentComponent', () => {
  let component: NewagentComponent;
  let fixture: ComponentFixture<NewagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
