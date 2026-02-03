import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Q7 } from './q7';

describe('Q7', () => {
  let component: Q7;
  let fixture: ComponentFixture<Q7>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Q7]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Q7);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
