import { TestBed } from '@angular/core/testing';

import { ContactdetailService } from './contactdetail.service';

describe('ContactdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactdetailService = TestBed.get(ContactdetailService);
    expect(service).toBeTruthy();
  });
});
