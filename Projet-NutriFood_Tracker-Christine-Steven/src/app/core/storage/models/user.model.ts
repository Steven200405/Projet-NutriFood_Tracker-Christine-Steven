export type NutritionGoal = 'PERTE_POIDS' | 'PRISE_MASSE' | 'MAINTIEN' | 'SANTE';
export type DietType = 'OMNIVORE' | 'VEGETARIEN' | 'VEGAN' | 'PESCETARIEN' | 'SANS_PORC' | 'SANS_GLUTEN';
export type PhysicalActivity = 'FAIBLE' | 'MODEREE' | 'ELEVEE';
export type Allergy =
  | 'GLUTEN' | 'LACTOSE' | 'ARACHIDE' | 'FRUITS_COQUE' | 'OEUF' | 'SOJA' | 'POISSON' | 'CRUSTACES';

export interface User {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;

  nutritionGoal: NutritionGoal | null;
  diet: DietType | null;
  physicalActivity: PhysicalActivity | null;
  allergies: Allergy[];

  createdAt: string;
  updatedAt: string;
}
