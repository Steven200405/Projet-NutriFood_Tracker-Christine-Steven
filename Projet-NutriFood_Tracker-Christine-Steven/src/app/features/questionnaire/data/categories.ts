import { FoodCategories } from "../../../core/storage/models/food-categories";

export const CATEGORIES: FoodCategories[] = [
    { name: 'Fruits et légumes', off_tags: ['en:fruits', 'en:vegetables'] },
    { name: 'Céréales et féculents', off_tags: ['en:cereals', 'en:bread', 'en:pasta', 'en:rice', 'en:potatoes'] },
    { name: 'Légumineuses et fruits secs', off_tags: ['en:legumes', 'en:lentils', 'en:chickpeas', 'en:beans', 'en:nuts'] },
    { name: 'Produits laitiers et alternatives végétales', off_tags: ['en:milk', 'en:cheeses', 'en:yogurts', 'en:plant-based-foods', 'en:vegetable-milks'] },
    { name: 'Viandes, poissons et œufs', off_tags: ['en:meat', 'en:fish', 'en:seafood', 'en:eggs'] },
    { name: 'Plats préparés', off_tags: ['en:ready-meals'] },
    { name: 'Snacks et produits sucrés', off_tags: ['en:snacks', 'en:crisps', 'en:sweets', 'en:desserts', 'en:chocolate'] },
    { name: 'Boissons (hors eau)', off_tags: ['en:beverages', 'en:sweetened-beverages', 'en:sodas'] },
    { name: 'Eau', off_tags: ['en:water', 'en:waters'] },
  ];