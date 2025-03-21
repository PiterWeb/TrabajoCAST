import { TestBed } from '@angular/core/testing';

import { DisfracesService } from './disfraces.service';

describe('DisfracesService', () => {
  let service: DisfracesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisfracesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
