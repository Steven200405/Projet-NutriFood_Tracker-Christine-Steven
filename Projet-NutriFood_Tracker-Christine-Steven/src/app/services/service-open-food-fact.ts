import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { OpenFoodFactSearchResponse } from '../models/open-food-fact-search-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceOpenFoodFact {
  private apiUrl = 'https://world.openfoodfacts.org/api/v2/search';

  constructor(private http: HttpClient) { }

  searchProductsWithCategories(categoryTags: string[], pageSize: number = 20): Observable<Produit[]> {

    let params = new HttpParams()
      .set('page_size', String(pageSize))
      .set('fields', 'code,product_name,brands,image_url,nutrition_grades,allergens')
      .set('sort_by', 'popularity_key');

    for (const t of categoryTags) {
      params = params.append('categories_tags', t); 
    }
    params = params.append('countries_tags', 'en:france'); // Limiter que les produits français

    return this.http.get<OpenFoodFactSearchResponse>(`${this.apiUrl}`, { params })
      .pipe(map(res => res.products.map(p => this.mapToProduit(p))));
  }

  searchProducts(query: string, pageSize: number = 20): Observable<Produit[]> {

    let params = new HttpParams()
      .set('page_size', String(pageSize))
      .set('fields', 'code,product_name,brands,image_url,nutrition_grades,allergens')
      .set('sort_by', 'popularity_key')
      .set('search_terms', query);
    params = params.append('countries_tags', 'en:france'); // Limiter que les produits français

    return this.http.get<OpenFoodFactSearchResponse>(`${this.apiUrl}`, { params })
      .pipe(map(res => res.products.map(p => this.mapToProduit(p))));
  }


  private mapToProduit(p: any): Produit {
    return {
      code: p.code,
      product_name: p.product_name ?? '(Sans nom)',
      brand: p.brands ?? '(Sans marque)',
      image_url: p.image_url ?? 'assets/images/no-image.png',
      nutrition_grades: p.nutrition_grades ?? 'unknown',
      allergens: p.allergens ? p.allergens.split(',').map((a: string) => a.trim()) : []
    };
  }
}