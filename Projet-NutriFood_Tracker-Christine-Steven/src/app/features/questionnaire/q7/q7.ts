import { Component, Input } from '@angular/core';
import { Produit } from '../../../core/storage/models/produit';
import { Question } from '../../../core/storage/models/question';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CATEGORIES } from '../../../core/storage/data/categories';
import { FoodCategories } from '../../../core/storage/models/food-categories';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormService } from '../../../core/storage/services/form-service';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { OpenFoodFactService } from '../../../core/storage/services/open-food-fact-service';

@Component({
  selector: 'app-q7',
  imports: [ReactiveFormsModule,MatCardModule, MatChipsModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './q7.html',
  styleUrl: './q7.scss',
})
export class Q7 {
  @Input() currentQuestion!: Question;
  @Input() previousControl!: FormControl
  @Input() currentControl!: FormControl;

  public categories: FoodCategories[] = CATEGORIES;
  public activeCategoryName: string = ''; // Sélectionne de la catégorie active pour afficher les produits
  public isLoadingQ7: boolean = false;

  public searchResults: Produit[] = []; // La liste des produits récupérés pour la catégorie active
  public selectedProductsByCategory: Record<string, Produit[]> = {}; // Pour chaque catégorie, la liste des produits sélectionnés

  constructor(private oof: OpenFoodFactService, private router: Router, private formService: FormService){}

  public setActiveCategory(name: string): void {
    if (!this.previousControl?.value.includes(name)) return;
    this.activeCategoryName = name;
    if (!this.selectedProductsByCategory[name]) {
      this.selectedProductsByCategory[name] = [];
    }
    this.loadProductsForCategory(name);
  }

  private loadProductsForCategory(categoryName: string): void {
    this.isLoadingQ7 = true;
    this.searchResults = [];

    const category = this.categories.find(cat => cat.name === categoryName);
    if (!category) {
      this.isLoadingQ7 = false;
      return;
    }

    this.oof.searchProductsWithCategories(category.off_tags, 20).subscribe({
      next: (products) => {
        const uniq = new Map<string, Produit>();
        for (const p of products) {
          if (p.product_name) uniq.set(p.product_name, p);
        }
        this.searchResults = Array.from(uniq.values());
        this.isLoadingQ7 = false;
      }
    });
  }

  public addProductQ7(p: Produit): void {
    const cat = this.activeCategoryName;
    if (!cat) return;
    const list = this.selectedProductsByCategory[cat];
    if (list.some(x => x.code === p.code)) return;
    if (list.length >= 3) return;

    this.selectedProductsByCategory[cat] = [...list, p];
    const all = Object.values(this.selectedProductsByCategory).flat();
    this.currentControl?.setValue(all);
  }

  public removeProductQ7(code: string): void {
    const cat = this.activeCategoryName;
    if (!cat) return;

    const list = this.selectedProductsByCategory[cat];
    this.selectedProductsByCategory[cat] = list.filter(p => p.code !== code);

    const all = Object.values(this.selectedProductsByCategory).flat(); // flat applatit en un seul tableau
    this.currentControl?.setValue(all);
  }

  public isSelectedQ7(code: string): boolean {
    const cat = this.activeCategoryName;
    if (!cat) return false;
    return (this.selectedProductsByCategory[cat]).some(p => p.code === code);
  }

  public isMaxReachedQ7(): boolean {
    const cat = this.activeCategoryName;
    if (!cat) return false;

    return (this.selectedProductsByCategory[cat]).length >= 3;
  }

  public goToFoodSearch(): void {
    this.formService.setIsGoToSearch(true)
    this.router.navigate(['recherche']);
  }
}
