import { Injectable } from '@angular/core';
import { LocalDbService } from './local-db.service';
import { QuestionnaireEntry } from '../models/questionnaire.model';

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
  constructor(private db: LocalDbService) { }

  public saveResult(globalScore: number, averageNutriScore: string): QuestionnaireEntry {
    const session = this.db.getSession();
    if (!session) throw new Error('NOT_LOGGED_IN');

    const entries = this.db.getQuestionnaires();

    const entry: QuestionnaireEntry = {
      userId: session.userId,
      createdAt: new Date().toISOString(),
      globalScore,
      averageNutriScore,
    };

    entries.push(entry);
    this.db.saveQuestionnaires(entries);
    return entry;
  }

  public getMyHistory(): QuestionnaireEntry[] {
    const session = this.db.getSession();
    if (!session) return [];

    return this.db.getQuestionnaires()
      .filter(e => e.userId === session.userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public getMyLast(): QuestionnaireEntry | null {
    const h = this.getMyHistory();
    return h.length ? h[0] : null;
  }

}
