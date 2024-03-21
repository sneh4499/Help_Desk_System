import { TestBed } from '@angular/core/testing';

import { ComposeemailService } from './composeemail.service';

describe('ComposeemailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComposeemailService = TestBed.get(ComposeemailService);
    expect(service).toBeTruthy();
  });
});
