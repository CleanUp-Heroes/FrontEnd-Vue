import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';
import loginPage from './components/loginPage.vue';

const routes = [
  { path: "/", redirect: "/login" }, // Redirection par défaut
  { path: '/login', component: loginPage },
  { path: '/Page', component: challengesPage , meta: { requiresAuth: true } },
  { path: '/form', component: challengeForm , meta: { requiresAuth: true }},
  { path: '/stats', component: challengeStats , meta: { requiresAuth: true }},
  
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