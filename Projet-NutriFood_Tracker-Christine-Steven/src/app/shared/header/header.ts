import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/storage/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() title: string = '';
  @Output() menu = new EventEmitter<void>();

  constructor( private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  onMenuClick() {
    this.menu.emit();
  }

  get isLoggedIn(): boolean {
    return this.auth.getSession() !== null;
  }

  goLogin(): void {
    this.router.navigateByUrl('/login');
  }

  goProfile(): void {
    this.router.navigateByUrl('/profil');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/accueil');
    this.snackBar.open('Déconnecté avec succès !', 'OK', {duration: 3000});
  }
}
