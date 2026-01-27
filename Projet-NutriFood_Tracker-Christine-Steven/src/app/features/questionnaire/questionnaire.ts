import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoodCategories } from '../../models/food-categories';
import { ServiceOpenFoodFact } from '../../services/service-open-food-fact';
import { Produit } from '../../models/produit';
import { JsonPipe, NgClass } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-questionnaire',
  imports: [ReactiveFormsModule, MatCardModule, MatRadioModule, MatButtonModule, MatProgressBarModule, JsonPipe, MatCheckboxModule, MatChipsModule, MatIconModule],
  templateUrl: './questionnaire.html',
  styleUrl: './questionnaire.scss',
})
export class Questionnaire {

  public categories: FoodCategories[] = [
    { name: 'Fruits et légumes', off_tags: ['en:fruits', 'en:vegetables'] },
    { name: 'Céréales et féculents', off_tags: ['en:cereals', 'en:bread', 'en:pasta', 'en:rice', 'en:potatoes'] },
    { name: 'Légumineuses et fruits secs', off_tags: ['en:legumes', 'en:lentils', 'en:chickpeas', 'en:beans', 'en:nuts'] },
    { name: 'Produits laitiers et alternatives végétales', off_tags: ['en:milk', 'en:cheeses', 'en:yogurts', 'en:plant-based-foods', 'en:vegetable-milks'] },
    { name: 'Viandes, poissons et œufs', off_tags: ['en:meat', 'en:fish', 'en:seafood', 'en:eggs'] },
    { name: 'Plats préparés', off_tags: ['en:ready-meals'] },
    { name: 'Snacks et produits sucrés', off_tags: ['en:snacks', 'en:crisps', 'en:sweets', 'en:desserts', 'en:chocolate'] },
    { name: 'Boissons (hors eau)', off_tags: ['en:beverages', 'en:sweetened-beverages', 'en:sodas'] },
    { name: 'Eau', off_tags: ['en:water', 'en:waters'] },
  ];

  public questions: Question[] = [
    {
      id: 'q1',
      title: 'À quelle fréquence mangez-vous des fruits ?',
      options: [
        { label: '2 fois par jour ou plus', points: 10 },
        { label: '1 fois par jour', points: 8 },
        { label: '4 à 6 fois par semaine', points: 6 },
        { label: '1 à 3 fois par semaine', points: 3 },
        { label: 'Rarement/Jamais', points: 0 },
      ],
    },
    {
      id: 'q2',
      title: 'A quelle fréquence mangez-vous des légumes ?',
      options: [
        { label: '2 fois par jour ou plus', points: 10 },
        { label: '1 fois par jour', points: 8 },
        { label: '4 à 6 fois par semaine', points: 6 },
        { label: '1 à 3 fois par semaine', points: 3 },
        { label: 'Rarement/Jamais', points: 0 },
      ],
    },
    {
      id: 'q3',
      title: ' À quelle fréquence consommez-vous des féculents / produits céréaliers ? (pain, pâtes, riz, pommes de terre, céréales…)',
      options: [
        { label: 'A chaque repas (ou presque)', points: 10 },
        { label: '1 fois par jour', points: 8 },
        { label: '4 à 6 fois par semaine', points: 6 },
        { label: '1 à 3 fois par semaine', points: 3 },
        { label: 'Rarement/Jamais', points: 0 },
      ],
    },
    {
      id: 'q4',
      title: 'Combien d\'eau buvez-vous par jour ?',
      options: [
        { label: 'Plus de 1,5L', points: 10 },
        { label: '1L à 1,5L', points: 7 },
        { label: 'Moins d\'1L', points: 3 },
        { label: 'Je ne bois que des boissons', points: 0 },
      ],
    },
    {
      id: 'q5',
      title: 'À quelle fréquence consommez-vous des aliments transformés (plats préparés, snacks industriels, etc.) ?',
      options: [
        { label: 'Rarement/Jamais', points: 10 },
        { label: '1 à 2 fois par semaine', points: 7 },
        { label: '3 à 5 fois par semaine', points: 4 },
        { label: 'Tous les jours', points: 0 },
      ],
    },
    {
      id: 'q6',
      title: 'Quels types d\'aliments consommez-vous le plus souvent ?',
      options: [
        { label: 'Fruits et légumes', points: 0 },
        { label: 'Céréales et féculents', points: 0 },
        { label: 'Légumineuses et fruits secs', points: 0 },
        { label: 'Produits laitiers et alternatives végétales', points: 0 },
        { label: 'Viandes, poissons et œufs', points: 0 },
        { label: 'Plats préparés', points: 0 },
        { label: 'Snacks et produits sucrés', points: 0 },
        { label: 'Boissons (hors eau)', points: 0 },
        { label: 'Eau', points: 0 }
      ],
    },
    {
      id: 'q7',
      title: 'Recherchez et ajoutez les produits que vous consommez (Open Food Facts)',
      options: [],
    }
  ];

