import { TestBed } from '@angular/core/testing';

import { ServiceForm } from './service-form';

describe('ServiceForm', () => {
  let service: ServiceForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
