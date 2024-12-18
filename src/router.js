import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';
import MapComponent from './components/MapComponent.vue';
//import ReportForm from '@/components/ReportForm.vue';
import ReportForm from './components/ReportForm.vue';
import loginPage from './components/loginPage.vue';
import AboutPage from './components/AboutPage.vue';



const routes = [
  { path: "/", redirect: "/login" }, // Redirection par défaut
  { path: '/login', component: loginPage },
  { path: '/Page', component: challengesPage, meta: { requiresAuth: true } },
  { 
    path: '/form/:challengeId',  // Route dynamique avec l'ID du défi
    component: challengeForm,
    meta: { requiresAuth: true },
    props: true // Permet de passer challengeId comme prop au composant
  },
  { path: '/stats', component: challengeStats, meta: { requiresAuth: true } },
  { path: '/About', name: 'AboutPage', component: AboutPage }, 
  { path: '/reports', component: MapComponent },
  //{ path: '/signalement', component: ReportForm }, // Route pour le formulaire de signalement
  {
    path: '/reportForm', // Assurez-vous que le chemin est correct
    name: 'ReportForm',
    component: ReportForm,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("username");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