  public formQuestions = new FormGroup({
    q1: new FormControl<number | null>(null, Validators.required),
    q2: new FormControl<number | null>(null, Validators.required),
    q3: new FormControl<number | null>(null, Validators.required),
    q4: new FormControl<number | null>(null, Validators.required),
    q5: new FormControl<number | null>(null, Validators.required),
    q6: new FormControl<string[]>([], { nonNullable: true, validators: [Validators.minLength(1)] }),
    q7: new FormControl<Produit[]>([], { nonNullable: true }),
    q8: new FormControl<Produit[]>([], { nonNullable: true }),
  });

  public indexQuestionnaire: number = 0;

  public resultsSearch: Produit[] = [];

  constructor(private oof: ServiceOpenFoodFact) { }

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
    console.log('index', this.indexQuestionnaire, 'id', this.currentQuestion.id, this.formQuestions.get(this.currentQuestion.id)?.value);

  }

  public previousQuestion(): void {
    if (this.indexQuestionnaire > 0) {
      this.indexQuestionnaire--;
    }
  }

  //Méthodes pour Q7
  public activeCategoryName: string = ''; // Sélectionne de la catégorie active pour afficher les produits
  public isLoadingQ7 = false;

  public q7Products: Produit[] = []; // La liste des produits récupérés pour la catégorie active
  public selectedProductsByCategory: Record<string, Produit[]> = {}; // Pour chaque catégorie, la liste des produits sélectionnés

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
    this.q7Products = [];

    const category = this.categories.find(cat => cat.name === categoryName);
    if (!category) {
      this.isLoadingQ7 = false;
      return;
    }

    this.oof.searchProducts(category.off_tags, 20).subscribe({
      next: (products) => {
        const uniq = new Map<string, Produit>();
        for (const p of products) {
          if (p.product_name) uniq.set(p.product_name, p);
        }
        this.q7Products = Array.from(uniq.values());
        this.isLoadingQ7 = false;
      }
    });
  }

  public addProductQ7(p: Produit): void {
    const cat = this.activeCategoryName;
    if (!cat) return;

    const list = this.selectedProductsByCategory[cat] ?? [];

    if (list.some(x => x.code === p.code)) return;
    if (list.length >= 3) return;

    this.selectedProductsByCategory[cat] = [...list, p];

    // synchroniser dans le form q7 (liste globale de tous les produits)
    const all = Object.values(this.selectedProductsByCategory).flat();
    this.formQuestions.controls.q7.setValue(all);
  }

  public removeProductQ7(code: string): void {
    const cat = this.activeCategoryName;
    if (!cat) return;

    const list = this.selectedProductsByCategory[cat] ?? [];
    this.selectedProductsByCategory[cat] = list.filter(p => p.code !== code);

    const all = Object.values(this.selectedProductsByCategory).flat();
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
    alert("Le formulaire est valide");
    let scoreGlobal = 0;
    for (let i = 1; i <= 5; i++) {
      const points = this.formQuestions.get(`q${i}`)?.value;
      scoreGlobal += points ?? 0;
    }

    let scoreMoyenAliments = "";
    const produitsChoisis = this.formQuestions.controls.q7.value;
    const nutriMap: Record<string, number> = {
      a: 5,
      b: 4,
      c: 3,
      d: 2,
      e: 1,
    };
    let total = 0;
    let count = 0;
    for (const p of produitsChoisis) {
      const grade = p.nutrition_grades?.toLowerCase();
      if (grade && nutriMap[grade]) {
        total += nutriMap[grade];
        count++;
      }
    }

    if (count === 0) {
      scoreMoyenAliments = 'Non disponible';
    } else {
      const moyenne = total / count;

      // conversion moyenne → nutrigrade
      if (moyenne >= 4.5) scoreMoyenAliments = 'A';
      else if (moyenne >= 3.5) scoreMoyenAliments = 'B';
      else if (moyenne >= 2.5) scoreMoyenAliments = 'C';
      else if (moyenne >= 1.5) scoreMoyenAliments = 'D';
      else scoreMoyenAliments = 'E';
    }
    alert(`Résultats :
      - Score global (habitudes) : ${scoreGlobal}
      - Nutri-score moyen des produits consommés : ${scoreMoyenAliments}`);
    console.log('Score total du questionnaire :', scoreGlobal);
  }


}