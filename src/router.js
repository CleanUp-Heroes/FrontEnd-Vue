import { createRouter, createWebHistory } from 'vue-router';
import challengesPage from './components/challenges/challengesPages.vue';
import challengeForm from './components/challenges/challengeForm.vue';
import challengeStats from './components/challenges/challengeStats.vue';
import MapComponent from './components/MapComponent.vue';
import ReportForm from './components/ReportForm.vue';
import loginPage from './components/loginPage.vue';
import AboutPage from './components/AboutPage.vue';
import AcceuilPage from './components/AcceuilPage.vue';
import ClassementPage from './components/ClassementPage.vue';
import { authState } from '@/authState';

//import EventListView from "@/views/EventListView.vue";
import CreateEventView from "@/views/CreateEventView.vue";
import ParticipateEventView from "@/views/ParticipateEventView.vue";
//import HistoryView from "@/views/HistoryView.vue";
//import HistoryView2 from "@/views/HistoryView2.vue";


//Vue.use(VueRouter);


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
  {path: '/classement', component: ClassementPage, meta: { requiresAuth: true }},

  { path: '/Acceuil', component: AcceuilPage },




  /*{
    path: "/events",
    name: "EventList",
    component: EventListView,
  },*/
  {
    path: "/events/create",
    name: "CreateEvent",
    component: CreateEventView,
  },
  {
    path: "/events/:id/participate",
    name: "ParticipateEvent",
    component: ParticipateEventView,
    props: true,
  },
  /*{
    path: "/events/history",
    name: "History",
    component: HistoryView,
  },
  {
    path: "/events/history",
    name: "History",
    component: HistoryView2,
  },*/


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