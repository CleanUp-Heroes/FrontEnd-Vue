import { createRouter, createWebHistory } from 'vue-router';
import ReportForm from '../components/ReportForm.vue'; // Page du formulaire
import Map from '../components/Map.vue'; // Page de la carte
import MapPage from '../components/MapPage.vue';
import Acceuil from '../components/Acceuil.vue';
import Recrutement from '../Volontariat/Recrutement.vue'; // Import du composant


const routes = [
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
  // Ajoutez d'autres routes si nécessaire

  {
    path: '/reports',
    name: 'Reports',
    component: MapPage,  // La page qui contient le MapComponent
  },

  {
    path: '/Acceuil',
    name: 'Acceuil',
    component: Acceuil,  // La page qui contient le MapComponent
  },

  // Dossier Volontariat
    {
      path: '/recrutement',
      name: 'Recrutement',
      component: Recrutement,   // la route pour le recrutement
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
