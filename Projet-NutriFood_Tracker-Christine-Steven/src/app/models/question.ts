import { QuestionOption } from './question-option';

export interface Question {
  id: string;
  title: string;
  type: string;
  options: QuestionOption[];
}
