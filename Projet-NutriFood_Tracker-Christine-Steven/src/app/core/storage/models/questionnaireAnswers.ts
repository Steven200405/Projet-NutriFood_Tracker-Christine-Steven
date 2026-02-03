import { Produit } from "./produit";

export interface QuestionnaireAnswers {
  userId: string;
  createdAt: string;
  globalScore: number;
  averageNutriScore: string;
  selectedProducts: Produit[];
}