import { Component } from '@angular/core';
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
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-recherche',
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatProgressBarModule, MatListModule, MatIconModule, MatFormFieldModule,MatButtonModule, UpperCasePipe],
  templateUrl: './recherche.html',
  styleUrl: './recherche.scss',
})
export class Recherche {
form = new FormGroup({
    query: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
  });

  results: Produit[] = [];
  isLoading: boolean = false;
  hasSearched: boolean = false;

  constructor(private oof: ServiceOpenFoodFact) {}

  onSearch(): void {
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
          const key = p.code || p.product_name || Math.random().toString();
          uniq.set(key, p);
        }
        this.results = Array.from(uniq.values());
        this.isLoading = false;
      }
    });
  }
}