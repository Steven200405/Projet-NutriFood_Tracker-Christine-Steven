import { Component, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Sidebar } from "./shared/sidebar/sidebar";
import { AuthService } from './core/storage/services/auth.service';
import { ProfileService } from './core/storage/services/profile.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    Header,
    Footer,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private auth: AuthService, private profile: ProfileService) {}
  protected readonly title = signal('Projet-NutriFood_Tracker-Christine-Steven');
  pageTitle = 'Accueil';
async runTest() {
    // si tu veux repartir à zéro à chaque fois (optionnel)
    // localStorage.clear();

    console.log('1️⃣ Register...');
    await this.auth.register('test@gmail.com', '123456');

    console.log('2️⃣ Login...');
    await this.auth.login('test@gmail.com', '123456');

    console.log('3️⃣ Update profile...');
    const updated = this.profile.updateConnectedUser({
      firstName: 'Steven',
      lastName: 'Huang',
      nutritionGoal: 'MAINTIEN',
      diet: 'OMNIVORE',
      physicalActivity: 'MODEREE',
      allergies: ['LACTOSE']
    });

    console.log('✅ Updated user:', updated);

    console.log('4️⃣ Read me...');
    console.log('✅ Me:', this.profile.getConnectedUser());
  }
}

