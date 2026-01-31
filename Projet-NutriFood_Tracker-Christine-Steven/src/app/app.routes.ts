import { Routes } from '@angular/router';
import { Accueil } from './features/accueil/accueil';
import { Questionnaire } from './features/questionnaire/questionnaire';
import { Resultat } from './features/resultat/resultat';
import { Conseil } from './features/conseil/conseil';
import { Profil } from './features/profil/profil';
import { Recherche } from './features/recherche/recherche';
import { CreationCompte } from './features/creation-compte/creation-compte';
import { ConnexionCompte } from './features/connexion-compte/connexion-compte';

export const routes: Routes = [
    {path: '', component: Accueil},
    {path: 'accueil', component: Accueil},
    {path: 'questionnaire', component: Questionnaire},
    {path: 'resultat', component: Resultat},
    {path: 'conseil', component: Conseil},
    {path: 'profil', component: Profil},
    {path: 'register', component: CreationCompte},
    {path: 'recherche', component: Recherche},
    { path: 'login', component: ConnexionCompte },
    { path: '**', redirectTo: 'accueil'}
];
