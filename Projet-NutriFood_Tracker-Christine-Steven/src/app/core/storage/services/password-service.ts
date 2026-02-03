import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  passwordMatchValidator(passwordKey = 'password', confirmKey = 'confirmPassword'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordKey)?.value;
      const confirm = control.get(confirmKey)?.value;

      if (!password || !confirm) return null;
      return password === confirm ? null : { passwordsMismatch: true };
    };
  }
}
