import { TestBed } from '@angular/core/testing';
import { ServicePassword } from './service-password';


describe('ServicePassword', () => {
  let service: ServicePassword;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePassword);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
