import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/storage/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  @Input() title: string = '';
  @Output() menu = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onMenuClick() {
    this.menu.emit();
  }
  onProfileClick() {
    const session = this.auth.getSession();
    if (session) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
