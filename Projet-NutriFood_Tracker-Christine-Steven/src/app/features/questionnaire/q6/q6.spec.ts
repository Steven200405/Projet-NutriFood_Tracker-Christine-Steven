import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q6 } from './q6';

describe('Q6', () => {
  let component: Q6;
  let fixture: ComponentFixture<Q6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Q6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Q6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
