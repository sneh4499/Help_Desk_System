import { TestBed } from '@angular/core/testing';

import { CompanyservicesService } from './companyservices.service';

describe('CompanyservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyservicesService = TestBed.get(CompanyservicesService);
    expect(service).toBeTruthy();
  });
});
