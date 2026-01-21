import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Questionnaire } from './questionnaire/questionnaire';
import { Resultat } from './resultat/resultat';
import { Conseil } from './conseil/conseil';
import { Profil } from './profil/profil';
import { Recherche } from './recherche/recherche';

export const routes: Routes = [
    {path: '', component: Accueil},
    {path: 'accueil', component: Accueil},
    {path: 'questionnaire', component: Questionnaire},
    {path: 'resultat', component: Resultat},
    {path: 'conseil', component: Conseil},
    {path: 'profil', component: Profil},
    {path: 'recherche', component: Recherche},
    { path: '**', redirectTo: 'accueil'}
];
