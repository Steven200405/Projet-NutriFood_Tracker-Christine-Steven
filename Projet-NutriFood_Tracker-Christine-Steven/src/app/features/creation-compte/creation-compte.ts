import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../core/storage/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
  templateUrl: './creation-compte.html',
  styleUrl: './creation-compte.scss'
})
export class CreationCompte {
  public hidePassword = true;
  public hideConfirm = true;
  public serverError: string | null = null; // Affiche les erreurs serveur de manière dynamique

  public form: FormGroup = new FormGroup(
      {
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(120)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: confirmPasswordValidator }
  );
  constructor (private authService: AuthService, private routerService: Router, private snackBar: MatSnackBar) {}

  public async submit(): Promise<void> {
    this.serverError = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();// affiche les erreurs de validation
      return; // et arrête la soumission
    }

    try {
      await this.authService.register(this.form.controls['email'].value.trim(), this.form.controls['password'].value, this.form.controls['lastName'].value, this.form.controls['firstName'].value); // on crée le compte
      this.routerService.navigateByUrl('/accueil');
      this.snackBar.open('Compte créé avec succès !', 'OK', {duration: 3000});
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : '';
      if (msg.includes('EMAIL_ALREADY_USED')) {
        this.serverError = 'Cet email est déjà utilisé.';
      } else {
        this.serverError = 'Impossible de créer le compte. Réessayez.';
      }
    }
  }
}
