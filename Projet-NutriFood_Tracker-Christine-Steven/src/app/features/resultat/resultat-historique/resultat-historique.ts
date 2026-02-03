import { Component, Input } from '@angular/core';
import { QuestionnaireAnswers } from '../../../core/storage/models/questionnaireAnswers';
import { DatePipe, NgClass } from '@angular/common';
import { NutriClassPipe } from '../../../core/storage/pipe/nutri-class-pipe';

@Component({
  selector: 'app-resultat-historique',
  imports: [NgClass, DatePipe, NutriClassPipe],
  templateUrl: './resultat-historique.html',
  styleUrl: './resultat-historique.scss',
})
export class ResultatHistorique {
  @Input()  public historyQuestionnary: QuestionnaireAnswers[] = [];
}
