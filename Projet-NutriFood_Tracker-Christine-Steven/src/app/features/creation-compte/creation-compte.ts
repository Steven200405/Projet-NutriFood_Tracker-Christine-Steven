import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../../core/storage/services/profile.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';
import { AuthService } from '../../core/storage/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
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
    MatProgressSpinnerModule
  ],
  templateUrl: './creation-compte.html',
  styleUrls: ['./creation-compte.scss']
})
export class RegisterComponent {
  public hidePassword = true;
  public hideConfirm = true;
  public loading = false;
  public serverError: string | null = null;

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
  constructor (private authService: AuthService, private profileService: ProfileService, private routerService: Router) {}

  get f() {
    return this.form.controls;
  }

  async submit() {
    this.serverError = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, firstName, lastName } = this.form.getRawValue();
    if (!email || !password || !firstName || !lastName) return;

    try {
      this.loading = true;

      await this.authService.register(email, password);

      this.profileService.updateConnectedUser({ firstName, lastName });

      await this.routerService.navigateByUrl('/profil');
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes('EMAIL_ALREADY_USED')) {
        this.serverError = 'Cet email est déjà utilisé.';
      } else {
        this.serverError = 'Impossible de créer le compte. Réessaie.';
      }
    } finally {
      this.loading = false;
    }
  }
}
