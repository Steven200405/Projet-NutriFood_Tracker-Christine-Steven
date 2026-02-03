import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db.service';
import { sha256 } from '../utils/crypto.util';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private db: LocalDbService) { }

  //Création d'une session user
  public getSession(): { userId: string; email: string; loggedAt: string } | null {
    return this.db.getSession();
  }

  //Déconnexion
  public logout(): void {
    this.db.clearSession();
  }

  //Création d'un compte user
  public async register(email: string, password: string, lastName: string, firstName: string): Promise<User> {
    const users = this.db.getUsers();

    const normalizedEmail = email.trim().toLowerCase();
    const exists = users.some(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (exists) throw new Error('EMAIL_ALREADY_USED');

    const passwordHash = await sha256(password);
    const now = new Date().toISOString();

    const user: User = {
      id: this.uid(),
      firstName: firstName,
      lastName: lastName,
      email: normalizedEmail,
      passwordHash,
      nutritionGoal: null,
      diet: null,
      physicalActivity: null,
      allergies: [],
      createdAt: now,
      updatedAt: now
    };

    users.push(user);
    this.db.saveUsers(users);
    return user;
  }

  //Login
  public async login(email: string, password: string): Promise<boolean> {
    const users = this.db.getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const user = users.find(u => u.email.trim().toLowerCase() === normalizedEmail);
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const passwordHash = await sha256(password);
    if (passwordHash !== user.passwordHash) throw new Error('INVALID_CREDENTIALS');

    this.db.setSession({ userId: user.id, email: user.email, loggedAt: new Date().toISOString() });
    return true;
  }

  //Changement de mot de passe avec système de vérification entre l'actuel et le nouveau
  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const session = this.db.getSession();
    if (!session) throw new Error('NOT_LOGGED_IN');

    const users = this.db.getUsers();
    const idx = users.findIndex(u => u.id === session.userId);
    if (idx === -1) throw new Error('USER_NOT_FOUND');

    const currentHash = await sha256(currentPassword);
    if (currentHash !== users[idx].passwordHash) throw new Error('INVALID_CREDENTIALS');

    const newHash = await sha256(newPassword);
    users[idx] = {
      ...users[idx],
      passwordHash: newHash,
      updatedAt: new Date().toISOString()
    };

    this.db.saveUsers(users);
  }
  
  //Récupérer l'utilisateur connecté
  public getCurrentUser(): User | null {
    const session = this.db.getSession();
    if (!session) return null;
    return this.db.getUsers().find(u => u.id === session.userId) ?? null;
  }

  // Génération d'un uid
  private uid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}
}
