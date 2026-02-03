import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/storage/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connexion-compte',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './connexion-compte.html',
  styleUrl: './connexion-compte.scss',
})

export class ConnexionCompte {
  public hidePassword = true;
  public serverError: string | null = null;

  public form : FormGroup= new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
  });

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  public async submit(): Promise<void> {
    this.serverError = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      await this.auth.login(this.form.controls['email'].value.trim(), this.form.controls['password'].value);
      this.router.navigate(['accueil']);
      this.snackBar.open('Connecté avec succès !', 'OK', {duration: 3000});
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : '';
      if (msg.includes('INVALID_CREDENTIALS')) {
        this.serverError = 'Email ou mot de passe incorrect.';
      } else {
        this.serverError = 'Impossible de se connecter. Réessayez.';
      }
    }
  }
}
