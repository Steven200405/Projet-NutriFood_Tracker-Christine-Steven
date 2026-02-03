import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q1Q5 } from './q1-q5';

describe('Q1Q5', () => {
  let component: Q1Q5;
  let fixture: ComponentFixture<Q1Q5>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Q1Q5]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Q1Q5);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
