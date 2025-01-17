import { createRouter, createWebHistory } from 'vue-router';
import ReportForm from '../components/ReportForm.vue'; // Page du formulaire
import Map from '../components/Map.vue'; // Page de la carte
import MapPage from '../components/MapPage.vue';
import Acceuil from '../components/Acceuil.vue';
import RecrutementPage from '@/components/Volontariat/RecrutementPage.vue'; // Nouveau chemin
import ValidationPage from '@/components/Volontariat/ValidationPage.vue'; // Importez votre composant

import RecrutementPage from '@/views/RecrutementPage.vue';

const routes = [

  {
    path: '/validation',  // La route de votre page de validation
    name: 'validation',
    component: ValidationPage,  // Associez le composant à cette route
  },

  // Dossier Volontariat
  {
    path: '/recrutement', // Définir la route pour RecrutementPage
    name: 'Recrutement',
    component: RecrutementPage,
  },
  
  {
    path: '/form',
    name: 'form',
    component: ReportForm,
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: MapPage,
  },
  {
    path: '/Acceuil',
    name: 'Acceuil',
    component: Acceuil,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
