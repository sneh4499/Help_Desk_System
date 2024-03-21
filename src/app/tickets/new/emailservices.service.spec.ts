import { TestBed } from '@angular/core/testing';

import { EmailservicesService } from './emailservices.service';

describe('EmailservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailservicesService = TestBed.get(EmailservicesService);
    expect(service).toBeTruthy();
  });
});
