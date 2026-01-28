import { TestBed } from '@angular/core/testing';

import { ServiceScoring } from './service-scoring';

describe('ServiceScoring', () => {
  let service: ServiceScoring;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceScoring);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
