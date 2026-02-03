import { Component, Input } from '@angular/core';
import { QuestionnaireAnswers } from '../../../core/storage/models/questionnaireAnswers';
import { DatePipe, NgClass } from '@angular/common';
import { NutriClassPipe } from '../../../core/storage/utils/nutri-class-pipe-pipe';

@Component({
  selector: 'app-resultat-questionnaire',
  imports: [NgClass, DatePipe, NutriClassPipe],
  templateUrl: './resultat-questionnaire.html',
  styleUrl: './resultat-questionnaire.scss',
})
export class ResultatQuestionnaire {
  @Input() currentQuestionnary: QuestionnaireAnswers | null = null;
}
