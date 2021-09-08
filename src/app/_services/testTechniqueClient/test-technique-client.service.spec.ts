import { TestBed } from '@angular/core/testing';

import { TestTechniqueClientService } from './test-technique-client.service';

describe('TestTechniqueClientService', () => {
  let service: TestTechniqueClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestTechniqueClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
