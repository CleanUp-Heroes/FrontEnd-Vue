import { createRouter, createWebHistory } from 'vue-router';
import ReportForm from '../components/ReportForm.vue'; // Page du formulaire
import Map from '../components/Map.vue'; // Page de la carte

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
