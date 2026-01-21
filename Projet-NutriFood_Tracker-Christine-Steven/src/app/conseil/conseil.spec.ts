import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conseil } from './conseil';

describe('Conseil', () => {
  let component: Conseil;
  let fixture: ComponentFixture<Conseil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conseil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Conseil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
