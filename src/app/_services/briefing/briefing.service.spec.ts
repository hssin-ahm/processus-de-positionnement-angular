import { TestBed } from '@angular/core/testing';

import { BriefingService } from './briefing.service';

describe('BriefingService', () => {
  let service: BriefingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
