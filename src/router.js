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
//import InscriptionParticipation from './components/InscriptionParticipation.vue';
import { authState } from '@/authState';

import EventList from "@/components/event/EventList.vue";
import CreateEvent from "@/components/event/CreateEvent.vue";
import ParticipateEvent from "@/components/event/ParticipateEvent.vue";
import HistoryEvent from "@/components/event/HistoryEvent.vue";

// les modules du volontariats
import RecrutementPage from './components/Volontariat/RecrutementPage.vue';
import ValidationPage from './components/Volontariat/ValidationPage.vue';
//import AffectationPage from './components/Volontariat/AffectationPage.vue';
import FormationPage from './components/Volontariat/FormationPage.vue';
//import CanditaturePage from './components/Volontariat/CandidaturePage.vue';
import CandidaturePage from './components/Volontariat/CandidaturePage.vue';
import SuiviMissions from './components/Volontariat/SuiviMissions.vue';
import CreateTopic from './components/forum/create_topic.vue';
import BoardModerator from './components/forum/boards_moderators.vue';

import QuizComponent from './components/QuizEnvironnement/QuizComponent.vue';
import ObtentionRecompense from '@/components/QuizEnvironnement/ObtentionRecompense.vue';

//Vue.use(VueRouter);


const routes = [

  {path: '/participer-quiz',
    name: 'Participer au Quiz',
    component: QuizComponent,   // la route pour le recrutement
},

{ path: '/obtention-recompense', component: ObtentionRecompense },

 // {path: '/Acceuil',
   // name: 'Acceuil',
   // component: InscriptionParticipation,   // la route pour le recrutement
//},
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

  { path: '/board_reports', name: 'BoardModerator', component: BoardModerator, meta: { requiresAuth: true } },
  { path: '/create_sujet', name: 'CreateTopic', component: CreateTopic, meta: { requiresAuth: true } },



  {
    path: "/events",
    name: "EventList",
    component: EventList,
    meta: { requiresAuth: true },
  },
  {
    path: "/events/create",
    name: "CreateEvent",
    component: CreateEvent,
    meta: { requiresAuth: true },
  },
  {
    path: "/events/:id/participate",
    name: "ParticipateEvent",
    component: ParticipateEvent,
    props: true,
  },
  {
    path: "/events/history",
    name: "History",
    component: HistoryEvent,
    meta: { requiresAuth: true },
  },
  

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