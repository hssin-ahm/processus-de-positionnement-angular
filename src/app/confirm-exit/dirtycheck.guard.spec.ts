import { TestBed } from '@angular/core/testing';

import { DirtycheckGuard } from './dirtycheck.guard';

describe('DirtycheckGuard', () => {
  let guard: DirtycheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirtycheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
