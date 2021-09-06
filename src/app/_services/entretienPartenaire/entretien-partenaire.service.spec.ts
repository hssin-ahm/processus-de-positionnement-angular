import { TestBed } from '@angular/core/testing';

import { EntretienPartenaireService } from './entretien-partenaire.service';

describe('EntretienPartenaireService', () => {
  let service: EntretienPartenaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntretienPartenaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
