import { TestBed } from '@angular/core/testing';

import { NewticketservicesService } from './newticketservices.service';

describe('NewticketservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewticketservicesService = TestBed.get(NewticketservicesService);
    expect(service).toBeTruthy();
  });
});
