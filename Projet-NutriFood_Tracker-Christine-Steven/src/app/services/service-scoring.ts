import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ServiceScoring {
  public getGlobalScore(formQuestions: FormGroup): number {
    let scoreGlobal = 0;
    for (let i = 1; i <= 5; i++) {
      const points = formQuestions.get(`q${i}`)?.value;
      scoreGlobal += points ?? 0;
    }

    return scoreGlobal;
  }

  public getAverageFoodScore(selectedProducts: any[]): string {
    let scoreMoyenAliments = "";
    const nutriMap: Record<string, number> = {
      a: 5,
      b: 4,
      c: 3,
      d: 2,
      e: 1,
    };
    let total = 0;
    let count = 0;
    for (const p of selectedProducts) {
      const grade = p.nutrition_grades?.toLowerCase();
      if (grade && nutriMap[grade]) {
        total += nutriMap[grade];
        count++;
      }
    }

    if (count === 0) {
      scoreMoyenAliments = 'Non disponible';
    } else {
      const moyenne = total / count;
      if (moyenne >= 4.5) scoreMoyenAliments = 'A';
      else if (moyenne >= 3.5) scoreMoyenAliments = 'B';
      else if (moyenne >= 2.5) scoreMoyenAliments = 'C';
      else if (moyenne >= 1.5) scoreMoyenAliments = 'D';
      else scoreMoyenAliments = 'E';
    }
    return scoreMoyenAliments;
  }
}