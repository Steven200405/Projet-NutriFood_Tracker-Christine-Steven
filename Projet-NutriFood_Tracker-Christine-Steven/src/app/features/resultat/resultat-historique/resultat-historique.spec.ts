import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatHistorique } from './resultat-historique';

describe('ResultatHistorique', () => {
  let component: ResultatHistorique;
  let fixture: ComponentFixture<ResultatHistorique>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatHistorique]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatHistorique);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
