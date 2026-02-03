import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { QuestionnaireAnswers } from '../models/questionnaireAnswers';
import { Session } from '../models/session.model';

type StorageKey = 'nf_users' | 'nf_questionnaires' | 'nf_session';

@Injectable({ providedIn: 'root' })
export class LocalDbService {
  private read<T>(key: StorageKey, fallback: T): T {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  }

  private write<T>(key: StorageKey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getUsers(): User[] { return this.read<User[]>('nf_users', []); }
  saveUsers(users: User[]): void { this.write('nf_users', users); }

  getQuestionnaires(): QuestionnaireAnswers[] {
    return this.read<QuestionnaireAnswers[]>('nf_questionnaires', []);
  }
  saveQuestionnaires(entries: QuestionnaireAnswers[]): void {
    this.write('nf_questionnaires', entries);
  }

  getSession(): Session | null { return this.read<Session | null>('nf_session', null); }
  setSession(session: Session): void { this.write('nf_session', session); }
  clearSession(): void { localStorage.removeItem('nf_session'); }
}
