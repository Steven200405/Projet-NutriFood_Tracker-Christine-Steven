import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileService } from '../../core/storage/services/profile-service';
import { AuthService } from '../../core/storage/services/auth-service';
import { Allergy, DietType, NutritionGoal, PhysicalActivity, User } from '../../core/storage/models/user';
import { firstValueFrom } from 'rxjs';
import { ChangePasswordPayload, ConfirmCurrentPasswordDialog } from './confirmDialog/confirm-current-password.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NUTRITION_GOALS } from '../../core/storage/data/nutrition_goals';
import { DIET_TYPE } from '../../core/storage/data/diet_type';
import { PHYSICAL_ACTIVITY } from '../../core/storage/data/physical_activity';
import { ALLERGIES } from '../../core/storage/data/allergies';


type ProfileForm = {
  lastName: FormControl<string>;
  firstName: FormControl<string>;
  email: FormControl<string>;
  nutritionGoal: FormControl<NutritionGoal | null>;
  diet: FormControl<DietType | null>;
  physicalActivity: FormControl<PhysicalActivity | null>;
  allergies: FormControl<Allergy[]>;
};

@Component({
  selector: 'app-profil',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './profil.html',
  styleUrl: './profil.scss',
})
export class Profil implements OnInit{
  public user: User | null = null;
  public editMode: boolean = false;

  public nutritionGoals: NutritionGoal[] = NUTRITION_GOALS;
  public diets: DietType[] = DIET_TYPE;
  public activities: PhysicalActivity[] = PHYSICAL_ACTIVITY;
  public allergiesList: Allergy[] =  ALLERGIES;

  public form = new FormGroup<ProfileForm>({
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
    nutritionGoal: new FormControl<NutritionGoal | null>(null),
    diet: new FormControl<DietType | null>(null),
    physicalActivity: new FormControl<PhysicalActivity | null>(null),
    allergies: new FormControl<Allergy[]>([], { nonNullable: true }),
  });

  constructor(private profile: ProfileService, private auth: AuthService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    const u = this.auth.getCurrentUser();
    if (!u) {
      this.router.navigate(['login']);
      return;
    }
    this.user = u;
    this.patchForm(u);
    this.form.disable();
    console.log(this.user);
  }

  private patchForm(u: User): void {
    this.form.patchValue({
      lastName: u.lastName,
      firstName: u.firstName,
      email: u.email,
      nutritionGoal: u.nutritionGoal ?? null,
      diet: u.diet ?? null,
      physicalActivity: u.physicalActivity ?? null,
      allergies: u.allergies ?? [],
    });
  }

  public isEmpty(v: unknown): boolean {
    if (Array.isArray(v)) return v.length === 0;
    return v === null || v === undefined || String(v).trim().length === 0;
  }

  public startEdit(): void {
    this.editMode = true;
    this.form.enable();
    this.form.get('email')?.disable();
  }

  public cancelEdit(): void {
    this.editMode = false;
    if (this.user) this.patchForm(this.user);
    this.form.disable();
  }

  public save(): void {
    if (!this.user) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updated = this.profile.updateConnectedUser({
      lastName: this.form.get('lastName')?.value.trim(),
      firstName: this.form.get('firstName')?.value.trim(),
      nutritionGoal: this.form.get('nutritionGoal')?.value,
      diet: this.form.get('diet')?.value,
      physicalActivity: this.form.get('physicalActivity')?.value,
      allergies: this.form.get('allergies')?.value,
    });

    this.user = updated;
    this.editMode = false;
    this.form.disable();
  }

  public async openChangePasswordDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmCurrentPasswordDialog);

    const payload = await firstValueFrom(dialogRef.afterClosed()) as ChangePasswordPayload | null;
    if (!payload) return; // annulé

    try {
      await this.auth.changePassword(payload.currentPassword, payload.newPassword);
      this.snackBar.open('Mot de passe modifié', 'OK', { duration: 2500 });
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : '';
      alert(msg.includes('INVALID_CREDENTIALS') ? 'Mot de passe actuel incorrect.' : 'Impossible de changer le mot de passe.');
    }
  }

}
