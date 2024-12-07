import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';

const routes = [
  { path: '/Page', component: challengesPage },
  { path: '/form', component: challengeForm },
  { path: '/stats', component: challengeStats },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
