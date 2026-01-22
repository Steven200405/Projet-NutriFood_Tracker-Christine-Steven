import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Input, Output, EventEmitter } from '@angular/core';
import { RouterLink} from '@angular/router';

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
  @Input() title: string  = '';
  @Output() menu = new EventEmitter<void>();

  onMenuClick() {
    this.menu.emit();
  }
}
