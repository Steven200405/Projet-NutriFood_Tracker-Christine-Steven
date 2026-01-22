import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  imports: [  MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @ViewChild('sidebar', { static: true }) sidebar!: MatSidenav;
  toggle() {
    this.sidebar.toggle();
  }
}
