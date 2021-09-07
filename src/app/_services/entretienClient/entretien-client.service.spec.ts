import { TestBed } from '@angular/core/testing';

import { EntretienClientService } from './entretien-client.service';

describe('EntretienClientService', () => {
  let service: EntretienClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntretienClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
