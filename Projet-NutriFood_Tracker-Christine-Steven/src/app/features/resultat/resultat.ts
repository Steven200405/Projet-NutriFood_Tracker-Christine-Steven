import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { QuestionnaireAnswers } from '../../core/storage/models/questionnaireAnswers';
import { AuthService } from '../../core/storage/services/auth.service';
import { QuestionnaireService } from '../../core/storage/services/questionnaire.service';
import { ResultatHistorique } from './resultat-historique/resultat-historique';
import { ResultatQuestionnaire } from './resultat-questionnaire/resultat-questionnaire';

@Component({
  selector: 'app-resultat',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatProgressBarModule, MatListModule, ResultatHistorique, ResultatQuestionnaire],
  templateUrl: './resultat.html',
  styleUrl: './resultat.scss',
})
export class Resultat implements OnInit {
  public currentQuestionnary: QuestionnaireAnswers | null = null;
  public historyQuestionnary: QuestionnaireAnswers[] = [];
  constructor(private authService: AuthService, private questionnaireService: QuestionnaireService, private router: Router) { }

  public ngOnInit(): void {
    const session = this.authService.getSession();
    if (!session) {
      this.router.navigate(['login']);
      return;
    }
    this.historyQuestionnary = this.questionnaireService.getMyHistory();
    this.currentQuestionnary = this.questionnaireService.getMyLast();
  }
}
