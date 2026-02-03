import { Component, Input } from '@angular/core';
import { Question } from '../../../core/storage/models/question';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-q6',
  imports: [ReactiveFormsModule,MatCheckboxModule],
  templateUrl: './q6.html',
  styleUrl: './q6.scss',
})
export class Q6 {
  @Input() currentQuestion!: Question;
  @Input() currentControl!: FormControl;

  public toggleCategory(name: string, checked: boolean): void {
    const current = this.currentControl.value;
    const next = checked ? [...current, name] : current.filter((x: string) => x !== name);
    /* [...current, name] permet de sélectionner une catégorie et current.filter(x => x !== name) permet de désélectionner une catégorie */
    this.currentControl?.setValue(next);
    this.currentControl?.markAsTouched();
  }

  public isCategoryChecked(name: string): boolean {
    return this.currentControl?.value.includes(name);
  }

}
