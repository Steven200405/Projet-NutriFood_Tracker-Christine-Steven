import { TestBed } from '@angular/core/testing';

import { ServiceOpenFoodFact } from './service-open-food-fact';

describe('ServiceOpenFoodFact', () => {
  let service: ServiceOpenFoodFact;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOpenFoodFact);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
