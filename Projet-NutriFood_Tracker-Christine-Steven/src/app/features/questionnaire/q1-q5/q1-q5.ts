import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Question } from '../../../core/storage/models/question';

@Component({
  selector: 'app-q1-q5',
  imports: [MatRadioModule, ReactiveFormsModule],
  templateUrl: './q1-q5.html',
  styleUrl: './q1-q5.scss',
})
export class Q1Q5 {
  @Input() currentQuestion!: Question;
  @Input() currentControl!: FormControl;

}
