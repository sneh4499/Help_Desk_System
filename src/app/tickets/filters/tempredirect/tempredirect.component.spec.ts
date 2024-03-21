import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempredirectComponent } from './tempredirect.component';

describe('TempredirectComponent', () => {
  let component: TempredirectComponent;
  let fixture: ComponentFixture<TempredirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempredirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
