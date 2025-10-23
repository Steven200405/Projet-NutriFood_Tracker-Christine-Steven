import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceOpenFoodFact {
  private apiUrl = 'https://world.openfoodfacts.org/api/v2';

  constructor(private http: HttpClient) {}

  getProductByBarcode(barcode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${barcode}`);
  }

  searchProducts(query: string, pageSize: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: {
        search_terms: query,
        page_size: pageSize
      }
  });
  }
}