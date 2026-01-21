import { Component } from '@angular/core';
import { ServiceOpenFoodFact } from '../services/service-open-food-fact';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-accueil',
  imports: [UpperCasePipe],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})
export class Accueil {
  product: any;

  constructor(private offService: ServiceOpenFoodFact) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const barcode = '3017620422003';
    this.offService.getProductByBarcode(barcode).subscribe({
      next: (data) => {
        this.product = data.product;
        console.log(this.product);
      },
      error: (err) => console.error(err)
    });
  }
}
