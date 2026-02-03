import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { forkJoin } from 'rxjs';
import { Produit } from '../../core/storage/models/produit';
import { OpenFoodFactService } from '../../core/storage/services/open-food-fact-service';
import { NgClass, UpperCasePipe } from '@angular/common';
import { QuestionnaireService } from '../../core/storage/services/questionnaire-service';
import { MatIconModule } from '@angular/material/icon';

type ConseilItem = {
  product: Produit;
  alternatives: Produit[];
  status: 'OK' | 'IMPROVE' | 'unknown';
};

@Component({
  selector: 'app-conseil',
  imports: [MatCardModule, MatProgressBarModule, UpperCasePipe, NgClass, MatIconModule],
  templateUrl: './conseil.html',
  styleUrl: './conseil.scss',
})
export class Conseil implements OnInit {
  public isLoading = true;
  public items: ConseilItem[] = [];

  constructor(private oof: OpenFoodFactService, private questionnaireService: QuestionnaireService) {}

  public ngOnInit(): void {
    const selected = this.questionnaireService.getMyLast()?.selectedProducts as Produit[] ?? [];

    const items: ConseilItem[] = selected.map(p => ({
      product: p,
      alternatives: [],
      status: p.nutrition_grades?.toLowerCase() === 'a' ? 'OK' : 'IMPROVE'
    }));

    const toImprove = items.filter(i => i.status === 'IMPROVE');

    // Situation où tous les produits sont sains
    if (toImprove.length === 0) {
      this.items = items;
      this.isLoading = false;
      return;
    }

    // Lancer en simultané la recherche des alternatives pour tous les produits nécessaires avec forkJoin
    forkJoin(
      toImprove.map(i =>
        this.oof.getTopAlternativesProducts(i.product)
      )
    ).subscribe({
      next: list => {
        let index = 0;
        this.items = items.map(i =>
          i.status === 'OK' ? i : { ...i, alternatives: list[index++] ?? [] }
        );
        this.isLoading = false;
      },
      error: () => { // En cas d'erreur ça arrête tout
        this.items = items;
        this.isLoading = false;
      }
    });
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
