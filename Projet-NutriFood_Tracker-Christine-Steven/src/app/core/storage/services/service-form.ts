import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../models/produit';
import { minArrayLengthValidator } from '../validators/min-array-length';

@Injectable({
  providedIn: 'root',
})
export class ServiceForm {
  private formQuestions: FormGroup = new FormGroup({
    q1: new FormControl<number | null>(null, Validators.required),
    q2: new FormControl<number | null>(null, Validators.required),
    q3: new FormControl<number | null>(null, Validators.required),
    q4: new FormControl<number | null>(null, Validators.required),
    q5: new FormControl<number | null>(null, Validators.required),
    q6: new FormControl<string[]>([], { nonNullable: true, validators: [minArrayLengthValidator(1)] }),
    q7: new FormControl<Produit[]>([], { nonNullable: true, validators: [minArrayLengthValidator(1)] }),
  });

  private isGoToSearch: boolean = false;

  public getIsGoToSearch() {
    return this.isGoToSearch;
  }

  public setIsGoToSearch(isGoToSearch: boolean) {
    this.isGoToSearch = isGoToSearch
  }

  public getFormQuestions(): FormGroup {
    return this.formQuestions;
  }

  public resetFormQuestions(): void {
    this.formQuestions.reset();
    this.formQuestions.controls['q6'].setValue([]);
    this.formQuestions.controls['q7'].setValue([]);
  }
}