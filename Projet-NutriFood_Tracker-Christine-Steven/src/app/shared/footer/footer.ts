import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from "@angular/material/toolbar";
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatToolbar, MatDivider],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  year: number = new Date().getFullYear();
}
