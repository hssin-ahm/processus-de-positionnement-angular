import { TestBed } from '@angular/core/testing';

import { CvEnvoyeService } from './cv-envoye.service';

describe('CvEnvoyeService', () => {
  let service: CvEnvoyeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvEnvoyeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
