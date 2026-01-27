import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ServicePassword} from '../../../services/service-password';
import { ProfileService } from '../../../core/storage/services/profile.service';
import { sha256 } from '../../../core/storage/utils/crypto.util';
export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

@Component({
  selector: 'app-confirm-current-password-dialog',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './confirm-current-password.dialog.html'
})
export class ConfirmCurrentPasswordDialog {
  public form: FormGroup = new FormGroup({
    currentPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]),
  });
  constructor(private profile: ProfileService, private passwordService: ServicePassword) {}

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    await this.passwordService.passwordMatchValidator(await sha256(this.form.value.currentPassword), this.profile.getConnectedUser()?.passwordHash);
  }
}
