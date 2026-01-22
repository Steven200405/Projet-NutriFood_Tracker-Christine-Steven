import { Component } from '@angular/core';
import { ServiceOpenFoodFact } from '../../services/service-open-food-fact';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, MatCardModule, MatIconModule],
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
