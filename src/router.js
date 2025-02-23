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
import CreateSubject from './components/forum/create_topic.vue';
import ForumTopics from '@/components/forum/topics_list.vue';
import ForumTopicDetail from '@/components/forum/topic_detail.vue';
import { authState } from '@/authState';

//import EventListView from "@/views/EventListView.vue";
import CreateEventView from "@/views/CreateEventView.vue";
import ParticipateEventView from "@/views/ParticipateEventView.vue";
//import HistoryView from "@/views/HistoryView.vue";
//import HistoryView2 from "@/views/HistoryView2.vue";

// les modules du volontariats
import RecrutementPage from './components/Volontariat/RecrutementPage.vue';
import ValidationPage from './components/Volontariat/ValidationPage.vue';
//import AffectationPage from './components/Volontariat/AffectationPage.vue';
import FormationPage from './components/Volontariat/FormationPage.vue';
//import CanditaturePage from './components/Volontariat/CandidaturePage.vue';
import CandidaturePage from './components/Volontariat/CandidaturePage.vue';
import SuiviMissions from './components/Volontariat/SuiviMissions.vue';

//Vue.use(VueRouter);


const routes = [
// les modules du recrutement
 {path: '/recrutement',
      name: 'recrutement',
      component: RecrutementPage,   // la route pour le recrutement
},

//{path: '/affectation',
//  name: 'affectation',
  //component: AffectationPage,   // la route pour le recrutement
//},


{
  path: '/validation',  // La route de votre page de validation
  name: 'validation',
  component: ValidationPage,  // Associez le composant à cette route
},


{
  path: '/formation',  // La route de votre page de validation
  name: 'formation',
  component: FormationPage,  // Associez le composant à cette route
},

{path: '/candidatures',
  name: 'candidatures',
  component: CandidaturePage,   // la route pour le recrutement
},

{path: '/suivi-missions',
  name: 'suivi-missions',
  component: SuiviMissions,   // la route pour le recrutement
},
  
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

  {
    path: '/forum/topic/new', name: 'ForumCreateTopic ', component: CreateSubject, meta : { requiresAuth: true }
  },
  { path: '/forum', name: 'ForumTopics', component: ForumTopics },
  { path: '/forum/topic/:id', name: 'ForumTopicDetail', component: ForumTopicDetail, props: true },




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