// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import ReportForm from '../components/ReportForm.vue'; // Page du formulaire
import Map from '../components/Map.vue'; // Page de la carte
import MapPage from '../components/MapPage.vue';
import Acceuil from '../components/Acceuil.vue';
import SignalementForm from '../views/SignalementForm.vue';
import MapComponent from '../components/MapComponent.vue';

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
  {
    path: '/reports',
    name: 'Reports',
    component: MapPage,
  },
  {
    path: '/acceuil',
    name: 'Acceuil',
    component: Acceuil,
  },
  {
    path: '/',
    name: 'Form',
    component: SignalementForm,
  },
  {
    path: '/mapComponent',
    name: 'MapComponent',
    component: MapComponent,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
