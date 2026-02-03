import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatQuestionnaire } from './resultat-questionnaire';

describe('ResultatQuestionnaire', () => {
  let component: ResultatQuestionnaire;
  let fixture: ComponentFixture<ResultatQuestionnaire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatQuestionnaire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatQuestionnaire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
