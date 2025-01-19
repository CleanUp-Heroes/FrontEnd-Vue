import { createRouter, createWebHistory } from 'vue-router';
import ReportForm from '../components/ReportForm.vue'; // Page du formulaire
import Map from '../components/Map.vue'; // Page de la carte
import MapPage from '../components/MapPage.vue';
import Acceuil from '../components/Acceuil.vue';


const routes = [

  // Dossier Volontariat
  
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
