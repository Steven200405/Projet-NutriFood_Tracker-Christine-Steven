import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { Produit } from '../models/produit';
import { OpenFoodFactSearchResponse } from '../models/open-food-fact-search-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceOpenFoodFact {
  private apiUrlv1 = 'https://world.openfoodfacts.org/cgi/search.pl'; // Plus optimisé pour une recherche libre 
  private apiUrlv2 = 'https://world.openfoodfacts.org/api/v2'; // Endpoint avec un filtrage plus pertinent 

  constructor(private http: HttpClient) {
  }

  //Recherche des produits en fonction de la catégorie déjà définie
  public searchProductsWithCategories(categoryTags: string[], pageSize: number = 20): Observable<Produit[]> {

    let params = new HttpParams()
      .set('page_size', String(pageSize))
      .set('fields', 'code,product_name,brands,image_url,nutrition_grades,allergens')
      .set('sort_by', 'popularity_key');

    for (const t of categoryTags) {
      params = params.append('categories_tags', t);
    }
    params = params.append('countries_tags', 'en:france'); // Limiter que les produits français

    return this.http.get<OpenFoodFactSearchResponse>(`${this.apiUrlv2}/search`, { params })
      .pipe(map(res => res.products.map(p => this.mapToProduit(p))));
  }

  // Recherche des produits via un input libre
  public searchProducts(query: string, pageSize: number = 20): Observable<Produit[]> {

    let params = new HttpParams()
      .set('search_simple', '1')
      .set('action', 'process')
      .set('json', '1')
      .set('page_size', String(pageSize))
      .set('fields', 'code,product_name,brands,image_url,nutrition_grades,allergens')
      .set('sort_by', 'popularity_key')
      .set('search_terms', query);

    params = params.append('countries_tags', 'en:france');


    return this.http.get<OpenFoodFactSearchResponse>(`${this.apiUrlv1}`, { params })
      .pipe(map(res => res.products.map(p => this.mapToProduit(p))));
  }

  // Recherche des alternatives d'un produit qui a un mauvais nutriscore
  // Méthode: switchMap remplace un Observable par un autre et annule le précédent
  // Ici, il permet de changer d'appel pour chaque produit (et d'annuler l'appel précédent)
  public getTopAlternativesProducts(selected: Produit): Observable<Produit[]> {
    return this.getCategoriesTagsByCode(selected.code).pipe(
      switchMap((tags: string[]) => {
        const tag = tags?.[0];
        return this.searchAlternativeProducts(selected.product_name ?? 'unknown', tag, 80).pipe(
          map(list => {
            return this.pickTopNutri(list, 5, selected.nutrition_grades ?? 'unknown');
          })
        );
      })
    );
  }

  private mapToProduit(p: any): Produit {
    return {
      code: p.code,
      product_name: p.product_name ?? '(Sans nom)',
      brand: p.brands ?? '(Sans marque)',
      image_url: p.image_url ?? 'assets/no-image.png',
      nutrition_grades: p.nutrition_grades ?? 'unknown',
      allergens: p.allergens ? p.allergens.split(',').map((a: string) => a.trim()) : []
    };
  }

  // Récupérer les catégories tags d'un produit
  private getCategoriesTagsByCode(code: string): Observable<string[]> {
    let params = new HttpParams()
      .set('search_simple', '1')
      .set('action', 'process')
      .set('json', '1')
      .set('fields', 'categories_tags');

    return this.http.get<any>(`${this.apiUrlv2}/product/${encodeURIComponent(code)}.json`, { params })
      .pipe(map(res => res?.product?.categories_tags ?? [])
      );
  }

  // Recherche les produits qui ont le même nom et la même catégorie pour cherchr un nutriscore meilleur
  private searchAlternativeProducts(queryName: string, categoryTag: string, pageSize: number = 50): Observable<Produit[]> {

    let params = new HttpParams()
      .set('search_simple', '1')
      .set('action', 'process')
      .set('json', '1')
      .set('page_size', String(pageSize))
      .set('fields', 'code,product_name,brands,image_url,nutrition_grades,allergens')
      .set('sort_by', 'popularity_key')
      .set('search_terms', queryName);

    params = params.append('countries_tags', 'en:france')
      .append('categories_tags', categoryTag)

    return this.http.get<OpenFoodFactSearchResponse>(this.apiUrlv1, { params }).pipe(
      map(res => (res.products ?? []).map(p => this.mapToProduit(p)))
    );
  }

  // Récupère que les 5 meilleurs via un système de comparaison en donnant un classement aux nutriscores grades
  private pickTopNutri(products: Produit[], take: number = 5, nutri_score_grades: string): Produit[] {
    const rank: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };

    const uniq = new Map<string, Produit>();
    for (const p of products ?? []) {
      if (!uniq.has(p.code)) uniq.set(p.code, p);
    }

    return Array.from(uniq.values())
      .filter(p => {
        const g = (p.nutrition_grades ?? '').toLowerCase();
        if (rank[g] < rank[nutri_score_grades.toLowerCase()]) {
          return g in rank;
        }
        else {
          return;
        }
      })
      .sort((p1, p2) => {
        const g1 = (p1.nutrition_grades ?? '').toLowerCase();
        const g2 = (p2.nutrition_grades ?? '').toLowerCase();
        return rank[g1] - rank[g2];
      })
      .slice(0, take);
  }

}