import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db.service';
import { QuestionnaireEntry } from '../models/questionnaire.model';

function uid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
}

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
  constructor(private db: LocalDbService) {}

  saveAnswers(answers: Record<string, any>): QuestionnaireEntry {
    const session = this.db.getSession();
    if (!session) throw new Error('NOT_LOGGED_IN');

    const entries = this.db.getQuestionnaires();
    const entry: QuestionnaireEntry = {
      id: uid(),
      userId: session.userId,
      answers,
      score: this.computeScore(answers),
      createdAt: new Date().toISOString()
    };

    entries.push(entry);
    this.db.saveQuestionnaires(entries);
    return entry;
  }

  getMyHistory(): QuestionnaireEntry[] {
    const session = this.db.getSession();
    if (!session) return [];
    return this.db.getQuestionnaires()
      .filter(e => e.userId === session.userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  /** à adapter selon ton questionnaire */
  private computeScore(answers: Record<string, any>): number {
    let score = 0;
    for (const v of Object.values(answers)) {
      if (Array.isArray(v)) score += v.length;
      else if (typeof v === 'boolean') score += v ? 1 : 0;
      else if (typeof v === 'string') score += v.trim().length > 0 ? 1 : 0;
      else if (typeof v === 'number') score += 1;
      else if (v && typeof v === 'object') score += 1;
    }
    return score;
  }
}
