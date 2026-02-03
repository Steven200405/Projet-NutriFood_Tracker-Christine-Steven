import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { QUESTIONS } from '../../core/storage/data/questions';
import { Question } from '../../core/storage/models/question';
import { ScoringService } from '../../core/storage/services/scoring-service';
import { QuestionnaireService } from '../../core/storage/services/questionnaire-service';
import { AuthService } from '../../core/storage/services/auth-service';
import { Router } from '@angular/router';
import { User } from '../../core/storage/models/user';
import { FormService } from '../../core/storage/services/form-service';
import { Q1Q5 } from './q1-q5/q1-q5';
import { Q6 } from './q6/q6';
import { Q7 } from './q7/q7';


@Component({
  selector: 'app-questionnaire',
  imports: [ReactiveFormsModule, Q1Q5, Q6, Q7, MatCardModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire implements OnInit {

  public indexQuestionnaire: number = 0;
  public questions: Question[] = QUESTIONS;

  public user: User | null = null;
  public formQuestions!: FormGroup;

  constructor(private serviceScoring: ScoringService, private questionnaireService: QuestionnaireService, private authService: AuthService, private router: Router, private formService: FormService
  ) {
  }

  ngOnInit(): void {
    this.formQuestions = this.formService.getFormQuestions();
    this.indexQuestionnaire = this.formService.getIndexForm();
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['login']);
    }
    this.user = user;
  }


  public getControl(id: string): FormControl {
    return this.formQuestions.get(id) as FormControl;
  }

  get currentQuestion(): Question {
    return this.questions[this.indexQuestionnaire];
  }

  public nextQuestion(): void {
    const id = this.currentQuestion.id;
    const control = this.formQuestions.get(id);

    if (this.indexQuestionnaire <= 4) {
      if (control?.invalid) {
        control.markAsTouched();
        return;
      }
    }
    if (this.indexQuestionnaire === 5) {
      if (this.formQuestions.get('q6')?.invalid) {
        this.formQuestions.get('q6')?.markAsTouched();
        return;
      }
    }
    if (this.indexQuestionnaire === 6) {
      if (this.formQuestions.get('q7')?.invalid) {
        this.formQuestions.get('q7')?.markAsTouched();
        return;
      }
    }
    if (this.indexQuestionnaire < this.questions.length - 1) {
      this.indexQuestionnaire++;
      this.formService.setIndexForm(this.indexQuestionnaire);
    }
  }

  public previousQuestion(): void {
    if (this.indexQuestionnaire > 0) {
      this.indexQuestionnaire--;
      this.formService.setIndexForm(this.indexQuestionnaire);
    }
  }


  public submit(): void {
    if (this.formQuestions.invalid) {
      this.formQuestions.markAllAsTouched();
      return;
    }
    this.questionnaireService.saveResult(
      this.serviceScoring.getGlobalScore(this.formQuestions),
      this.serviceScoring.getAverageFoodScore(this.formQuestions.get('q7')?.value),
      this.formQuestions.get('q7')?.value
    );

    this.router.navigate(['resultat']);
  }


}