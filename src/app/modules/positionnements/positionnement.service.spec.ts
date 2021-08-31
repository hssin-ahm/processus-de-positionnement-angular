import { TestBed } from '@angular/core/testing';

import { PositionnementService } from './positionnement.service';

describe('PositionnementService', () => {
  let service: PositionnementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionnementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
