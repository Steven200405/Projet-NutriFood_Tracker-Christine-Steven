import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';
import { QuestionnaireEntry } from '../../core/storage/models/questionnaire.model';
import { AuthService } from '../../core/storage/services/auth.service';
import { QuestionnaireService } from '../../core/storage/services/questionnaire.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-resultat',
  imports: [RouterModule, MatCardModule, MatButtonModule, MatProgressBarModule, MatListModule, NgClass],
  templateUrl: './resultat.html',
  styleUrl: './resultat.scss',
})
export class Resultat implements OnInit {
  public currentQuestionnary: QuestionnaireEntry | null = null;
  public historyQuestionnary: QuestionnaireEntry[] = [];
  constructor(private authService: AuthService, private questionnaireService: QuestionnaireService, private router: Router) { }

  public ngOnInit(): void {
    const session = this.authService.getSession();
    if (!session) {
      this.router.navigate(['/login']);
      return;
    }
    this.historyQuestionnary = this.questionnaireService.getMyHistory();
    this.currentQuestionnary = this.questionnaireService.getMyLast();
  }

  public formatDate(iso: string): string {
    return new Date(iso).toLocaleString('fr-FR');
  }

  public nutriClass(grade?: string): string {
    const g = (grade ?? '').toLowerCase();
    switch (g) {
      case 'a': return 'nutri-a';
      case 'b': return 'nutri-b';
      case 'c': return 'nutri-c';
      case 'd': return 'nutri-d';
      case 'e': return 'nutri-e';
      default: return 'nutri-na';
    }
  }

}
