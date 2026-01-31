import { Question } from "../../../models/question";

export const QUESTIONS: Question[] = [
    {
        id: 'q1',
        title: 'À quelle fréquence mangez-vous des fruits ?',
        options: [
            { label: '2 fois par jour ou plus', points: 10 },
            { label: '1 fois par jour', points: 8 },
            { label: '4 à 6 fois par semaine', points: 6 },
            { label: '1 à 3 fois par semaine', points: 3 },
            { label: 'Rarement/Jamais', points: 0 },
        ],
    },
    {
        id: 'q2',
        title: 'A quelle fréquence mangez-vous des légumes ?',
        options: [
            { label: '2 fois par jour ou plus', points: 10 },
            { label: '1 fois par jour', points: 8 },
            { label: '4 à 6 fois par semaine', points: 6 },
            { label: '1 à 3 fois par semaine', points: 3 },
            { label: 'Rarement/Jamais', points: 0 },
        ],
    },
    {
        id: 'q3',
        title: ' À quelle fréquence consommez-vous des féculents / produits céréaliers ? (pain, pâtes, riz, pommes de terre, céréales…)',
        options: [
            { label: 'A chaque repas (ou presque)', points: 10 },
            { label: '1 fois par jour', points: 8 },
            { label: '4 à 6 fois par semaine', points: 6 },
            { label: '1 à 3 fois par semaine', points: 3 },
            { label: 'Rarement/Jamais', points: 0 },
        ],
    },
    {
        id: 'q4',
        title: 'Combien d\'eau buvez-vous par jour ?',
        options: [
            { label: 'Plus de 1,5L', points: 10 },
            { label: '1L à 1,5L', points: 7 },
            { label: 'Moins d\'1L', points: 3 },
            { label: 'Je ne bois que des boissons', points: 0 },
        ],
    },
    {
        id: 'q5',
        title: 'À quelle fréquence consommez-vous des aliments transformés (plats préparés, snacks industriels, etc.) ?',
        options: [
            { label: 'Rarement/Jamais', points: 10 },
            { label: '1 à 2 fois par semaine', points: 7 },
            { label: '3 à 5 fois par semaine', points: 4 },
            { label: 'Tous les jours', points: 0 },
        ],
    },
    {
        id: 'q6',
        title: 'Quels types d\'aliments consommez-vous le plus souvent ?',
        options: [
            { label: 'Fruits et légumes', points: 0 },
            { label: 'Céréales et féculents', points: 0 },
            { label: 'Légumineuses et fruits secs', points: 0 },
            { label: 'Produits laitiers et alternatives végétales', points: 0 },
            { label: 'Viandes, poissons et œufs', points: 0 },
            { label: 'Plats préparés', points: 0 },
            { label: 'Snacks et produits sucrés', points: 0 },
            { label: 'Boissons (hors eau)', points: 0 },
            { label: 'Eau', points: 0 }
        ],
    },
    {
        id: 'q7',
        title: 'Recherchez et ajoutez les produits que vous consommez (Open Food Facts)',
        options: [],
    }
];