import { TestBed } from '@angular/core/testing';

import { ListcompanyService } from './listcompany.service';

describe('ListcompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListcompanyService = TestBed.get(ListcompanyService);
    expect(service).toBeTruthy();
  });
});
