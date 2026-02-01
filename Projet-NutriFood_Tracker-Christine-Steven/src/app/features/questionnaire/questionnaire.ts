import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoodCategories } from '../../models/food-categories';
import { ServiceOpenFoodFact } from '../../services/service-open-food-fact';
import { Produit } from '../../models/produit';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { QUESTIONS } from './data/questions';
import { Question } from '../../models/question';
import { CATEGORIES } from './data/categories';
import { ServiceScoring } from '../../services/service-scoring';
import { minArrayLengthValidator } from '../../validators/min-array-length';
import { QuestionnaireService } from '../../core/storage/services/questionnaire.service';
import { AuthService } from '../../core/storage/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../core/storage/models/user.model';


@Component({
  selector: 'app-questionnaire',
  imports: [ReactiveFormsModule, MatCardModule, MatRadioModule, MatButtonModule, MatProgressBarModule, MatCheckboxModule, MatChipsModule, MatIconModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {

  public categories: FoodCategories[] = CATEGORIES;


  public formQuestions = new FormGroup({
    q1: new FormControl<number | null>(null, Validators.required),
    q2: new FormControl<number | null>(null, Validators.required),
    q3: new FormControl<number | null>(null, Validators.required),
    q4: new FormControl<number | null>(null, Validators.required),
    q5: new FormControl<number | null>(null, Validators.required),
    q6: new FormControl<string[]>([], { nonNullable: true, validators: [minArrayLengthValidator(1)] }),
    q7: new FormControl<Produit[]>([], { nonNullable: true, validators: [minArrayLengthValidator(1)] }),
  });

  public indexQuestionnaire: number = 0;
  public questions: Question[] = QUESTIONS;

  public activeCategoryName: string = ''; // Sélectionne de la catégorie active pour afficher les produits
  public isLoadingQ7 = false;

  public searchResults: Produit[] = []; // La liste des produits récupérés pour la catégorie active
  public selectedProductsByCategory: Record<string, Produit[]> = {}; // Pour chaque catégorie, la liste des produits sélectionnés

  public user: User | null = null;

  constructor(private oof: ServiceOpenFoodFact, private serviceScoring: ServiceScoring, private questionnaireService: QuestionnaireService, private authService: AuthService, private router: Router
  ) {
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigateByUrl('/login');
    }
    this.user = user;
  }


  public getControl(id: string): FormControl {
    return this.formQuestions.get(id) as FormControl;
  }

  get currentQuestion(): Question {
    return this.questions[this.indexQuestionnaire];
  }

  // Méthode pour Q6
  public toggleCategory(name: string, checked: boolean): void {
    const current = this.formQuestions.controls.q6.value;
    const next = checked ? [...current, name] : current.filter(x => x !== name);
    /* [...current, name] permet de sélectionner une catégorie et current.filter(x => x !== name) permet de désélectionner une catégorie */
    this.formQuestions.controls.q6.setValue(next);
    this.formQuestions.controls.q6.markAsTouched();
  }

  public isCategoryChecked(name: string): boolean {
    return this.formQuestions.controls.q6.value.includes(name);
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
      if (this.formQuestions.controls.q6.invalid) {
        this.formQuestions.controls.q6.markAsTouched();
        return;
      }
    }
    if (this.indexQuestionnaire === 6) {
      if (this.formQuestions.controls.q7.invalid) {
        this.formQuestions.controls.q7.markAsTouched();
        return;
      }
    }
    if (this.indexQuestionnaire < this.questions.length - 1) {
      this.indexQuestionnaire++;
    }
  }

  public previousQuestion(): void {
    if (this.indexQuestionnaire > 0) {
      this.indexQuestionnaire--;
    }
  }

  public setActiveCategory(name: string): void {
    if (!this.formQuestions.controls.q6.value.includes(name)) return;
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
    this.formQuestions.controls.q7.setValue(all);
  }

  public removeProductQ7(code: string): void {
    const cat = this.activeCategoryName;
    if (!cat) return;

    const list = this.selectedProductsByCategory[cat];
    this.selectedProductsByCategory[cat] = list.filter(p => p.code !== code);

    const all = Object.values(this.selectedProductsByCategory).flat(); // flat applatit en un seul tableau
    this.formQuestions.controls.q7.setValue(all);
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


  public submit(): void {
    if (this.formQuestions.invalid) {
      this.formQuestions.markAllAsTouched();
      return;
    }
    this.questionnaireService.saveResult(
      this.serviceScoring.getGlobalScore(this.formQuestions),
      this.serviceScoring.getAverageFoodScore(this.formQuestions.controls.q7.value),
    );

    this.router.navigate(['/resultat']);
  }


}