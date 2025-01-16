/*import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';
import MapComponent from './components/MapComponent.vue';
//import ReportForm from '@/components/ReportForm.vue';
import ReportForm from './components/ReportForm.vue';
import loginPage from './components/loginPage.vue';
import AboutPage from './components/AboutPage.vue';
import AcceuilPage from './components/AcceuilPage.vue';
import { authState } from '@/authState';




const routes = [
  { path: "/", redirect: "/login" }, // Redirection par défaut
  { path: '/login', component: loginPage },
  { path: '/challenges', component: challengesPage, meta: { requiresAuth: true } },
  {
    path: '/challenges/:id/participate/:challengeName/',
    component: challengeForm,
    meta: { requiresAuth: true }
  },  
  { path: '/stats', component: challengeStats, meta: { requiresAuth: true } },
  { path: '/About', name: 'AboutPage', component: AboutPage }, 
  { path: '/reports', component: MapComponent,  meta: { requiresAuth: true } },
  //{ path: '/signalement', component: ReportForm }, // Route pour le formulaire de signalement
  {
    path: '/reportForm', // Assurez-vous que le chemin est correct
    name: 'ReportForm',
    component: ReportForm,
    meta: { requiresAuth: true } 
  },

  { path: '/Acceuil', component: AcceuilPage },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;*/


import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';
import MapComponent from './components/MapComponent.vue';
//import ReportForm from '@/components/ReportForm.vue';
import ReportForm from './components/ReportForm.vue';
import loginPage from './components/loginPage.vue';
import AboutPage from './components/AboutPage.vue';
import AcceuilPage from './components/AcceuilPage.vue';
import { authState } from '@/authState';





const routes = [
  { path: "/", redirect: "/login" }, // Redirection par défaut
  { path: '/login', component: loginPage },
  { path: '/challenges', component: challengesPage, meta: { requiresAuth: true } },
  {
    path: '/challenges/:id/participate/:challengeName/',
    component: challengeForm,
    meta: { requiresAuth: true }
  }, 
  { path: '/stats', component: challengeStats, meta: { requiresAuth: true } },
  { path: '/About', name: 'AboutPage', component: AboutPage }, 
  { path: '/reports', component: MapComponent,  meta: { requiresAuth: true } },
  //{ path: '/signalement', component: ReportForm }, // Route pour le formulaire de signalement
  {
    path: '/reportForm', // Assurez-vous que le chemin est correct
    name: 'ReportForm',
    component: ReportForm,
  },

  { path: '/Acceuil', component: AcceuilPage },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;