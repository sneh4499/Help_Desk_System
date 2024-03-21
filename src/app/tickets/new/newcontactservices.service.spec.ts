import { TestBed } from '@angular/core/testing';

import { NewcontactservicesService } from './newcontactservices.service';

describe('NewcontactservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewcontactservicesService = TestBed.get(NewcontactservicesService);
    expect(service).toBeTruthy();
  });
});
