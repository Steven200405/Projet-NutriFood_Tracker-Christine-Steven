import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ServiceOpenFoodFact } from '../../services/service-open-food-fact';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe, NgClass, UpperCasePipe } from '@angular/common';
import { ServiceForm } from '../../services/service-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule, MatListModule, MatIconModule, MatFormFieldModule, UpperCasePipe, NgClass],
  templateUrl: './recherche.html',
  styleUrl: './recherche.scss',
})
export class Recherche implements OnInit{
  form = new FormGroup({
    query: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
  });

  public results: Produit[] = [];
  public isLoading: boolean = false;
  public hasSearched: boolean = false;
  public selectedProduct: Produit | null = null;
  public isGoToSearch: boolean = false;

  constructor(private oof: ServiceOpenFoodFact, private formService: ServiceForm, private router: Router) { }

  public ngOnInit() {
    this.isGoToSearch = this.formService.getIsGoToSearch();
  }

  public onSearch(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const q = this.form.controls.query.value.trim();
    if (!q) return;
    this.isLoading = true;
    this.hasSearched = true;
    this.results = [];

    this.oof.searchProducts(q, 20).subscribe({
      next: (products) => {
        const uniq = new Map<string, Produit>();
        for (const p of products) {
          const key = p.code || '';
          if (key) {
            uniq.set(key, p);
          }
        }
        this.results = Array.from(uniq.values());
        this.isLoading = false;
      }
    });
  }

  public openDetail(p: Produit): void {
    this.selectedProduct = p;
  }

  public closeDetail(): void {
    this.selectedProduct = null;
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
  public allergensText(allergens?: string[]): string {
    return allergens && allergens.length > 0 ? allergens.join(', ') : 'Aucun allergène connu';
  }

  public addProduct(p: Produit): void {
    const form = this.formService.getFormQuestions();
    const ctrl = form.get('q7') as FormControl<Produit[]>;
    const current = ctrl.value ?? [];

    if (current.some(x => x.code === p.code)) return;
    ctrl.setValue([...current, p]);
    this.closeDetail();
  }

  public backToQuestionnary(): void {
    this.formService.setIsGoToSearch(false);
    this.router.navigate(["questionnaire"])
  }

}