import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceOpenFoodFact } from './services/service-open-food-fact';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Projet-NutriFood_Tracker-Christine-Steven');
  product: any;

  constructor(private offService: ServiceOpenFoodFact) {}

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

