import { Component } from '@angular/core';
import { ServiceOpenFoodFact } from '../../core/storage/services/service-open-food-fact';
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
}
