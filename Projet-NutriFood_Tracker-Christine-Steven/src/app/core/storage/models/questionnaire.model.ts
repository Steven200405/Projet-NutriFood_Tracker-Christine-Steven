export interface QuestionnaireEntry {
  id: string;
  userId: string;
  answers: Record<string, any>;
  score: number;
  createdAt: string;
}